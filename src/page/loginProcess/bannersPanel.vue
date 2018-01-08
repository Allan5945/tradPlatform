<template>
    <div class="banner-panel" @mousewheel="wheel($event)" @DOMMouseScroll="wheel($event)" ref="bannerPanel">
        <!-- 板块1 -->
        <div class="banner-item banner-item-i1">
            <p :style="{'top':box.height/2 - 92 +'px'}">设想飞过无数个地方<br>却从未彼此相遇</p>
            <p :style="{'top':box.height/2 - 90 +'px'}">IMAGINE FLYING THROUFH COUNTLESS PLACES<br>BUT NEVER MET EACH OTHER</p>
        </div>
        <!-- 板块2 -->
        <div class="banner-item banner-item-i2">
            <div class="banner-cl">
                <p>专业的航线交易和运力提供平台 </p>
                <p>PROFESSIONAL ROUTE TRADING AND CAPACITY SUPPLY PLATFORM</p>
            </div>
            <div class="banner-cl-b" style="left:384px;top:440px;">
                <div>
                    <img src="" alt="">
                    <div>
                        <h2>为机场提供运力</h2>
                        <p>TO PROVIDE CAPACITY FOR THE AIRPORT</p>
                    </div>
                </div>
                <div>一呼百应</div> 
            </div> 
            <div class="banner-cl-b" style="left:1080px;top:440px;">
                <div>
                    <img src="" alt="">
                    <div>
                        <h2>为机场提供运力</h2>
                        <p>为机场提供运力为机场提供运力为机场提供运力为机场提供运力</p>
                    </div>
                </div>
                <div>一呼百应</div> 
            </div> 
        </div>
        <!-- 板块3 -->
        <div class="banner-item">
            <div class="banner-cl">
                <p>专业的航线交易和运力提供平台 </p>
                <p>PROFESSIONAL ROUTE TRADING AND CAPACITY SUPPLY PLATFORM</p>
            </div>
            <div class="banner-icon">
                <div>
                    <div>&#xe671;</div>
                    <div>
                        <div>开航测算</div>
                        <span>选择更多</span>
                    </div>
                </div>
                <div>
                    <div>&#xe603;</div>
                    <div>
                        <div>机场对比</div>
                        <span>选择更多</span>
                    </div>
                </div>
                <div>
                    <div>&#xe6fb;</div>
                    <div>
                        <div>信息查询</div>
                        <span>方便快捷</span>
                    </div>
                </div>
                <div>
                    <div>&#xe621;</div>
                    <div>
                        <div>时刻查看</div>
                        <span>掌握更多</span>
                    </div>
                </div>
            </div>
            <div class="banner-img">
                <img src="" alt="">
            </div>
        </div> 
        <!-- 板块4 -->
        <div class="banner-item">
            <div class="banner-cl">
                <p>专业的航线交易和运力提供平台 </p>
                <p>PROFESSIONAL ROUTE TRADING AND CAPACITY SUPPLY PLATFORM</p>
            </div>
            <div class="banner-imTex">
                <div>
                    <img src="" alt="">
                    <h5>开航无忧</h5>
                    <p>最优秀的航线运营团队帮助运营航线</p>
                </div>
                <div>
                    <img src="" alt="">
                    <h5>投放无忧</h5>
                    <p>最优秀的市场团队帮助找合适的航点</p>
                </div>
            </div>
            <div class="banner-imTex-mes">
                <div>
                    <span>#01</span>
                    <h5>开航无忧</h5>
                    <p>专业的航线交易和运力提供平台专业的航线交易和运力提供平台专业的航线交易和运力提供平台</p>
                </div>
                 <div>
                    <span>#01</span>
                    <h5>开航无忧</h5>
                    <p>专业的航线交易和运力提供平台专业的航线交易和运力提供平台专业的航线交易和运力提供平台</p>
                </div>
                 <div>
                    <span>#01</span>
                    <h5>开航无忧</h5>
                    <p>专业的航线交易和运力提供平台专业的航线交易和运力提供平台专业的航线交易和运力提供平台</p>
                </div>
            </div>
        </div>
        <!-- 板块5 -->
        <div class="banner-item">
            <div class="banner-making">
                <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
                 <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
                 <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
                  <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
                  <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
                  <div>
                    <div>
                        <span>#01</span>
                        <h5>本场航线查看</h5>
                        <p>辅助决策</p>
                    </div>
                    <div>
                        <img src="" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 板块6 -->
        <div class="banner-item banner-item-lx">
             <div class="banner-item-title">
                 <h5>成都太美航空技术有限公司</h5> 
                 <span>ChengDu TaiMei Aviaction Technology Co.,Ltd </span>
                 <p>成都太美航空技术有限公司，延承海南太美航空股份有限公司“航空+旅游”核心业务方向，以航空旅游数据服务为切入点，充分利用IT、DT及互联网技术，面向政府、机场、中小航空企业等专业领域客户提供大数据系统研发、大数据分析等产品及服务。</p>
             </div>
             <div class="banner-item-phone">
                 <div>
                     <h6>HOTLINE</h6>
                     <span>025-65733800</span>
                 </div>
                  <div>
                     <h6>WEB</h6>
                     <span>www.taimei-air.com</span>
                 </div>
             </div>
        </div>
        <bannernNavigation :updata="updata" v-on:reqUp="reqUp"></bannernNavigation>
        <bannerBotton :updata="updata" v-on:reqUp="reqUp"></bannerBotton>
        <div class="logo-img">
            <img src="./../../static/img/logo/logo.png" alt="">
        </div>
        <div class="login-zc">
            <span @click="steps(true)">登录/</span>
            <span @click="steps(false)">注册</span>
        </div>
    </div>
