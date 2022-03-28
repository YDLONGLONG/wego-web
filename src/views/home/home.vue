<template>
  <div class="main">
    <div class="left">
      <router-link to="/home/attention" class="col1">关注</router-link>
      <router-link to="/home/article" class="col1">推荐</router-link>
      <router-link to="/home/hot" class="col1">热榜</router-link>
      <router-link to="/home/video" class="col1">视频</router-link>
      <div><router-view></router-view></div>
    </div>
    <div class="right">
      123
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main{
  display: grid;
  grid-template-columns: 70% 30%;
  width: 1000px;
  margin-left: 22%;
  .col1{
    margin: 0 1rem;
  }
  .left{
  font-size: 16px;
  height: 64px;
  line-height: 60px;
  border: 1px solid black;
    .router-link-active {
      border-bottom: #00a1d6 solid 2px;
    }
  }
  .right{
    border: 1px solid black;
  }
}
</style>