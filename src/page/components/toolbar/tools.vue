<template>
    <div class="tool popup">
        <a v-if="uuid && uuid.length>5" :href="uuid" target="_blank"><span>&#xe671;</span>航路测算</a>
        <router-link to="/index/information">
            <span>&#xe6fb;</span>信息查询
        </router-link>
        <div @click ="toSearchTime"><span>&#xe621;</span>时刻分布</div>
    </div>
</template>
<script>
    import * as vx from 'vuex'
    export default {
        computed:{
            ...vx.mapGetters([
                'role',
                'searchInfo'
            ]),
            uuid:function () {
                return `http://192.168.22.8/hangyu_login?uuid=${this.role.uuid}`
            }
        },
        methods:{
            toSearchTime(){
                this.$store.dispatch('searchInfo', {
                    qyCode : '',
                    searchText:'',
                    selcType :'时刻'
                });
                 this.$router.push({ path: '/index/information/time'});
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../public/css/dropDowBbox";
    .tool div{
        padding-left: 14px;
        font-size: 1rem;
        height: 40px;
        color:#605E7C;
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        width: 100%;
        &:hover{
          color: #3c78ff;
          background-color: rgba(229, 229, 229, .2);
        }
        >span{
              font-family: iconfont;
              font-size: 1.8rem;
              margin-right: 5px;
        }
    }
</style>
