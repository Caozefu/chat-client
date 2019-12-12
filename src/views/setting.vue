<template>
    <div class="setting">
        <van-sticky>
            <van-nav-bar title="设置"/>
        </van-sticky>
        <van-cell-group>
            <van-cell is-link class="user-info">
                <template slot="title">
                    <div class="message-list-left">
                        <div class="portrait">
                            <img :src="userInfo.portrait" alt="">
                        </div>
                        <div class="custom-title">
                            <p class="user-name">{{userInfo.user_name}}</p>
                            <p class="last-message">用户名: {{userInfo.nickname}}</p>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 1vh; margin-bottom: 1vh;">
            <van-cell title="关于我们" is-link to="" />
        </van-cell-group>
        <van-button type="primary" size="large" @click="logout">退出登陆</van-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'vant';

    export default {
        name: "setting",
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        methods: {
            logout() {
                Toast.success('已退出登陆');
                this.$store.commit('logout');
                localStorage.removeItem('token');
                this.$router.push('/login')
            }
        },
        mounted() {
            console.log(this.userInfo);
        }
    }
</script>

<style lang="less">
.user-info {
    display: flex;
    align-items: center;
}
</style>