</template>
<script>

import bannernNavigation from './bannersPanelComponents/bannernNavigation.vue';
import bannerBotton from './bannersPanelComponents/bannerButton.vue';

    export default {
        data(){
            return {
                updata:true,
                box:{
                    width:0,
                    height:0,
                }
            }
        },
        mounted:function(){
           this.initCont();
        },
        methods:{
            steps(t){
                this.$emit("steps",t)
            },
            wheel(e){
                let t = true;  // true，表示下滑动，false，上滑动
                if("deltaY" in e){
                   if(e.deltaY < 0){
                       t = false;
                   };
                }else{
                    if(e.detail < 0){
                       t = false;
                    };
                };
                let top = document.getElementById("case").offsetHeight;
                if(t){
                    document.getElementById("case").scrollTop = document.getElementById("case").scrollTop + top;
                }else{
                    document.getElementById("case").scrollTop = document.getElementById("case").scrollTop - top;
                };
                this.genxin();
            },
            genxin(){
                this.updata = !this.updata;
            },
            reqUp(){
                this.genxin();
            },
            initCont(){
                let bd = document.getElementsByTagName("body");
                this.box = {
                    width : bd[0].offsetWidth,
                    height : bd[0].offsetHeight
                }
            }
        },
        components:{
            bannernNavigation,
            bannerBotton
        },
    }
