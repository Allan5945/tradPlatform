<template>
    <div class="t-form scroll popup">
        <div class="t-must">
            <div class="form-box">
                <div class="t-title">联系人</div><input type="text" placeholder="请填写有效联系人">
            </div>
            <div class="form-box">
                <div class="t-title">联系方式</div><input type="text" placeholder="请填写有效联系方式">
                <div class="error" v-show="isError">*电话格式有误，请重新输入</div>
            </div>
        </div>
        <div class="t-optional">
            <div class="form-box">
                <div class="t-title">出港时刻</div>
                <div class="radio-box">
                    <div class="t-radio">
                        <input type="radio"  id="timeYes" v-model="getTime" value="true"><label for="timeYes">有</label>
                    </div>
                    <div class="selected" v-if="this.getTime == 'true'">
                        <div>00:00</div><span>-</span><div>00:00</div>
                    </div>
                    <div class="t-radio">
                        <input type="radio"  id="timeNo" v-model="getTime" value="false"><label for="timeNo">无</label>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <div class="t-title">是否有班期</div>
                <div class="radio-box">
                    <div class="t-radio">
                        <input type="radio"  id="flightYes" v-model="getFlight" value="true"><label for="flightYes">有</label>
                    </div>
                    <div class="selected border" @click="showBox=!showBox" v-show="this.getFlight == 'true'">
                        <span class="fl-til" v-text="msg" :class="{selec:isSel}"></span>
                        <span class="icon-item icon-item1">&#xe605;</span>
                        <div class="dropDown popup" v-show="showBox">
                            <div @click="getNeed(index)" v-for="(value,index) in stateType">{{value}}</div>
                        </div>
                    </div>
                    <div class="t-radio">
                        <input type="radio"  id="flightNo" v-model="getFlight" value="flase"><label for="flightNo">无</label>
                    </div>
                </div>
            </div>
            <div class="form-box air-route">
                <div class="t-title">意向航线</div>
                <input type="text" placeholder="起飞机场"><span class="icon-item ">&#xe672;</span>
                <input type="text" placeholder="经停机场（可选填）"><span class="icon-item ">&#xe672;</span>
                <input type="text" placeholder="目标机场（可选填）">
            </div>
            <div class="form-box">
                <div class="t-title">机型</div><input type="text" placeholder="输入选择机型">
            </div>
            <div class="form-box">
                <div class="t-title">运力基地</div><input type="text" placeholder="输入选择机场">
            </div>
            <div class="form-box reset">
                <div class="t-title">运力归属</div><input type="text" placeholder="输入选择航司">
            </div>
            <div class="form-box reset">
                <div class="t-title">座位布局</div><input type="text" placeholder="填写举例：F8Y160">
            </div>
            <div class="form-box pad1 taken">
                <div class="t-title">小时成本</div><input type="text" placeholder="请填写小时成本">
                <span>/h</span>
            </div>
            <div class="form-box pad1">
                <div class="t-checkbox">
                    <input type="checkbox" name=" " id="dispatch"><label for="dispatch">接受调度</label>
                </div>
            </div>
            <div class="form-box tips pad1">
                <div class="t-title">其他说明</div><input type="text" placeholder="可选填" v-model="tip">
                <span class="num"><span >{{num}}</span>/35</span>
            </div>
            <div class="form-box get-time">
                <div class="t-title">发布有效期</div>
                <div class="time-btn"><span class="icon-item ">&#xe607;</span>选择起止时间</div>
            </div>
        </div>
        <div class="post-type">
            <div class="t-radio">
                <input type="radio" name="type" id="type1"><label for="type1">对所有人公开</label>
            </div>
            <div class="t-radio">
                <input type="radio" name="type" id="type2"><label for="type2">对认证用户公开</label>
            </div>
            <div class="t-radio">
                <input type="radio" name="type" id="type3"><label for="type3">定向发布</label>
            </div>
        </div>
        <div class="t-btn">
            <div class="agent-btn">委托代理</div>
            <div class="confirm-btn">确认发布</div>
            <div class="cancel-btn">取消</div>
        </div>
    </div>
</template>
<script>
/*import '../../static/js/jquery-1.8.3.min.js'*/
/*import '../../../static/js/moment.min.js'*/
/*import '../../static/js/daterangepicker.js'*/

    export default {
        data () {
            return{
                showBox: false,
                isSel: false,
                isError: false,
                getFlight: '',
                getTime: '',
                tip: '',
                msg:'选择班机类型',
                stateType:['待定','满排','半排']
            }
        },
        components:{

        },
        methods:{
             getNeed: function(i) {
                this.msg = this.stateType[i];
                this.isSel = true;
            }
        },
        computed:{
            num: function(){
                return this.tip.length <= 35? this.tip.length: 35;
            }
        },
        watch:{
            /*tip: function(val,oldVal){
                let len = oldVal.length;
                if(len>35){
                    val = oldVal.slice(1,3);
                }
            }*/
        }

    }
