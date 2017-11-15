<template>
    <div class="fly-list">
        <div v-for="key in flyGrade">{{key}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        props:['flyGrade']
    }
</script>
<style scoped lang="scss">
    .fly-list{
        display: flex;
        flex-flow: row wrap;
        padding-left: 20px;
        color: #605E7C;
        >div{
            width:40px ;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 15px;
            border:1px solid #979797;
            margin: 10px 12px 0 0;
            letter-spacing:.2px;
        }
    }
</style>