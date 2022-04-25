<template>
<div>
  <div class="card" v-for="(trend,index) in trendList" :key="index">
      <h3>{{trend.title}}</h3>
      <p v-html="trend.content"></p>
      <div class="btn">
        <el-button icon="el-icon-caret-top" circle></el-button>
        <el-button icon="el-icon-caret-bottom" circle></el-button>
        <i class="el-icon-chat-round">7条评论</i>
        <i class="el-icon-s-promotion">分享</i>
        <i class="el-icon-star-off">收藏</i>
        <i class="el-icon-bell">举报</i>
      </div>
  </div>
  <div class="bottom">到底啦</div>
</div>
</template>

<script>
import { getTrendPage } from '../../api/trend'
export default {
    data() {
    return {
      nowpage:0,
      trendList:[]
    }
  },
  created(){
    this.getTrend();
  },
  mounted(){
    this.$bus.$on('globalEvent',async (val)=>{
        let result = await getTrendPage(val)
        if(result.errCode==0){
          result.data.forEach(item=>{
          this.trendList.push(item)
          })
        }
      })
  },
  methods: {
    async getTrend() {
      let result = await getTrendPage(this.nowpage)
      this.trendList = result.data;
      console.log(this.trendList)
    },
  },
}
</script>

<style lang="scss" scoped>
.card{
  margin-top: 1rem;
  background-color: #fff;
  width: 700px;
  height: 220px;
  h3{
    font-weight: 800;
    margin-left: 1rem;
  }
  p{
    height: 80px;
    line-height: 20px;
    overflow: hidden;
    margin: 0 1rem 1rem 1rem;
  }
  .btn{
    display: flex;
    justify-content: flex-start;
    height: 40px;
    .el-button{
      margin-left: 1rem;
    }
    i{
      line-height: 40px;
      margin: 0 2rem;
      color: rgb(133,144,166);
    }
  }
}
.bottom{
  text-align: center;
}
</style>