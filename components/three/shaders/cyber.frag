uniform float uTime;
uniform vec3 uColor;
uniform float uGridSize;
uniform float uOpacity;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vNoise;

#pragma glsl: include ./noise.glsl

void main() {
  // Grid lines
  vec2 grid = abs(fract(vUv * uGridSize - 0.5) - 0.5) / fwidth(vUv * uGridSize);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - min(line, 1.0);

  // Animated pulse along grid
  float pulse = sin(vWorldPosition.x * 2.0 + uTime * 1.5) * 0.5 + 0.5;
  float pulse2 = sin(vWorldPosition.y * 3.0 + uTime * 1.2) * 0.5 + 0.5;

  // Fresnel rim glow
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 3.0);

  // Combine
  float alpha = gridAlpha * 0.6 + fresnel * 0.4;
  alpha *= uOpacity;
  alpha += vNoise * 0.15;
  alpha = clamp(alpha, 0.0, 1.0);

  // Color with pulse
  vec3 color = uColor * (0.8 + pulse * 0.2 + pulse2 * 0.1);
  color += uColor * fresnel * 0.5;

  gl_FragColor = vec4(color, alpha);
}
