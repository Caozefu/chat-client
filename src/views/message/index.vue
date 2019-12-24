<template>
    <div class="message">
        <van-sticky>
            <van-nav-bar title="消息列表"/>
        </van-sticky>
        <van-cell-group>
            <van-cell v-for="(item, index) in messageList" :key="index" @click="toDetail(item.id, item.name)">
                <template slot="title">
                    <div class="message-list-left">
                        <div class="portrait">
                            <img :src="item.portrait" alt="">
                        </div>
                        <div class="custom-title">
                            <p class="user-name">{{item.name}}</p>
                            <p class="last-message">{{item.msg}}</p>
                        </div>
                    </div>
                </template>
                <span class="message-time">{{item.time | formatTime}}</span>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import io from "socket.io-client";
    import sortArrayByKey from "../../utils/sortArrayByKey";
    export default {
        name: "message",
        data() {
            return {
                messageList: [],
                messageCache: {}
            }
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo',
            })
        },
        filters: {
            formatTime(value) {
                return `${new Date(value).getHours()}:${new Date(value).getMinutes()}`;
            }
        },
        methods: {
            toDetail(id, name) {
                this.$router.push({
                    name: 'messageDetail',
                    query: {
                        name,
                        id
                    }
                });
            },
            // 监听消息记录
            listenMessage() {
                this.IO = io.connect('http://35.241.111.247:3000');
                // this.IO = io.connect('http://127.0.0.1:3000');
                this.IO.on(this.userInfo.user_uid, (data) => {
                    this.setStorage(data);
                    let current = this.messageList.find(item => item.id === data.id);
                    if (current) {
                        const index = this.messageList.indexOf(current);
                        this.messageList.splice(index, 1);
                        this.messageList.unshift(data);
                    } else {
                        this.messageList.unshift(data);
                    }
                });
            },
            // 存储聊天记录
            setStorage(data) {
                const id = data.id;
                if (!this.messageCache[id]) this.messageCache[id] = [];
                this.messageCache[id].push(data);
                localStorage.setItem('message', JSON.stringify(this.messageCache));
            },
            // 从local获取聊天记录
            async getStorage() {
                const cache = JSON.parse(localStorage.getItem('message'));
                const arr = [];
                for (const key in cache) {
                    const item = cache[key][cache[key].length - 1];
                    // const i = this.friendList.find(v => v.user_uid == key);
                    const res = await this.$http.get('/api/searchFriendById?id=' + key);
                    const i = res.data.data[0] ? res.data.data[0] : {};
                    item.id = i.user_uid;
                    item.name = i.user_name;
                    item.portrait = i.portrait;
                    arr.push(item)
                }
                sortArrayByKey(arr, 'time');
                this.messageList = arr;
            }
        },
        created() {
            this.messageCache = JSON.parse(localStorage.getItem('message')) || {};
            this.listenMessage();
            this.getStorage();
        }
    }
</script>

<style lang="less">
    .top-fix {
        width: 100vw;
        position: fixed;
    }
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
