const simpleVertex = `  varying vec2 vUv;
  varying vec3 v_Normal;
  varying vec3 v_Position;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    v_Normal = normalize(normalMatrix * normal);
    v_Position = vec3(mvPosition.xyz);
  }`;
const horizontalBlurFrag = ` uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {
        vec4 sum = vec4( 0.0 );
        vec4 originalSample = texture2D( tDiffuse, vUv );
        sum += texture2D( tDiffuse, vec2( vUv.x - 3.2307 * h, vUv.y ) ) * 0.0702;
        sum += texture2D( tDiffuse, vec2( vUv.x - 1.3846 * h, vUv.y ) ) * 0.3162;
        sum += originalSample * 0.2270270270;
        sum += texture2D( tDiffuse, vec2( vUv.x + 1.3846 * h, vUv.y ) ) * 0.3162;
        sum += texture2D( tDiffuse, vec2( vUv.x + 3.2307 * h, vUv.y ) ) * 0.0702;
        gl_FragColor = sum;
    }`;
const verticalBlurFrag = `  uniform sampler2D tDiffuse;
    uniform float v;

    varying vec2 vUv;

    void main() {
        vec4 sum = vec4( 0.0 );

        vec4 originalSample = texture2D( tDiffuse, vUv );

        sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.2307 * v ) ) * 0.0702;
        sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.3846 * v ) ) * 0.3162;
        sum += originalSample * 0.2270270270;
        sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.3846 * v ) ) * 0.3162;
        sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.2307 * v ) ) * 0.0702;

        gl_FragColor = sum;
    }`;
const overlayFrag = ` uniform sampler2D tDiffuse;
    uniform sampler2D tOverlay;

    varying vec2 vUv;

    void main() {
        vec4 regularScene = texture2D( tDiffuse, vUv );
        vec4 overlay = texture2D( tOverlay, vUv );

        float blurOpacity = 0.5;

        overlay.a *= blurOpacity;
        gl_FragColor = vec4(regularScene.rgb * (1.0 - overlay.a) +  overlay.rgb * overlay.a, 1.0);
    }`;
const earthFrag = `uniform sampler2D tEarth;
    uniform sampler2D tClouds;
    uniform float fTime;

    varying vec2 vUv;
    varying vec3 v_Normal;
    varying vec3 v_Position;

    void main() {
        vec4 earth = texture2D(tEarth, vec2(vUv.x + fTime * 0.5, vUv.y));
        vec4 clouds = texture2D(tClouds, vec2(vUv.x + fTime, vUv.y));

        vec4 diffuse = earth + clouds;

        vec3 v_LightPos = vec3(-200.0, 200.0, -200.0);
        vec3 light_vec = normalize(v_LightPos - v_Position);

        float lightStrength = max(dot(v_Normal, light_vec), 0.05);

        gl_FragColor = diffuse * lightStrength;
    }`;
export {simpleVertex,horizontalBlurFrag,verticalBlurFrag,overlayFrag,earthFrag}