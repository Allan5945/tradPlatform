<template>
    <div class="edit-div"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script>
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            canEdit: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            'value'(){
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .edit-div{
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
    }
</style>