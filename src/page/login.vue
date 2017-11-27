<template>
    <div>
        <h1>登录</h1>
    </div>
</template>

<script>
    import * as vx from 'vuex'
    export default {
        data () {
            return {
                name:1
            }
        },
        mounted:function () {
            this.$ajax({
                method: 'post',
                url: '/login',
                params:{
                    username:'TGOadmin',//BKadmin*权限0 //KYadmin*权限1 //TGOadmin*权限2
                    password:"admin"
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
        },
        computed:{
            ...vx.mapGetters([
                'c_updated'
            ])
        }
    }
</script>