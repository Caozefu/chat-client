<template>
    <div class="message">
        <van-nav-bar title="消息列表"/>
        <van-cell-group>
            <van-cell v-for="(item, index) in messageList" :key="index" @click="toDetail">
                <template slot="title">
                    <div class="message-list-left">
                        <div class="portrait">
                            <img :src="item.portrait" alt="">
                        </div>
                        <div class="custom-title">
                            <p class="user-name">{{item.userName}}</p>
                            <p class="last-message">{{item.lastMsg}}</p>
                        </div>
                    </div>
                </template>
                <span class="message-time">{{item.time}}</span>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "message",
        data() {
            return {
                messageList: [
                    {
                        portrait: 'https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg',
                        userName: '是倒计时倒计时',
                        lastMsg: 'hello!',
                        time: '16:22'
                    }
                ]
            }
        },
        methods: {
            toDetail() {
                this.$router.push({
                    name: 'messageDetail'
                });
            }
        }
    }
</script>

<style lang="less">
    .message-list-left {
        display: flex;
        align-items: center;
        .portrait {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            overflow: hidden;
            & > img {
                width: 100%;
                height: 100%;
            }
        }
        .custom-title {
            line-height: 10px;
            margin-left: 10px;
            .user-name {
                font-weight: 900;
                font-size: 18px;
                /*overflow: hidden;*/
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .last-message {
                font-size: 14px;
                color: #999;
            }
        }
    }
    .message-time {
        display: block;
        margin-top: 10px;
    }
</style>
