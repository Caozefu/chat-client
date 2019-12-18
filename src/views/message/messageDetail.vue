<template>
    <div class="message-detail">
        <van-nav-bar :title="userName" left-arrow @click-left="back">
            <van-icon name="ellipsis" slot="right" />
        </van-nav-bar>
        <div class="message-content">
            <ul ref="message">
                <li v-for="(item, index) in messageList" :key="index" :class="item.type ? 'own' : 'other'">
                    <img :src="item.portrait" alt="" v-if="!item.type">
                    <span class="message-part">{{item.msg}}</span>
                    <img :src="item.portrait" alt="" v-if="item.type">
                </li>
            </ul>
        </div>
        <van-tabbar class="input-bar van-hairline--top">
            <van-field v-model="msg" center clearable style="padding: 0" @keyup.enter="send">
                <van-button slot="button" size="small" type="primary" @click="send">发送</van-button>
            </van-field>
        </van-tabbar>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import io from "socket.io-client";
    export default {
        name: "messageDetail",
        data() {
            return {
                userName: '',
                msg: '',
                IO: null,
                messageList: []
            }
        },
        created() {
            this.userName = this.$route.query.name;
            this.IO = io.connect('http://192.168.25.129:3000/');
            this.IO.on('chat message', (data) => {
                const type = {type: this.userInfo.user_uid === data.id};
                this.messageList.push(Object.assign(data, type));
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            });
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        methods: {
            send() {
                if (!this.msg.trim()) return;
                this.IO.emit('chat message', {
                    portrait: this.userInfo.portrait,
                    name: this.userInfo.user_name,
                    id: this.userInfo.user_uid,
                    msg: this.msg
                });
                this.msg = '';
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            },
            back() {
                this.$router.push('/');
            },
            // 滚动到屏幕底部
            scrollToBottom() {
                const h = this.$refs['message'].scrollHeight;
                this.$refs['message'].scrollTop = h;
            }
        }
    }
</script>

<style lang="less" scoped>
    .message-detail {
        height: 100vh;
        background-color: #ededed;
    }
    .message-content {
        & > ul {
            height: calc(100vh - 96px);
            overflow-y: auto;
        }
        & > ul li {
            margin-top: 15px;
            display: flex;
            align-items: flex-start;
            padding: 0 10px;
            &:last-child {
                margin-bottom: 15px;
            }
            & > img {
                display: block;
                width: 45px;
                height: 45px;
                float: left;
                margin-right: 15px;
            }
            .message-part {
                max-width: calc(100vw - 100px);
                display: block;
                line-height: 45px;
                background-color: #fefefe;
                float: left;
                padding: 0 10px;
                border-radius: 5px;
                word-break: break-all;
                position: relative;
            }
            &.other {
                .message-part:after {
                    content: '';
                    display: block;
                    border: 5px solid transparent;
                    border-right-color: #fefefe;
                    position: absolute;
                    top: 20px;
                    left: -10px;
                    transform: translateY(-50%);
                }
            }
            &.own {
                justify-content: flex-end;
                & > img {
                    margin-left: 15px;
                    margin-right: 0;
                }
                .message-part {
                    background-color: #abe97c;
                    &:after {
                        content: '';
                        display: block;
                        border: 5px solid transparent;
                        border-left-color: #abe97c;
                        position: absolute;
                        top: 20px;
                        right: -10px;
                        transform: translateY(-50%);
                    }
                }
            }
        }
    }
    .input-bar {
        box-sizing: border-box;
        padding: 10px 16px;
        background-color: #ededed;
        box-shadow: 1px 1px 10px 1px #ccc;
    }
</style>
