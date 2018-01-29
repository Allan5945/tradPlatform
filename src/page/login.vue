<template>
    <div class="content-box">
        <div class="gl-ifm" id="WebGL-output" @resize="initGLMap"></div>
        <bannersPanel v-on:steps="steps"></bannersPanel>
        <transition name="fade">
            <loginSteps v-if="stepOff" :stepOff.sync="stepOff" :setpes.sync="setpes"></loginSteps>
        </transition>
    </div>
</template>

<script>
    import * as vx from 'vuex';
    import bannersPanel from './loginProcess/bannersPanel.vue';
    import loginSteps from './loginProcess/loginSteps.vue';
    import i1 from './../static/webgl/earth_clouds_low_4096.jpg'
    import i2 from './../static/webgl/earth_color_low_4096.jpg'
    import {simpleVertex,horizontalBlurFrag,verticalBlurFrag,overlayFrag,earthFrag} from './webglArg'
    export default {
        data() {
            return {
                stepOff: false,
                setpes: true
            }
        },
        methods: {
            steps: function (t) {
                this.stepOff = true;
                this.setpes = t ? 0 : 2;
            },
            initGLMap(){
                    let camera = null;
                    let renderer = null;
                    let scene = null;
                    let blurScene = null;
                    let blurMaskScene = null;
                    let blurComposer = null;
                    let sceneComposer = null;
                    let earthMaterial = null;
                    let earthGlow = null;
                    let startTime = new Date().getTime();
                    let Initialize = function() {
                        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
                        camera.position.z = 150;
                        camera.position.y = -80;
                        renderer = new THREE.WebGLRenderer({
                            alpha: true,
                            logarithmicDepthBuffer: true
                        });
                        renderer.setClearColor("black", 1);
                        renderer.setPixelRatio(window.devicePixelRatio);
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.autoClear = false;
                        if(document.getElementById("WebGL-output").childNodes.length !=  0){
                            document.getElementById("WebGL-output").removeChild(document.getElementById("WebGL-output").childNodes[0]);
                        }
                        document.getElementById("WebGL-output").appendChild(renderer.domElement);
                        scene = new THREE.Scene();
                        blurScene = new THREE.Scene();
                        blurMaskScene = new THREE.Scene();

                        let renderTargetParameters = {
                            minFilter: THREE.LinearFilter,
                            magFilter: THREE.LinearFilter,
                            format: THREE.RGBAFormat,
                            stencilBufer: true
                        };
                        let blurRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);

                        blurComposer = new THREE.EffectComposer(renderer, blurRenderTarget);
                        sceneComposer = new THREE.EffectComposer(renderer);
                    }
                    let PopulateScenes = function(earthTexture, cloudTexture) {
                        earthMaterial = CreateEarthMaterial(earthTexture, cloudTexture);
                        let earthPos = new THREE.Vector3(40, -100, 0);

                        let earth = CreateEarth({
                            size: 50,
                            color: 0xFFFFFF,
                            material: earthMaterial,
                            position: earthPos
                        });
                        let earthObstruction = CreateEarth({
                            size: 49,
                            color: 0xFFFFFF,
                            opacity: 0.0,
                            position: earthPos
                        });
                        earthObstruction.renderOrder = 1;

                        earthGlow = CreateEarth({
                            size: 51.5,
                            opacity: 0.7,
                            color: 0x397ebe,
                            position: earthPos
                        });
                        let glowCubeMask = CreateEarth({
                            size: 65,
                            color: 0xFFFFFF,
                            position: earthPos
                        });
                        let light = new THREE.PointLight(0xff0000, 1, 1000);
                        light.position.set(50, 50, 50);
                        let blurLight = new THREE.PointLight(0xff0000, 1, 1000);
                        blurLight.position.set(50, 50, 50);
                        scene.add(earth);
                        scene.add(new THREE.AmbientLight(0xFFFFFF));

                        blurScene.add(new THREE.AmbientLight(0xFFFFFF));
                        blurScene.add(earthGlow);
                        blurScene.add(earthObstruction);
                        blurMaskScene.add(glowCubeMask);
                    }
                    let CreateEarthMaterial = function(earthMap, cloudMap) {
                        cloudMap.wrapS = cloudMap.wrapT = THREE.RepeatWrapping;
                        earthMap.wrapS = earthMap.wrapT = THREE.RepeatWrapping;

                        return new THREE.ShaderMaterial({
                            uniforms: {
                                tEarth: {
                                    value: earthMap
                                },
                                tClouds: {
                                    value: cloudMap
                                },
                                fTime: {
                                    value: 0.0
                                }
                            },
                            vertexShader:simpleVertex,
                            fragmentShader: earthFrag
                        });

                    }

                    let CreateEarth = function(params) {
                        let earthGeometry = new THREE.SphereGeometry(params.size, 50, 50);
                        let material = params.material != undefined ? params.material : new THREE.MeshLambertMaterial({
                            color: params.color,
                            opacity: params.opacity != undefined ? params.opacity : 1.0,
                            transparent: false,
                            depthWrite: false,
                            shading: THREE.SmoothShading
                        });

                        let earth = new THREE.Mesh(earthGeometry, material);

                        if (params.position != undefined)
                            earth.position.copy(params.position);

                        return earth;
                    };
                    let SetupComposers = function() {
                        let blur1Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 8);
                        let blur2Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 2);

                        let blurPass = new THREE.RenderPass(blurScene, camera);
                        blurPass.clear = true;
                        blurPass.clearAlpha = 0.0;

                        let maskPass = new THREE.MaskPass(blurMaskScene, camera);
                        let clearMaskPass = new THREE.ClearMaskPass();

                        blurComposer.addPass(blurPass);
                        blurComposer.addPass(maskPass);
                        blurComposer.addPass(blur1Passes.horizontalPass);
                        blurComposer.addPass(blur1Passes.verticalPass);
                        blurComposer.addPass(blur2Passes.horizontalPass);
                        blurComposer.addPass(blur2Passes.verticalPass);
                        blurComposer.addPass(clearMaskPass);

                        let overlayShader = {
                            uniforms: {
                                tDiffuse: {
                                    type: "t",
                                    value: 0,
                                    texture: null
                                },
                                tOverlay: {
                                    type: "t",
                                    value: 1,
                                    texture: null
                                }
                            },

                            vertexShader: simpleVertex,
                            fragmentShader: overlayFrag
                        };

                        let scenePass = new THREE.RenderPass(scene, camera);
                        scenePass.clear = true;

                        overlayShader.uniforms["tOverlay"].value = blurComposer.renderTarget2;
                        let overlayPass = new THREE.ShaderPass(overlayShader);
                        overlayPass.renderToScreen = true;

                        sceneComposer.addPass(scenePass);
                        sceneComposer.addPass(overlayPass);
                    }
                    let CreateBlurShaderPasses = function(h, v, blurriness) {
                        let HBlurShader = {
                            uniforms: {
                                tDiffuse: {
                                    type: "t",
                                    value: null
                                },
                                h: {
                                    type: "f",
                                    value: blurriness / h
                                }
                            },
                            vertexShader: simpleVertex,
                            fragmentShader: horizontalBlurFrag
                        };

                        let VBlurShader = {
                            uniforms: {
                                tDiffuse: {
                                    type: "t",
                                    value: null
                                },
                                v: {
                                    type: "f",
                                    value: blurriness / v
                                }
                            },
                            vertexShader: simpleVertex,
                            fragmentShader: verticalBlurFrag
                        };

                        let HBlur = new THREE.ShaderPass(HBlurShader);
                        let VBlur = new THREE.ShaderPass(VBlurShader);
                        return {
                            horizontalPass: HBlur,
                            verticalPass: VBlur
                        };
                    }

                    let RenderGlowScene = function() {
                        let ticks = new Date().getTime() - startTime;
                        earthMaterial.uniforms.fTime.value = ticks / 70000.0;
                        blurComposer.render();
                        sceneComposer.render();
                    }
                    function animate() {
                        requestAnimationFrame(animate);
                        RenderGlowScene();
                    };
                    Initialize();
                    let loader = new THREE.TextureLoader();
                    loader.crossOrigin = '';
                    loader.load(i1,
                        function(cloudTexture) {
                            loader.load(i2,
                                function(earthTexture) {
                                    PopulateScenes(earthTexture, cloudTexture);
                                    SetupComposers();
                                    animate();
                                });
                        });
            }
        },
        mounted:function () {
            this.initGLMap();
            window.onresize = () => {
                this.initGLMap();
            }
        },
        created: function () {

        },
        computed: {},
        components: {
            bannersPanel,
            loginSteps
        }
    }
</script>
<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }  ;
    .content-box {
        overflow: hidden;
        position: relative;
    }
    .gl-ifm{
        width: 100%;
        height: 100%;
        position: fixed;
        top:0;
        z-index: 1;
    }
    .WebGL-output{
        >canvas{
            width: 100%;
            height: 100%;
            /*color: #161616;*/
        }
    }
</style>

