<template>
    <div>
        <h1>登录</h1>
        <input type="text" placeholder="用户名" v-model="username">
        <input type="password" placeholder="密码" v-model="password">
        <button @click="logined">登录</button>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    export default {
        data () {
            return {
                username:'hangsi',
                password:'1',
                name:1
                /*username:'jichang',
                password:'1',
                name:1*/
            }
        },
        methods:{
            logined:function () {
                this.$ajax({
                    method: 'post',
                    url: '/login',
                    params:{
                        username:this.username,//BKadmin*权限0 //KYadmin*权限1 //TGOadmin*权限2d
                        password:this.password
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then((response) => {
                        if(response.data.obj != undefined){
                            this.$store.dispatch('role',response.data.obj).then((e) => {});
                            window.location.href='#/index';
                        }else{
                            alert('错了')
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );
            }
        },
        mounted:function () {
            this.logined();
        },
        computed:{
            ...vx.mapGetters([
                'c_updated'
            ])
        }
    }
</script>
