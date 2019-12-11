<template>
  <div class="home">
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item replace icon="chat-o" to="/message">消息</van-tabbar-item>
      <van-tabbar-item replace icon="friends-o" to="/friends">好友</van-tabbar-item>
      <van-tabbar-item replace icon="setting-o" to="/setting">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'home',
  mounted() {
    this.$router.push({
      name: 'message'
    })
  }
}
</script>

<style>
  .home {
    width: 100vw;
    height: 100vh;
    background-color: #f7f8fa;
  }
</style>
