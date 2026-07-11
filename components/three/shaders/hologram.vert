uniform float uTime;
uniform float uWobbleAmount;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vFresnel;

#pragma glsl: include ./noise.glsl

void main() {
  vUv = uv;

  vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vWorldPosition = worldPos;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);

  // Subtle vertex wobble
  float wobble = snoise(position * 2.0 + uTime * 0.5) * uWobbleAmount;
  vec3 displaced = position + normal * wobble;

  // Fresnel
  vec3 viewDir = normalize(cameraPosition - worldPos);
  vFresnel = pow(1.0 - max(dot(vWorldNormal, viewDir), 0.0), 2.5);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
