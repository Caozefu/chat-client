<template>
    <div class="setting-detail">
        <van-nav-bar title="个人信息" left-arrow @click-left="back"></van-nav-bar>
        <van-cell-group>
            <van-cell is-link>
                <template slot="title">
                    <span class="custom-title">头像</span>
                </template>
                <img class="user-portrait" :src="userInfo.portrait" alt="">
            </van-cell>
            <van-cell title="昵称" is-link :value="userInfo.nickname" @click="openPopup()"></van-cell>
            <van-cell title="用户名" :value="userInfo.user_name"></van-cell>
            <van-cell title="性别" is-link :value="userInfo.sex | formatSex"></van-cell>
            <van-cell title="手机号" is-link :value="userInfo.phone"></van-cell>
        </van-cell-group>
        <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '20%' }"
        >
            <van-cell-group>
                <van-field
                        value="123"
                        label="用户名"
                        left-icon="contact"
                ></van-field>
            </van-cell-group>
        </van-popup>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    // import {Toast} from 'vant';

    export default {
        name: "settingDetail",
        data() {
            return {
                show: false
            }
        },
        methods: {
            back() {
                this.$router.push('/setting');
            },
            openPopup() {
                this.show = true;
            }
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        filters: {
            formatSex(val) {
                switch (val) {
                    case 0:
                        return '女';
                        break;
                    case 1:
                        return '男';
                        break;
                    case -1:
                        return '暂未设置';
                        break;
                }
            }
        }
    }
</script>

<style lang="less">
    .setting-detail {
        .van-cell {
            display: flex;
            align-items: center;
        }
        .user-portrait {
            display: block;
            float: right;
            width: 12vw;
            height: 12vw;
        }
    }
</style>
