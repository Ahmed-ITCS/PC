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
  // Scan lines
  float scanLine = sin(vWorldPosition.y * 40.0 + uTime * uScanSpeed) * 0.5 + 0.5;
  scanLine = smoothstep(0.3, 0.7, scanLine);

  // Secondary fine scan lines
  float fineScan = sin(vWorldPosition.y * 120.0 + uTime * uScanSpeed * 2.0) * 0.5 + 0.5;
  fineScan = smoothstep(0.4, 0.6, fineScan) * 0.3;

  // Fresnel edge glow
  float fresnel = pow(vFresnel, uFresnelPower);

  // Combine alpha
  float alpha = (scanLine * 0.3 + fineScan + fresnel * 0.6) * uOpacity;
  alpha = clamp(alpha, 0.0, 1.0);

  // Color with fresnel tint
  vec3 color = uColor * (0.7 + fresnel * 0.3);

  gl_FragColor = vec4(color, alpha);
}
