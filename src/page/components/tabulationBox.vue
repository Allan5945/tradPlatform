<template>
    <div class="tabulation-box" id="tabulationBox" :class="{tabulationBoxH:hidden,scroll:hidden}">
        <div v-for="(key,index) in renderData">
            <div class="tabulation-item">
                <img :src='key.img' alt="">
                <div class="font-bold">
                    <div>
                        <div class="rolling">成都双流</div>
                    </div>
                    <span>-</span>
                    <div>
                       <div class="rolling">成都双流</div>
                    </div>
                    <span>-</span>
                    <div>
                        <div class="rolling">成都双流</div>
                    </div>
                </div>
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
    import * as vx from 'vuex'

    import ig0 from './../../static/img/haveline.png'; // 航线需求图片
    import ig1 from './../../static/img/haveyun.png'; // 运力需求图片
    import ig2 from './../../static/img/fcqq.png'; // 航线托管需求图片

    import tag0 from './../../static/img/jd/1.png'; // 航线托管需求图片
    import tag1 from './../../static/img/jd/2.png'; // 航线托管需求图片
    import tag2 from './../../static/img/jd/3.png'; // 航线托管需求图片
    import tag3 from './../../static/img/jd/4.png'; // 航线托管需求图片


    export default {
        data(){
            return{
                hidden:false
            }
        },
        mounted:function () {
            // 更改提示框高度
            setTimeout(()=>{
                console.log(this.demandList.hybridData);
            },500)
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
        },
        computed:{
            ...vx.mapGetters([
                'demandList'
            ]),
            renderData:function () {
                let a = [];
                this.demandList.hybridData.forEach((val)=>{
                    let img ,name,tag;
                    name = [val.dpt,val.arrv];
                    if(val.pst != null){
                        name.splice(1,0,val.pst)
                    };
                    switch (val.demandtype){
                        case "0":
                            img = ig0;
                            break;
                        case "1":
                            img = ig1;
                            break;
                        case "2":
                            img = ig2;
                            break;
                    };
                    switch (val.demandprogress){
                        case "0":
                            tag = tag0;
                            break;
                        case "1":
                            tag = tag1;
                            break;
                        case "2":
                            tag = tag2;
                            break;
                        case "3":
                            tag = tag3;
                            break;
                    }
                    a.push({
                        img,
                        name,
                        tag
                    })
                });
                console.log(a)
                return a;
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
    .rolling:hover{
        animation: mytext 1s linear infinite;
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
            width: 15px;
            /*height: 23px;*/
            left: -38px;
            top: -2px;
        }
        >div:first-of-type{
            cursor: pointer;
            display: flex;
            >div{
                overflow: hidden;
                font-size: 1.3rem !important;
                white-space: nowrap;
                margin: 0;
                color: #605E7C;
                width: 54px;
                display: flex;
                flex-flow: row nowrap;
                >div{
                    letter-spacing: .5px;
                    height: 50px;
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
            height: 105px;
            padding: 20px 0 0 40px;
            border-bottom: 1px solid #f3f3f3;
        }
    }
</style>