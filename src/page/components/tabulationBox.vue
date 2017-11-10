<template>
    <div class="tabulation-box" id="tabulationBox" :class="{tabulationBoxH:hidden,scroll:hidden}">
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/hx.png" alt="">
                <div><p>成都双流-北京首都-北京首都</p></div>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/haveline.png" alt="">
                <div><p>成都双流-北京首都-北京首都</p></div>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/haveyun.png" alt="">
                <div><p>成都双流-北京首都-北京首都</p></div>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
        <div>
            <div class="tabulation-item">
                <img src="./../../static/img/yun.png" alt="">
                <div><p>成都双流-北京首都-北京首都</p></div>
                <div>----</div>
            </div>
            <div class="tabulation-mes">
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
                <div>
                    <span>时刻</span>
                    <div>08:00</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data(){
            return{
                hidden:false
            }
        },
        mounted:function () {
            let set = '';
            window.onresize = ()=>{
                if(set != ''){clearTimeout(set)}
                set = setTimeout(()=>{this.resetWindow()},200);
            };
            this.resetWindow();
        },
        methods:{
           resetWindow:function () {
               let messageHead = 42;
               let tabulationHead = 62;
               let messageBox =  document.getElementById('message-box').offsetHeight;
               let tabulation = document.getElementById('tabulation').offsetHeight;
               if((messageBox - messageHead) < tabulation +10 ){
                   let zh =messageBox - messageHead - tabulationHead;
                   document.getElementById('tabulationBox').style.height = zh +'px';
                   this.hidden = true;
               }else{
                   document.getElementById('tabulationBox').style.height = '';
                   this.hidden = false;
               }
           }
        }
    }
</script>
<style scoped lang="scss">
    @keyframes mytext{
        0%{
            margin-left:0%;
        }
        100%{
            margin-left:-100%;
        }
    }
    .class-item0:after{
        position: absolute;
        /*background: url('./../../static/img/hx.png') no-repeat;*/
        left: 0px;
        top: 0px;
    }
    .tabulationBoxH{
        overflow-y: scroll;
    }
    .tabulation-mes{
        >div{
            >span{
                display: inline-block;
                padding-bottom: 5px;
                color: rgba(96,94,124,.7);
                font-size: 1.2rem;
            }
            >div{
                font-size: 1.3em;
                color: #605E7C;
            }
        }
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .tabulation-item{
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        width: 100%;
        position: relative;
        >img{
            position: absolute;
            width: 18px;
            height: 23px;
            left: -38px;
            top: 3px;
        }
        >div:first-of-type{
            cursor: pointer;
            overflow: hidden;
            >p{
                font-size: 1.7rem !important;
                width: 170px;
                display: inline-block;
                /*overflow: hidden;*/
                /*text-overflow:ellipsis;*/
                white-space: nowrap;
                margin: 0;
                color: #605E7C;
                &:hover{
                    animation: mytext 1s linear infinite;
                }
            }
        }
        >div:last-of-type{

        }
    }
    .tabulation-box{
        padding: 0 20px;
        position: relative;
        >div{
            height: 120px;
            padding: 20px 0 0 40px;
            border-bottom: 1px solid #f3f3f3;
        }
    }
</style>