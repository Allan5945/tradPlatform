<template>
    <div class="fly-list">
        <div v-for="key in flyGrade">
            <div v-for="vl in key">{{vl}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: ['flyGrade']
    }
</script>
<style scoped lang="scss">
    .fly-list {
        display: flex;
        flex-flow: row nowrap;
        padding-left: 20px;
        > div {
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
            > div {
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 15px;
                border: 1px solid #d8d8d8;
                margin: 10px 12px 0 0;
            }
        }
    }
</style>