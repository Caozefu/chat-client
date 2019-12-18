<template>
    <div class="message-detail">
        <van-nav-bar :title="userName" left-arrow @click-left="back">
            <van-icon name="ellipsis" slot="right" />
        </van-nav-bar>
        <div class="message-content">
            <ul>
                <li v-for="(item, index) in messageList" :key="index">
                    <img :src="item.portrait" alt="">
                    <span class="message-part">{{item.msg}}</span>
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
            this.IO = io.connect('http://35.241.111.247:3000/');
            this.IO.on('chat message', (data) => {
                console.log(data);
                this.messageList.push(data);
            });
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        methods: {
            send() {
                this.IO.emit('chat message', {
                    portrait: this.userInfo.portrait,
                    name: this.userInfo.user_name,
                    msg: this.msg
                });
                this.msg = '';
            },
            back() {
                this.$router.push('/message');
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
            height: calc(100vh - 46px);
            overflow-y: auto;
        }
        & > ul li {
            height: 60px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            & > img {
                display: block;
                width: 45px;
                height: 45px;
                float: left;
                margin-right: 15px;
            }
            .message-part {
                display: block;
                line-height: 45px;
                background-color: #fff;
                float: left;
                padding: 0 10px;
                border-radius: 5px;
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
