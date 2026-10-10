// Plain TS string export — no external GLSL loader plugin, per spec.
// Computes the day/night boundary via dot(normal, lightDir) + smoothstep,
// then blows the boundary band out to uColorEdge at high emissive intensity.
export default /* glsl */ `
uniform float uTime;
uniform vec3 uLightDir;
uniform vec3 uColorDay;
uniform vec3 uColorNight;
uniform vec3 uColorEdge;
uniform float uEdgeWidth;

varying vec3 vNormal;

void main() {
  float d = dot(normalize(vNormal), normalize(uLightDir));

  float edge = smoothstep(-uEdgeWidth, uEdgeWidth, d);
  vec3 color = mix(uColorNight, uColorDay, edge);

  float band = clamp(1.0 - abs(d / uEdgeWidth), 0.0, 1.0);
  float pulse = 0.9 + 0.1 * sin(uTime * 2.0);
  color += uColorEdge * band * 1.6 * pulse;

  gl_FragColor = vec4(color, 1.0);
}
`