</script>
<style scoped lang="scss">
    .login-zc{
        position: fixed;
        top: 20px;
        right: 55px;
        >span{
            color: #4260fe;
            font-weight: 600;
            font-size: 1.4rem;
            cursor: pointer;
            &:hover{
                color: #1830ff;
            }
        }
    }
    .banner-panel{
        width: 100%;
        background-color: white;
        position: absolute;
        top: 0px;
        height: 600%;
        display: flex;
        flex-flow: column nowrap;
        transition: top .8s linear;
    }
    .banner-item{
        flex: 1;
        position: relative;
    }
    .logo-img{
        position: fixed;
        left:55px;
        top: 20px;
    }
    .banner-item-i1{
        >p:nth-child(1){
            position: absolute;
            left: 387px;
            font-size: 4rem;
            font-weight: bold;
            letter-spacing: 3px;
            line-height: 50px;
        }
        >p:nth-child(2){
            position: absolute;
            left:1080px;
            font-size: 1.2rem;
            font-weight: bold;
            letter-spacing: 2px;
            line-height: 25px;
        }
    }
    .banner-cl{
        width: 740px;
        height: 140px;
        position: absolute;
        top: 200px;
        left:240px;
        display: flex;
        padding-left:147px;
        flex-flow: column nowrap;
        >p:nth-child(1){
            padding-top: 40px;
            font-weight: 600;
            font-size: 2.7rem;
        };
         >p:nth-child(2){
            padding-top: 6px;
        };
    };
    
    .banner-cl:before{
        content:"AIRLINE";
        position: absolute;
        top: -14px;
        left: 0;
        font-size: 13rem;
        font-weight: 1000;
        color: rgba(0,0,0,.15);
    }
    .banner-cl-b{
        position: absolute;
        width: 578px;
        height: 278px; 
        background-color: #262626;
        >div:nth-child(1){
            width: 100%;
            height:100%;
            display: inline-flex;
            >img{
                width: 245px;
                height: 100%;
                display:inline-block;
            }
            >div{
                color:white;
                padding-top:50px;
                >h2{
                    font-size:3rem;
                    padding-bottom:2px;
                }
                P{
                    font-size:1rem;
                }
            }
        }
        >div:nth-child(2){
            position: absolute;
            right: -18px;
            top: -25px;
            width: 172px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: #4466fb;
            color:white;
            font-size: 1.8rem;
            font-weight: bold;    
        }
    }
    .banner-icon{
        position: absolute;
        top: 640px;
        left:387px;
        width:670px;
        flex-flow:row warp;
        >div{
            float: left;
            width:335px;
            height:120px;
            display: flex;
            >div:nth-child(1){
                font-family:iconfont;
                color:#4466fd;
                font-size: 3.5rem;
            }
            >div:nth-child(2){
                padding: 5px 0 0 15px;
                >div{
                    font-weight: bold;
                    font-size: 1.8rem;
                    margin-bottom: 14px;
                }
            }
        }
    }
    .banner-img{
        position: absolute;
        top: 150px;
        left: 980px;
        width: 800px;
        height: 800px;
        background-color:gray;
    }
    .banner-imTex{
        position: absolute;
        left:387px;
        width: 700px;
        height:300px;
        top:600px;
        background-color:gray;
        display: flex;
        justify-content:space-between;
        >div{
            width:280px;
            >img{
                display:inline-block;
                width:280px;
                height:167px;
            }
            >h5{
                padding: 64px 0 18px 0;
                font-size: 1.8rem;
            }
            >p{
                font-size: 1rem;
                color:rgba(0, 0, 0, 0.4);
            }
        }
    }
    .banner-imTex-mes{
          position: absolute;
          left: 1300px; 
          top:200px;
          width: 355px;
          >div{
              height:280px;
              >span{
                  color:#4466fb;
              }
              >h5{
                  padding:27px 0;
                  font-size: 1.6rem;
              }
          }
    }
    
    .banner-making{
        position:absolute;
        left:387px;
        top:200px;
        width: 1260px;
        >div{
            float: left;
            width:420px;
            height: 298px;
            outline: 1px solid saddlebrown;
            display:flex;
            >div:nth-child(1){
                width:277px;
                padding: 80px 0 0 24px;
                >span{
                    color:#4466fb;
                }
                >h5{
                    margin-top: 54px;
                    font-weight: bold;
                    font-size: 1.5rem;
                }
                 >p{
                    padding-top: 20px;
                    font-size: 1rem;
                }
            }
             >div:nth-child(2){
                 flex:1;
                 background-color: gray;
            }
        }
    }
    .banner-item-lx{
        padding:0 115px 0 387px;
        display: flex;
        flex-flow:row nowrap; 
        justify-content: space-between;
        align-items: center;
        >div{
            width:500px;
        };
        
    }
    .banner-item-title{
        height: 180px;
        >h5{
            font-size: 1.8rem;
            padding-bottom: 10px;
        }
         >span{
            font-size: 1.2rem;
        }
         >p{
            padding-top: 37px;
            font-size: 1.2rem;
            line-height: 30px;
            letter-spacing: 1px;
            color:rgba(0, 0, 0, 0.4);
        }
    }
    .banner-item-phone{
        height: 180px;
        display: flex;
        flex-flow: column nowrap;
        justify-content:space-between;
        >div{
            >h6{
                color:#4466fb;
                font-size: 1.6rem;
                padding-bottom:16px;
            }
            >span{
               font-size: 1.4rem; 
            }
        }
    }
</style>