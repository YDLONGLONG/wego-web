<template>
<div>
  <div class="card" v-for="(trend,index) in trendList" :key="index" :style="{height:imgsList[index].length==0?'100%':'350px'}">
    <router-link :to="`/master/${trend.trendid}`">
      <h3>{{trend.title}}</h3>
      <p>{{trend.content.replace(/<[^>]+>/g,"")}}</p>
      <!-- <p v-html="trend.content"></p> -->
      </router-link>
      <img v-for="(item,index) in imgsList[index]" :src="item" alt="" style="width: 100px;height: 100px;margin-left: 1rem;">
      <div class="btn">
        <el-button icon="el-icon-caret-top" circle></el-button>
        <el-button icon="el-icon-caret-bottom" circle></el-button>
        <i class="el-icon-chat-round">评论</i>
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
      trendList:[],
      imgsList:[]
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
          this.getImgs(item)
          })
        }
      })
  },
  methods: {
    async getTrend() {
      let result = await getTrendPage(this.nowpage)
      this.trendList = result.data;
      //首页显示每篇文章的三张图片，以对象的形式存储在imgsList中
      this.trendList.forEach(item=>{
        this.getImgs(item)
      })
    },
    getImgs(item){
      let imgs = item.content.match(/<img.*?(?:>|\/>)/gi);
        let src = [];
        if(imgs){
          //超过三张图片，只显示前三张
          if(imgs.length>3){
            imgs = imgs.slice(0,3)
          }
          imgs.forEach(item=>{
            let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
            let srcResult = item.match(srcReg);
            src.push(srcResult[1])
          })
        }
        this.imgsList.push(src)
    }
  },
}
</script>

<style lang="scss" scoped>
.card{
  margin-top: 1rem;
  background-color: #fff;
  width: 700px;
  img:active {
    transform: scale(5);
    transition: all 0.5s;
  }
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