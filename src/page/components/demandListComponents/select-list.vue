<template>
    <div class="select-b">
        <div class="select-h">
            <span class="select-icon">&#xe605;</span>
        </div>
        <div class="select-bd popup">
            <div v-for="(key,i) in select.options">{{key.text}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                select:{
                    selected:'',
                    options: [
                        { text: 'A320', value: 'A320' },
                        { text: 'A330', value: 'A330' },
                        { text: 'B737NG', value: 'B737NG' },
                        { text: 'E190/195', value: 'E190/195' },
                        { text: 'CRJ900', value: 'CRJ900' },
                        { text: 'MA60', value: 'MA60' },
                        { text: 'B787', value: 'B787' },
                        { text: 'B777', value: 'B777' },
                        { text: 'B767', value: 'B767' },
                        { text: 'E145', value: 'E145' },
                        { text: 'B757', value: 'B757' },
                        { text: 'B747', value: 'B747' },
                        { text: 'ARJ21', value: 'ARJ21' },
                        { text: '清除', value: '' }
                    ]
                },
            }
        }
    }
</script>
<style lang="scss" scoped>
    .select-b{
        width: 120px;
        position: relative;
    }
    .select-h{
        border: 1px solid rgba(96, 94, 124, 0.4);
        border-radius: 10px;
        height: 25px;
        position: relative;
        width: 100%;
    }
    .select-icon{
        font-family: iconfont;
        font-size: 18px;
        color: #3c78ff;
        position: absolute;
        right: 5px;
        top: 1px;
        cursor: pointer;
        &:hover{
            color: #6186ff;
        }
    }
    .select-bd{
        position: absolute;
        background-color: white;
        width: 100%;
        padding: 10px 0;
        >div{
            padding: 0 0 0 15px;
            height: 20px;
            line-height: 20px;
            color: #605E7C;
        }
    }
</style>