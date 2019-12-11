<template>
    <div class="register">
        <van-nav-bar title="注册"/>
        <van-uploader v-model="fileList" :max-count="1"/>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                fileList: []
            }
        }
    }
</script>

<style scoped>

</style>