</script>

<style scoped lang="scss">

/* import '../../static/css/animate.min.css'
import '../../static/css/bootstrap.min.css'
import '../../static/css/daterangepicker-bs3.css'
import '../../static/css/font-awesome.min.css' */

    input {
        outline:none;
        border: 0;
        color: #605E7C;
        border-bottom:1px solid rgba(151,151,151,.3);
    }
    .t-form{
        position:absolute;
        top:65px;
        left:0;
        z-index:99;
        box-sizing:border-box;
        overflow-y: scroll;
        font-size:1.2rem;
        padding:20px;
        width:620px;
        height:630px;
        color: #605E7C;
        border-radius:4px;
        background-color:#fff;
        .t-must,.t-optional{
            width:100%;
            box-sizing:border-box;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding:0 20px;
            border-radius:5px;
            background-color:#FBFBFB;
        }
        .t-optional{
            margin-top:10px;
        }

    }
    .form-box{
        width:240px;
        height:26px;
        line-height:26px;
        padding:27px 0;
        display:flex;
        .t-title{
            width:60px;
            overflow:hidden;
        }
        .radio-box{
            width:180px;
            display:flex;
        }
        >input{
            width:180px;
            height:26px;
            background-color: #FBFBFB;
        }
    }
    .t-form .reset{
        height:26px;
        padding:17px 0;
    }
    .air-route{
        width:580px;
        padding:20px 0 34px 0;
        >input{
            width:138px;
            height:26px;
        }
        >span{
            dispaly:inline-block;
            width:30px;
            text-align:center;
            font-size:2rem;
        }
    }
    .tips{
        position:relative;
        width:580px;
        >input{
            width:465px;
        }
        .num{
            position:absolute;
            right:0;
            top:24px;
        }
    }
    .get-time .time-btn{
        box-sizing:border-box;
        position:relative;
        height:26px;
        width:146px;
        margin-left:14px;
        border:1px solid rgba(151,151,151,.3);
        border-radius:5px;
        text-align:center;
        padding-left:20px;
        span{
            position:absolute;
            left:0;
            top:0;
            width:20px;
            border-right:1px solid rgba(151,151,151,.3);
        }
    }

    .post-type{
        display: flex;
        margin: 40px 0 70px 0;
        .t-radio{
            margin-right:20px;
        }
    }
    .t-btn{
        font-size: 1.5rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        margin-bottom:22px;
        >div{
          height:40px;
          line-height:40px;
          border-radius:100px;
          text-align:center;
          color:#ffffff;
          background-color:#3c78ff;
          cursor:pointer;
        }
        .agent-btn{
          width:100px;
          margin-right: 20px;
        }
        .confirm-btn{
          width:190px;
          margin:0 10px;
        }
        .cancel-btn{
          width:80px;
          color:#605e7c;
          box-sizing:border-box;
          background-color:#fff;
          border: 1px solid #605e7c;
        }
    }
    .pad1{
        padding:20px 0 34px 0;
    }
    .selected{
        position:relative;
        width:100px;
        height:26px;
        line-height:26px;
        margin-left:5px;
        display:flex;
        cursor:pointer;
        >div{
            width:40px;
            text-align:center;
            color:rgba(96,94,124,.4);
            border:1px solid rgba(151,151,151,.3);
            border-radius:5px;
        }
        >span{
            padding:0 3px;
        }
    }
    .icon-item {
        font-size: 1.6rem;
        font-family: iconfont;
    }
    .icon-item1{
        padding-left:14px;
        color: #446cea;
        line-height: 26px;
    }
    .border{
        border:1px solid rgba(151,151,151,.3);
        border-radius:5px;
        padding-left:5px;
    }
    .selected .dropDown {
        position:absolute;
        top:28px;
        left:0;
        width:107px;
        border:0 !important;
        border-radius: 4px;
        z-index:99;
        >div {
            width: 107px;
            height:35px;
            box-sizing: border-box;
            line-height:35px;
            background-color: #fff;
            padding-left: 14px;
            text-align:left;
            color: #605E7C;
            font-size: 1.2rem;
            cursor:pointer;
            &:hover{
                background-color:#f5f5f5;
            }
        }
    }
    .fl-til{
        display:inline-block;
        width:80px;
        color:rgba(96,94,124,.4);
    }
    .selec{
        color:#605E7C;
    }
    .taken{
        position:relative;
        >span{
            position:absolute;
            right:0;
            top:24px;
        }
    }
</style>
