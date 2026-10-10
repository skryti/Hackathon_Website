// Plain TS string export — no external GLSL loader plugin, per spec.
// Passes the world-space vertex normal so the terminator boundary in the
// fragment shader can be computed against a light direction that rotates
// independently of the mesh's own spin.
export default /* glsl */ `
varying vec3 vNormal;

void main() {
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
