<template>
    <div class="t-form">
        <div class="t-must">
            <div class="form-box">
                <div class="t-title">联系人</div><input type="text" placeholder="请填写有效联系人">
            </div>
            <div class="form-box">
                <div class="t-title">联系方式</div><input type="text" placeholder="请填写有效联系方式">
            </div>
        </div>
        <div class="t-optional">
            <div class="form-box">
                <div class="t-title">出港时刻</div>
                <div class="radio-box">
                    <div class="t-radio">
                        <input type="radio" name="t-time" id="timeYes"><label for="timeYes">有</label>
                    </div>
                    <div class="t-radio">
                        <input type="radio" name="t-time" id="timeNo"><label for="timeNo">无</label>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <div class="t-title">是否有班期</div>
                <div class="radio-box">
                    <div class="t-radio">
                        <input type="radio" name="t-flight" id="flightYes"><label for="flightYes">有</label>
                    </div>
                    <div class="t-radio">
                        <input type="radio" name="t-flight" id="flightNo"><label for="flightNo">无</label>
                    </div>
                </div>
            </div>
            <div class="form-box air-route">
                <div class="t-title">意向航线</div>
                <input type="text" placeholder="起飞机场"><span>--</span>
                <input type="text" placeholder="经停机场（可选填）"><span>--</span>
                <input type="text" placeholder="目标机场（可选填）">
            </div>
            <div class="form-box">
                <div class="t-title">机型</div><input type="text" placeholder="输入选择机型">
            </div>
            <div class="form-box">
                <div class="t-title">运力基地</div><input type="text" placeholder="输入选择机场">
            </div>
            <div class="form-box">
                <div class="t-title">运力归属</div><input type="text" placeholder="输入选择航司">
            </div>
            <div class="form-box">
                <div class="t-title">座位布局</div><input type="text" placeholder="填写举例：F8Y160">
            </div>
            <div class="form-box">
                <div class="t-title">小时成本</div><input type="text" placeholder="请填写小时成本">
                <span>/h</span>
            </div>
            <div class="form-box">
                <div class="t-checkbox">
                    <input type="checkbox" name=" " id="dispatch"><label for="dispatch">接受调度</label>
                </div>
            </div>
            <div class="form-box tips">
                <div class="t-title">其他说明</div><input type="text" placeholder="可选填">
            </div>
            <div class="form-box get-time">
                <div class="t-title">发布有效期</div>
                <span>--</span>
                <div class="time-btn">选择起止时间</div>
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
            <div class="cancel-btn" @click="cancel">取消</div>
        </div>
    </div>
</template>
<script>

</script>

<style scoped lang="scss">
    input {
        outline:none;
        border: 0;
        border-bottom:1px solid #605E7C;
    }
    .t-form{
        position:absolute;
        top:65px;
        left:0;
        box-sizing:border-box;
        overflow-y: scroll;
        padding:20px;
        width:620px;
        height:400px;
        border-radius:4px;
        background-color: #fff;
        .t-must,.t-optional{
            width:100%;
            box-sizing:border-box;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding:0 20px;
            border-radius:4px;
            background-color:#FBFBFB;
        }
        .t-optional{
            margin-top:10px;
        }

    }
    .form-box{
        width:240px;
        height:80px;
        display:flex;
        line-height:80px;
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
            line-height:26px;
            margin-top:26px;
            background-color: #FBFBFB;
        }
    }
    .air-route{
        width:580px;
        >input{
            width:135px;
            height:26px;
        }
        >span{
            dispaly:inline-block;
            width:30px;
        }
    }
    .tips{
        width:580px;
        >input{
            width:465px;
        }
    }
    .get-time{
        span{
            margin-left:14px;
        }
        .time-btn{
            height:26px;
        }
    }
    .post-type{
        display: flex;
        margin: 40px 0 70px 0;
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
</style>
