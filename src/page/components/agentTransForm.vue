<template>
    <div class="agent-form">
        <div class="t-must">
            <div class="form-box">
                <div class="t-title">发布标题</div><input type="text" placeholder="标题会根据您的内容自动生成">
            </div>
            <div class="form-box">
                <div class="t-title">联系人</div><input type="text" placeholder="请填写有效联系人">
            </div>
            <div class="form-box">
                <div class="t-title">联系方式</div><input type="text" placeholder="请填写有效联系方式">
                <div class="error" v-show="isError">*电话格式有误，请重新输入</div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="scss">

</style>
