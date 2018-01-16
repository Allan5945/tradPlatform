<template>
    <div class="content-box">
        <div class="gl-ifm" id="WebGL-output"></div>
        <bannersPanel v-on:steps="steps"></bannersPanel>
        <transition name="fade">
            <loginSteps v-if="stepOff" :stepOff.sync="stepOff"></loginSteps>
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
                offType: true
            }
        },
        methods: {
            steps: function (t) {
                this.stepOff = true;
                this.offType = t;
            },
            initGLMap(){
                    var camera = null;
                    var renderer = null;
                    var scene = null;
                    var blurScene = null;
                    var blurMaskScene = null;
                    var blurComposer = null;
                    var sceneComposer = null;
                    var earthMaterial = null;
                    var earthGlow = null;
                    var startTime = new Date().getTime();
                    var Initialize = function() {
                        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
                        camera.position.z = 150;
                        camera.position.y = -80;
                        renderer = new THREE.WebGLRenderer({
                            alpha: true,
                            logarithmicDepthBuffer: true
                        });
                        renderer.setClearColor("red", 0.0);
                        renderer.setPixelRatio(window.devicePixelRatio);
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        renderer.autoClear = false;
                        document.getElementById("WebGL-output").appendChild(renderer.domElement);
                        scene = new THREE.Scene();
                        blurScene = new THREE.Scene();
                        blurMaskScene = new THREE.Scene();

                        var renderTargetParameters = {
                            minFilter: THREE.LinearFilter,
                            magFilter: THREE.LinearFilter,
                            format: THREE.RGBAFormat,
                            stencilBufer: true
                        };
                        var blurRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);

                        blurComposer = new THREE.EffectComposer(renderer, blurRenderTarget);
                        sceneComposer = new THREE.EffectComposer(renderer);
                    }
                    var PopulateScenes = function(earthTexture, cloudTexture) {
                        earthMaterial = CreateEarthMaterial(earthTexture, cloudTexture);
                        var earthPos = new THREE.Vector3(40, -100, 0);

                        var earth = CreateEarth({
                            size: 50,
                            color: 0xFFFFFF,
                            material: earthMaterial,
                            position: earthPos
                        });
                        var earthObstruction = CreateEarth({
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
                        var glowCubeMask = CreateEarth({
                            size: 65,
                            color: 0xFFFFFF,
                            position: earthPos
                        });
                        var light = new THREE.PointLight(0xff0000, 1, 1000);
                        light.position.set(50, 50, 50);
                        var blurLight = new THREE.PointLight(0xff0000, 1, 1000);
                        blurLight.position.set(50, 50, 50);
                        scene.add(earth);
                        scene.add(new THREE.AmbientLight(0xFFFFFF));

                        blurScene.add(new THREE.AmbientLight(0xFFFFFF));
                        blurScene.add(earthGlow);
                        blurScene.add(earthObstruction);
                        blurMaskScene.add(glowCubeMask);
                    }
                    var CreateEarthMaterial = function(earthMap, cloudMap) {
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

                    var CreateEarth = function(params) {
                        var earthGeometry = new THREE.SphereGeometry(params.size, 50, 50);
                        var material = params.material != undefined ? params.material : new THREE.MeshLambertMaterial({
                            color: params.color,
                            opacity: params.opacity != undefined ? params.opacity : 1.0,
                            transparent: false,
                            depthWrite: false,
                            shading: THREE.SmoothShading
                        });

                        var earth = new THREE.Mesh(earthGeometry, material);

                        if (params.position != undefined)
                            earth.position.copy(params.position);

                        return earth;
                    };
                    var SetupComposers = function() {
                        var blur1Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 8);
                        var blur2Passes = CreateBlurShaderPasses(window.innerWidth, window.innerHeight, 2);

                        var blurPass = new THREE.RenderPass(blurScene, camera);
                        blurPass.clear = true;
                        blurPass.clearAlpha = 0.0;

                        var maskPass = new THREE.MaskPass(blurMaskScene, camera);
                        var clearMaskPass = new THREE.ClearMaskPass();

                        blurComposer.addPass(blurPass);
                        blurComposer.addPass(maskPass);
                        blurComposer.addPass(blur1Passes.horizontalPass);
                        blurComposer.addPass(blur1Passes.verticalPass);
                        blurComposer.addPass(blur2Passes.horizontalPass);
                        blurComposer.addPass(blur2Passes.verticalPass);
                        blurComposer.addPass(clearMaskPass);

                        var overlayShader = {
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

                        var scenePass = new THREE.RenderPass(scene, camera);
                        scenePass.clear = true;

                        overlayShader.uniforms["tOverlay"].value = blurComposer.renderTarget2;
                        var overlayPass = new THREE.ShaderPass(overlayShader);
                        overlayPass.renderToScreen = true;

                        sceneComposer.addPass(scenePass);
                        sceneComposer.addPass(overlayPass);
                    }
                    var CreateBlurShaderPasses = function(h, v, blurriness) {
                        var HBlurShader = {
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

                        var VBlurShader = {
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

                        var HBlur = new THREE.ShaderPass(HBlurShader);
                        var VBlur = new THREE.ShaderPass(VBlurShader);
                        return {
                            horizontalPass: HBlur,
                            verticalPass: VBlur
                        };
                    }

                    var RenderGlowScene = function() {
                        var ticks = new Date().getTime() - startTime;
                        earthMaterial.uniforms.fTime.value = ticks / 70000.0;
                        blurComposer.render();
                        sceneComposer.render();
                    }
                    function animate() {
                        requestAnimationFrame(animate);
                        RenderGlowScene();
                    };
                    Initialize();
                    var loader = new THREE.TextureLoader();
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
        z-index: -1;
    }
    .WebGL-output{
        >canvas{
            width: 100%;
            height: 100%;
            /*color: #161616;*/
        }
    }
</style>

