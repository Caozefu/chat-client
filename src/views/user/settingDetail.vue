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
            <van-cell title="昵称" is-link :value="userInfo.nickname" @click="openPopup('昵称', userInfo.nickname, 'nickname')"></van-cell>
            <van-cell title="用户名" :value="userInfo.user_name"></van-cell>
            <van-cell title="性别" is-link :value="userInfo.sex | formatSex" @click="openPopup('性别', userInfo.sex, 'sex')"></van-cell>
            <van-cell title="手机号" is-link :value="userInfo.phone" @click="openPopup('手机号', userInfo.phone, 'phone')"></van-cell>
        </van-cell-group>
        <van-popup
                v-model="show"
                position="bottom"
                :style="{ height: '18%', background: '#ededed' }"
        >
            <van-cell-group style="margin-top: 2vh;margin-bottom: 2vh">
                <van-field
                        v-model="newValue"
                        :label="popupLabel"
                        :placeholder="popupValue"
                        clearable
                        autofocus
                ></van-field>
            </van-cell-group>
            <div class="confirm-buttons">
                <van-button type="primary" @click="confirm()">保存</van-button>
                <van-button type="warning" @click="show = false">取消</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'vant';

    export default {
        name: "settingDetail",
        data() {
            return {
                show: false,
                popupLabel: '',
                popupValue: '',
                newValue: '',
                type: ''
            }
        },
        methods: {
            back() {
                this.$router.push('/setting');
            },
            openPopup(label, value, type) {
                this.show = true;
                this.popupLabel = label;
                this.popupValue = value;
                this.type = type;
            },
            confirm() {
                if (!this.newValue) return;
                this.$http.post('/api/updateUserInfo', {
                    key: this.type,
                    value: this.newValue
                }).then(res => {
                    if (res.data.code === 200) {
                        Toast.success('修改成功');
                        this.show = false;
                        this.newValue = '';
                        this.updateUserInfo()
                    } else {
                        Toast.fail(res.data.message);
                    }
                }).catch(() => {
                    Toast.fail('修改失败，请稍后重试');
                })
            },
            updateUserInfo() {
                this.$http.get('/api/getUserInfo')
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$store.commit('login', res.data.data);
                        } else {
                            Toast.fail('获取用户信息失败');
                            this.$store.commit('logout');
                        }
                    })
                    .catch(() => {
                        Toast.fail('获取用户信息失败');
                    })
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
        .confirm-buttons {
            display: flex;
            justify-content: space-around;
            & > button {
                width: 35vw;
            }
        }
    }
</style>
