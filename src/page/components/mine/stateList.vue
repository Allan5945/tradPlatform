<template>
    <div>
        <ul>
            <li v-for="item in state" @click="stateClickFn(item)">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            state: {type: Array}
        },
        data() {
            return {

            }
        },
        methods: {
            stateClickFn: function (item) {
                this.$emit('stateClick',item);
            }
        }
    }
</script>
<style lang="scss" scoped>
    $icon-color: #3c78ff;
    $font-color: #605e7c;
    $border-color: rgba(96,94,124,0.37);
    ul {
        position: absolute;
        top: 40px;
        left: 0;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 2px 11px $border-color;
        background: white;
        z-index: 2;
        li {
            display: flex;
            align-items: center;
            padding-left: 17px;
            width: 193px;
            height: 35px;
            font-size: 1.2rem;
            color: $font-color;
            cursor: pointer;
            &:hover {
                background: #F5F5F5;
            }
        }
    }
</style>
