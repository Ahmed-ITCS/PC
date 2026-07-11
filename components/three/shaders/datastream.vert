uniform float uTime;
uniform float uSpeed;

attribute float aPhase;
attribute float aOffset;

varying float vAlpha;
varying float vPhase;

void main() {
  vPhase = aPhase;

  // Animate Y position upward, wrap around
  float y = mod(position.y + uTime * uSpeed + aOffset, 20.0) - 10.0;

  vec3 pos = vec3(position.x, y, position.z);

  // Fade at top and bottom
  float normalizedY = (y + 10.0) / 20.0;
  vAlpha = sin(normalizedY * 3.14159);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 3.0 * (300.0 / -mvPosition.z);
}
