/* eslint-disable @typescript-eslint/no-require-imports */

// Inline GLSL shaders as template literals for Next.js compatibility.
// Vite-style ?raw imports are not supported in Next.js webpack.

export const noiseGLSL = /* glsl */ `
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}
`;

export const cyberVertexShader = /* glsl */ `
uniform float uTime;
uniform float uNoiseScale;
uniform float uDisplacement;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vNoise;

${noiseGLSL}

void main() {
  vUv = uv;
  vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldPosition = worldPos;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  float noise = snoise(worldPos * uNoiseScale + uTime * 0.3);
  vNoise = noise;
  vec3 displaced = position + normal * noise * uDisplacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

export const cyberFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uGridSize;
uniform float uOpacity;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vNoise;

${noiseGLSL}

void main() {
  vec2 grid = abs(fract(vUv * uGridSize - 0.5) - 0.5) / fwidth(vUv * uGridSize);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - min(line, 1.0);
  float pulse = sin(vWorldPosition.x * 2.0 + uTime * 1.5) * 0.5 + 0.5;
  float pulse2 = sin(vWorldPosition.y * 3.0 + uTime * 1.2) * 0.5 + 0.5;
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 3.0);
  float alpha = gridAlpha * 0.6 + fresnel * 0.4;
  alpha *= uOpacity;
  alpha += vNoise * 0.15;
  alpha = clamp(alpha, 0.0, 1.0);
  vec3 color = uColor * (0.8 + pulse * 0.2 + pulse2 * 0.1);
  color += uColor * fresnel * 0.5;
  gl_FragColor = vec4(color, alpha);
}
`;

export const hologramVertexShader = /* glsl */ `
uniform float uTime;
uniform float uWobbleAmount;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vFresnel;

${noiseGLSL}

void main() {
  vUv = uv;
  vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldPosition = worldPos;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  float wobble = snoise(position * 2.0 + uTime * 0.5) * uWobbleAmount;
  vec3 displaced = position + normal * wobble;
  vec3 viewDir = normalize(cameraPosition - worldPos);
  vFresnel = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 2.5);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

export const hologramFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uScanSpeed;
uniform float uFresnelPower;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vFresnel;

void main() {
  float scanLine = sin(vWorldPosition.y * 40.0 + uTime * uScanSpeed) * 0.5 + 0.5;
  scanLine = smoothstep(0.3, 0.7, scanLine);
  float fineScan = sin(vWorldPosition.y * 120.0 + uTime * uScanSpeed * 2.0) * 0.5 + 0.5;
  fineScan = smoothstep(0.4, 0.6, fineScan) * 0.3;
  float fresnel = pow(vFresnel, uFresnelPower);
  float alpha = (scanLine * 0.3 + fineScan + fresnel * 0.6) * uOpacity;
  alpha = clamp(alpha, 0.0, 1.0);
  vec3 color = uColor * (0.7 + fresnel * 0.3);
  gl_FragColor = vec4(color, alpha);
}
`;

export const gridFloorVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const gridFloorFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uGridColor;
uniform float uFadeDistance;
uniform float uLineThickness;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vec2 coord = vWorldPosition.xz;
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - min(line, uLineThickness);
  float dist = length(vWorldPosition.xz);
  float fade = 1.0 - smoothstep(0.0, uFadeDistance, dist);
  float ripple = sin(dist * 2.0 - uTime * 1.5) * 0.5 + 0.5;
  ripple *= 0.3;
  float alpha = gridAlpha * fade * (0.4 + ripple);
  alpha = clamp(alpha, 0.0, 1.0);
  vec3 color = uGridColor * (0.8 + ripple * 0.2);
  gl_FragColor = vec4(color, alpha);
}
`;

export const dataStreamVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSpeed;

attribute float aPhase;
attribute float aOffset;

varying float vAlpha;
varying float vPhase;

void main() {
  vPhase = aPhase;
  float y = mod(position.y + uTime * uSpeed + aOffset, 20.0) - 10.0;
  vec3 pos = vec3(position.x, y, position.z);
  float normalizedY = (y + 10.0) / 20.0;
  vAlpha = sin(normalizedY * 3.14159);
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 3.0 * (300.0 / -mvPosition.z);
}
`;

export const dataStreamFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;

varying float vAlpha;
varying float vPhase;

void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha * uOpacity;
  vec3 color = uColor * (0.8 + vPhase * 0.2);
  gl_FragColor = vec4(color, alpha);
}
`;
