<template>
    <transition name="slidex-fade">
    <section class="setting-wrap" @click.self="closeDetail">
        <div class="box shadow">
            <div class="setting-header">
                <p class="mgr-l">个人设置<span  class="iconfont closer" @click="closeDetail">&#xe62c;</span></p>
            </div>
            <div class="setting-body">
                <ul class="flex-three">
                    <li>
                        <div>关联手机</div>
                        <div>{{userData.phone}}</div>
                        <div>
                            <span class="tbtn"  @click="show.phone = true">修改手机</span>
                        </div>
                    </li>
                    <li>
                        <div>密码</div>
                        <div>***********</div>
                        <div>
                            <span class="tbtn" @click="show.pwd = true">修改密码</span>
                        </div>
                    </li>
                    <li>
                        <div>邮箱</div>
                        <div>{{ userData.mail }}</div>
                        <div>
                            <span class="tbtn" v-if="userData.mail" @click="show.unbindMail = true">解绑邮箱</span>
                            <span class="tbtn" v-else @click="show.bindMail = true">绑定邮箱</span>
                        </div>

                    </li>
                </ul>
                <ul class="flex-two">
                    <li>
                        <div>账号</div>
                        <div>{{ userData.account }}</div>
                    </li>
                    <li>
                        <div>姓名</div>
                        <div class="text-line"
                             :contenteditable="control.edit"
                             :class="{'text-edit':control.edit}"
                             @blur="changeText($event,0)">
                            {{ userData.name }}
                        </div>
                    </li>
                    <li>
                        <div>公司</div>
                        <div>{{userData.company}}</div>
                    </li>
                    <li>
                        <div>部门</div>
                        <div class="text-line"
                             :contenteditable="control.edit"
                             :class="{'text-edit':control.edit}"
                             @blur="changeText($event,1)">
                            {{ userData.department }}
                        </div>
                    </li>
                    <li>
                        <div>职务</div>
                        <div class="text-line"
                             :contenteditable="control.edit"
                             :class="{'text-edit':control.edit}"
                             @blur="changeText($event,2)">
                            {{userData.post}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="setting-footer flex-center">
                <span class="btn btn-prime" style="width: 150px;" @click="doEdit()">{{ control.edit?"保存修改":"修改" }}</span>
                <span class="btn btn-gray" @click="closeDetail">取消</span>
            </div>
        </div>

        <transition name="fade">
            <div class="swrapper flex-center" v-if="show.phone">
                <changePhone v-on:subchange="turnOver" :ud="userData"></changePhone>
            </div>
            <div class="swrapper flex-center" v-if="show.pwd">
                <changePwd v-on:subchange="turnOver" :ud="userData"></changePwd>
            </div>
            <div class="swrapper flex-center" v-if="show.bindMail">
                <bindMail v-on:subchange="turnOver" :ud="userData"></bindMail>
            </div>
            <div class="swrapper flex-center" v-if="show.unbindMail">
                <unbindMail v-on:subchange="turnOver" :ud="userData"></unbindMail>
            </div>
            <div class="swrapper flex-center" v-if="userData.showBackPwd">
                <backPwdBox v-on:subchange="turnOver" :ud="userData"></backPwdBox>
            </div>
        </transition>

    </section>
    </transition>
</template>

<script>
    import changePhone from './changePhone'
    import changePwd from './changePwd'
    import bindMail from './bindMail'
    import unbindMail from './unbindMail'
    import backPwdBox from './backPwdBox'

    export default{
        data(){
            return {
                show:{
                    phone:false,
                    pwd:false,
                    bindMail: false,
                    unbindMail: false,
                },
                userData:{
                    phone: '',
                    pwd: '',
                    account: '',
                    mail: '',
                    name: '',
                    company: '',
                    department: '',
                    post: '',
                    showBackPwd: false,
                    lastShow: ''
                },
                control:{
                    edit:false,
                    isChange: false
                },
            }
        },
        watch: {
            "userData.showBackPwd": function (n,o) {
                if(!n && this.userData.lastShow!==""){
                }
            }
        },
        components:{
            changePhone,
            changePwd,
            bindMail,
            unbindMail,
            backPwdBox
        },
        methods: {
            closeDetail:function () {//关闭所有
                this.$emit('closeSet');
            },
            turnOver: function (d) {
                let that = this;
                that.show[d.name] = false;
                if(d.name!=="backPwd"){
                    that.userData.lastShow = d.name;
                }
            },
            changeText(e,type){
                let txt = event.srcElement.innerText, changeFlag= false;
                switch (type){
                    case 0:
                        if(this.userData.name != txt){
                            this.userData.name = txt;
                            changeFlag = true;
                        }
                        break;
                    case 1:
                        if(this.userData.department != txt){
                            this.userData.department = txt;
                            changeFlag = true;
                        }
                        break;
                    case 2:
                        if(this.userData.post != txt){
                            this.userData.post = txt;
                            changeFlag = true;
                        }
                        break;
                }
                this.control.isChange = changeFlag;
            },
            doEdit(){
                let that = this,flag = that.control.edit,ud = that.userData;
                if(flag && that.control.isChange){
                    this.$ajax({
                        method: 'POST',
                        url: '/updateEmployee',
                        params:{
                            id: ud.id,
                            nickName: this.userData.name,
                            department: this.userData.department,
                            position: this.userData.post
                        }
                    }).then(res=>{
                        if(res.data.opResult === '0'){
                            this.$message({
                                showClose: true,
                                message: "修改成功！",
                                type: 'success',
                                duration: 1500
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: "修改失败，请稍后重试！",
                                type: 'error',
                                duration: 1500
                            });
                        }
                    }).catch(err=>{
                        this.$message({
                            showClose: true,
                            message: "网络错误，请稍后重试！",
                            type: 'error',
                            duration: 1500
                        });
                    })
                }
                that.control.edit = !that.control.edit;
            },
            getCurrentUser: function () {
                let that = this, ud = that.userData;
                this.$ajax({
                    method: 'GET',
                    url: '/loadPersonalInfo',
                }).then(res=>{
                    if(res.data.opResult === '0'){
                        let d = res.data.user;
                        ud.id = d.id;
                        ud.phone=d.phone;
                        ud.pwd=d.password;
                        ud.account=d.username;
                        ud.mail=d.email;
                        ud.name=d.nickName;
                        ud.company=d.companyName;
                        ud.department=d.department;
                        ud.post=d.position;
                    }else{
                        this.$message({
                            showClose: true,
                            message: "网络错误，请稍后重试！",
                            type: 'error',
                            duration: 1500
                        });
                    }
                }).catch(err=>{

                })
            },
        },
        created: function () {
            this.getCurrentUser()
        },
    }
</script>

<style lang="scss" scoped>
    $bt-c: #605e7c;
    $txt-c: #3c78ff;
    $bor-c: #efefef;
    $spt-c: #979797;
    $tableHead: #aaa;
    /*通用設定*/
    *{
        box-sizing: border-box;
        font-size: 12px;
    }
    /*主體内容*/
    .setting-wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        cursor: auto;
    }
    .shadow{
        box-shadow: 0px 2px 0px #888;
    }
    .box{
        position: absolute;
        width: 600px;;
        height: 100%;
        top: 0;
        right: 0;
        background-color: #fff;
        padding: 0;
    }
    .setting-header{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-indent: 50px;
        color: rgba(96,94,124,.7);
        box-shadow: 0px 5px 15px rgba(216, 216, 216, 0.9);
        z-index: 1;
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .closer{
        display: inline-block;
        position: absolute;
        right: 3%;
        top: 5px;
        margin-top:9px;
        width:22px;
        height:22px;
        line-height:22px;
        text-align:center;
        text-indent: 0;
        color:#3C78FF;
        border:1px solid #ededed;
        border-radius: 11px;
        cursor:pointer;
    }

    .setting-body{
        padding: 120px 118px 0 90px;
        .tbtn{
            display: inline-block;
            margin-top: 4px;
            width: 100px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            color: #fff;
            background-color: #3c78ff;
            box-shadow: 0px 2px 10px rgba(60,120,255,.6);
            text-align: center;
            cursor: pointer;
        }
        .text-line{
            height: 32px;
            margin-top: 4px;
            line-height: 32px;
            border-radius: 4px;
            border: 1px solid #fff;
            outline:none;
            &:focus{
                border: 1px solid rgba(60,120,255,.6);
                box-shadow: 0 0 8px rgba(60,120,255,.6);
            }
            input{
                -webkit-appearance: none;
            }
        }
        .text-edit{
            border: 1px solid #ccc;
        }
    }
    .flex-three>li{
        height: 40px;
        display: flex;
        align-content: flex-start;
        line-height: 40px;
        div:nth-child(1){
            color: $tableHead;
            padding-right: 26px;
            text-align: right;
            flex: 1;
        }
        div:nth-child(2){
            text-indent: 15px;
            flex: 2;
        }
        div:nth-child(3){
            flex: 1;
        }
    }
    .flex-two>li{
        height: 40px;
        display: flex;
        align-content: flex-start;
        line-height: 40px;
        div{
            /*border: 1px solid red;*/
        }
        div:nth-child(1){
            color: $tableHead;
            padding-right: 30px;
            text-align: right;
            flex: 1;
        }
        div:nth-child(2){
            text-indent: 8px;
            flex: 3;
        }
    }
    .flex-three-item{
    }

    .setting-footer{
        position: absolute;
        width: 94%;
        height: 120px;
        bottom: 0;
        border-top: 1px solid $spt-c;
        margin-left: 3%;
    }

    .swrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.2);
        z-index: 2;
    }

    .btn{
        display: inline-block;
        margin: 0 4px;
        text-align: center;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
    }
    .btn-prime{
        width: 220px;
        background-color: #3c78ff;
        box-shadow: 1px 1px 6px rgba(60,120,255,.6);
        &:hover{
            background-color: #508bff;
            box-shadow: 1px 2px 18px rgba(60, 120, 255, 0.5);
        }
    }
    .btn-gray{
        color: rgba(96, 94, 124, 0.6);
        box-shadow: 1px 1px 18px rgba(0, 0, 0, 0.13);
        width: 100px;
        border: 1px solid #ccc;
        &:hover{
            background-color: rgba(60,120,255,.7);
            color: #fff;
            box-shadow: 1px 2px 18px rgba(60,120,255,.5);
        }
    }
    .footer-s{
        position: absolute;
        width: 90%;
        height: 120px;
        bottom: 0;
        color:rgba(23, 21, 21, 0);
    }
</style>