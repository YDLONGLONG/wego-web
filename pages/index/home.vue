<template>
  <div class="banxin">
      <div class="banner">
      <el-carousel height="400px">
      <el-carousel-item v-for="item in banner" :key="item.index">
        <img :src="'http://localhost:4001/images/web/'+item.img" alt="" width="100%" height="150%">
      </el-carousel-item>
    </el-carousel>
    </div>
  </div>
</template>

<script>
import {BannerApi} from '~/request/api'
export default {
  data(){
    return{
      banner:[]
    }
  },
  async asyncData(){
    let res = await BannerApi();
    return{
        banner:res.data
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
    margin: 10px;
}
</style>

