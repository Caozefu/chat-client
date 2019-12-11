<template>
    <div class="register">
        <van-nav-bar title="注册"/>
        <van-row type="flex" justify="center" style="margin-top: 4vh;">
            <van-uploader v-model="fileList" :max-count="1"/>
        </van-row>
        <van-row type="flex" justify="center">
            <p>头像</p>
        </van-row>
        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />
            <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    required
            />
        </van-cell-group>
        <van-row type="flex" justify="center" style="margin-top: 2vh;">
            <van-button plain hairline type="primary">点击注册</van-button>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                fileList: [],
                username: '',
                password: '',
                phone: ''
            }
        }
    }
</script>

<style scoped>

</style>
