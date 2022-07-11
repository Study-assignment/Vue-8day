<template>
  <div style="padding-bottom: 48px">
    <van-nav-bar :title="$route.meta.title" />

    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">标签</van-tabbar-item>
      <van-tabbar-item icon="search" to="/layout/search">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
