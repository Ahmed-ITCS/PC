uniform float uTime;
uniform float uNoiseScale;
uniform float uDisplacement;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vNoise;

#pragma glsl: include ./noise.glsl

void main() {
  vUv = uv;

  vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldPosition = worldPos;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

  // Noise-based displacement
  float noise = snoise(worldPos * uNoiseScale + uTime * 0.3);
  vNoise = noise;

  vec3 displaced = position + normal * noise * uDisplacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
