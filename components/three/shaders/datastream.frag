uniform vec3 uColor;
uniform float uOpacity;

varying float vAlpha;
varying float vPhase;

void main() {
  // Circular point with soft edge
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;

  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha * uOpacity;

  // Slight color variation per particle
  vec3 color = uColor * (0.8 + vPhase * 0.2);

  gl_FragColor = vec4(color, alpha);
}
