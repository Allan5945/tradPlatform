<template>
    <div>
        <div class="oper-til"></div>
        <transForm></transForm>
        <airlineReq></airlineReq>
    </div>
</template>
<script>
    import transForm from './../transportForm.vue'
    import airlineReq from './../airlineReq.vue'
    export default {
        props: {
            state: {type: Array}
        },
        data() {
            return {

            }
        },
        methods: {

        },
        components: {
            transForm,
            airlineReq
        }
    }
</script>
<style lang="scss" scoped>

</style>
