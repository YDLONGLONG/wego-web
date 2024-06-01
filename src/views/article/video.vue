<template>
  <div>
    <div class="card" v-for="(trend,index) in trendList" :key="index" :style="{height:imgsList[index].length==0?'100%':'350px'}">
      <router-link :to="`/master/${trend.trendid}`">
        <h3 v-html="trend.title.replace(keyWord,`<span style='color:red'>${keyWord}</span>`)"></h3>
        <!-- <h3>{{trend.title}}</h3> -->
        <p v-html="trend.content.replace(/<[^>]+>/g,'').replace(keyWord,`<span style='color:red'>${keyWord}</span>`)"></p>
        <!-- <p>{{trend.content.replace(/<[^>]+>/g,"")}}</p> -->
        </router-link>
        <img v-for="(item,index) in imgsList[index]" :src="item" alt="" style="width: 100px;height: 100px;margin-left: 1rem;">
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
  import { searchTrend } from "../../api/trend";
  export default {
      data() {
      return {
        trendList:[],
        imgsList:[],
        keyWord:''
      }
    },
    created(){
      
    },
    mounted(){
      let { keyWord } = this.$route.query;
      if(keyWord)
      this.keyWord = keyWord;
      this.searchTrend(keyWord)
      this.$bus.$on('globalEvent',async (val)=>{
        let result = await searchTrend({keyWord:keyWord,nowpage:val})
        if(result.data.length>0){
          result.data.forEach(item=>{
            this.trendList.push(item)
            this.getImgs(item)
          })
        }
      })
    },
    watch:{
      '$route.query.keyWord': function(){
        this.keyWord = this.$route.query.keyWord;
        this.searchTrend(this.$route.query.keyWord)
      }
    },
    methods: {
      async searchTrend(keyWord){
        let res = await searchTrend({keyWord:keyWord,nowpage:0});
          if(res.data.length>0){
            this.trendList = res.data;
            this.trendList.forEach(item=>{
            this.getImgs(item)
          })
        }
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