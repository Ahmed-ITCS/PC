uniform float uTime;
uniform vec3 uGridColor;
uniform float uFadeDistance;
uniform float uLineThickness;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  // Grid lines using derivatives for consistent width
  vec2 coord = vWorldPosition.xz;
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - min(line, uLineThickness);

  // Distance fade
  float dist = length(vWorldPosition.xz);
  float fade = 1.0 - smoothstep(0.0, uFadeDistance, dist);

  // Animated pulse ripples
  float ripple = sin(dist * 2.0 - uTime * 1.5) * 0.5 + 0.5;
  ripple *= 0.3;

  // Combine
  float alpha = gridAlpha * fade * (0.4 + ripple);
  alpha = clamp(alpha, 0.0, 1.0);

  // Color with pulse
  vec3 color = uGridColor * (0.8 + ripple * 0.2);

  gl_FragColor = vec4(color, alpha);
}
