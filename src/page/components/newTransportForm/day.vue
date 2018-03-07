<template>
    <div>
        <input :id="num" class="magic-checkbox" type="checkbox" :checked="checked">
        <label :for="num" @click="checkboxClickFn">{{num}}</label>
    </div>
</template>
<script>
    export default {
        props: ['num', 'dayNum'],
        data() {
            return {
                checked: true
            }
        },
        components: {},
        mounted() {
            this.$nextTick(() => {
                if(this.dayNum.indexOf(this.num) != '-1') {
                    this.checked = true;
                }else {
                    this.checked = false;
                }
            })
        },
        methods: {
            checkboxClickFn() {
                this.checked = !this.checked;
                if(this.checked) {      // 选中传值
                    this.$emit('dayCheckedFn');
                }else{
                    this.$emit('dayUncheckedFn');
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .magic-checkbox {
        position: absolute;
        display: none;
    }
    .magic-checkbox + label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        font-size: 12px;
        background: white;
        color: #7D7C93;
        border: 1px solid #E6E6E6;
        border-radius: 4px;
        user-select: none;
        cursor: pointer;
    }
    .magic-checkbox:checked + label {
        width: 20px;
        height: 20px;
        background: #3c78ff;
        border: none;
        color: white;
    }
</style>