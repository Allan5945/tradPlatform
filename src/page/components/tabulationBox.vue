<template>
    <div class="tabulation-box" id="tabulationBox" :class="{tabulationBoxH:hidden,scroll:hidden}">
        <div v-for="(key,index) in renderData">
            <div class="tabulation-item">
                <img :src='key.img' alt="">
                <div class="font-bold" @click="getDetail(key)">
                    <div v-for="(item,d) in key.name">
                        <div>
                            <div :class="{rolling:(item.length > 4)}">{{item}}</div>
                        </div>
                        <span v-if="d != key.name.length - 1">-</span>
                    </div>
                </div>
                <div><img :src='key.tag' alt=""></div>
            </div>
            <div class="tabulation-mes">
                <div v-for="ite in key.simpleDemand">
                    <span>{{ite.key}}</span>
                    <div>{{ite.val}}</div>
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
                hidden:false,
                set:''
            }
        },
        mounted:function () {
            // 更改提示框高度
            window.onresize = ()=>{
                if(this.set != ''){clearTimeout(this.set)};
                this.set = setTimeout(()=>{this.resetWindow()},100);
            };
            this.resetWindow();
            let tabulationBox =  document.getElementById('tabulationBox');
            tabulationBox.addEventListener('scroll',(e)=> {
                let z = 126 * this.renderData.length;
                let b = Number(tabulationBox.style.height.split('px')[0]);
                let x = (z-b)/1.2;
                if(tabulationBox.scrollTop >= x){
                    if(this.demandList.type && this.demandList.hybridPage < this.demandList.hybridData.pageCount){  // 混合数据
                        this.$store.dispatch('hybridData', {v:(this.demandList.hybridPage + 1),t:1}).then(() => {
                            this.$ajax({
                                url:"/getDemandsForCurrentEmployee",
                                method: 'post',
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                params: {
                                    page:this.demandList.hybridPage
                                }
                            }) .then((response) => {
                                this.$store.dispatch('hybridData',{v:response.data.list.list,t:2}).then(() => {});
                            })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    }else if(!this.demandList.type && this.demandList.monoPage < this.demandList.monoPage.pageCount){ // 非混合数据
                        this.$store.dispatch('monoData', {v:(this.demandList.monoPage + 1),t:1}).then(() => {
                            this.$ajax({
                                url:"/getDemandsForCurrentCheckedAirport",
                                method: 'post',
                                headers: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                params: {
                                    page:this.demandList.monoPage
                                }
                            }) .then((response) => {
                                this.$store.dispatch('monoData',{v:response.data.list.list,t:2}).then(() => {});
                            })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    }
                }
            });
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
           },
           getDetail: function (val) {
                let userData ={ };
                userData.demandId = val.data.id;
                userData.employeeId = val.data.employeeId;
               console.log( userData.demandId)
               console.log(val.data.demandtype)
               console.log(val.data.employeeId)
                switch (val.data.demandtype){
                       // case "0":
                          //  this.$emit("ShowLineDetail",demandId);
                           // break;
                        case "1":
                            this.$store.dispatch('transDetail',userData);
                            break;
                        //case "2":
                          //  this.$emit("ShowAgentDetail",demandId);
                           // break;
                    }
           }
        },
        updated:function () {
            this.resetWindow();
        },
        computed:{
            ...vx.mapGetters([
                'demandList',
                'role'
            ]),
            renderData:function () {
                let d,a = [];
                if(this.demandList.type){
                    d = this.demandList.hybridData.list;

                }else{
                    d = this.demandList.monoData.list;
                }
                d.forEach((val)=>{
                    let img ,name = [],tag;
                    if(val.dpt != null){
                        name.push(val.dpt)
                    };
                    if(val.arrv != null){
                        name.push(val.arrv)
                    };
                    if(val.pst != null){
                        name.push(val.pst)
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
                        tag,
                        simpleDemand:val.simpleDemand,
                        data:val
                    })
                });
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
            margin-left:-110%;
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
        animation: mytext 1.5s linear infinite;
    }
    .tabulation-mes{
        >div{
            >span{
                display: inline-block;
                padding-bottom: 8px;
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
                font-size: 1.3rem !important;
                white-space: nowrap;
                margin: 0;
                width: 60px;
                color: #605E7C;
                display: flex;
                flex-flow: row nowrap;
                >div{
                    width: 54px;
                    overflow: hidden;
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
