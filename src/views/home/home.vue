<template>
<div class="show" ref="tree">
  <div class="bg"></div>
  <div class="main">
    <div class="left">
      <el-menu router>
      <router-link to="/home/attention" class="col1">关注</router-link>
      <router-link to="/home/article" class="col1">推荐</router-link>
      <router-link to="/home/hot" class="col1">热榜</router-link>
      <router-link to="/home/video" class="col1">搜索</router-link>
      <div style="background-color: rgb(246,246,246);padding-top: 0.1rem;"><router-view></router-view></div>
    </el-menu>
    </div>
    <div class="right">
      <div class="create">
        <i class="el-icon-user-solid">创作中心</i>
        <span>草稿箱(0)</span>
      </div>
      <div class="btn">
        <el-button icon="el-icon-tickets" type="primary" circle plain></el-button>
        <el-button icon="el-icon-video-camera" type="warning" circle plain></el-button>
        <el-button icon="el-icon-edit-outline" type="danger" circle plain></el-button>
        <el-button icon="el-icon-coordinate" type="success" circle plain></el-button>
      </div>
      <div class="txt">
        <span>答问题</span>
        <span>发视频</span>
        <span>写文章</span>
        <span>写想法</span>
      </div>
      <div class="tip">
        <div class="left1">
          <h4>开启你的创作之旅</h4>
          <p>发布首篇内容，开通创作中心 快来成为创作者吧～</p>
        </div>
        <div class="right1">
          <img src="../../assets/1.png">
        </div>
      </div>
      <router-link to="/write">
      <div class="submit">
        <h3>＋开始创作</h3>
      </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      page:0,
      email:'1772653245@qq.com'
    }
  },
  mounted() {
    this.$refs.tree.addEventListener('scroll',async e => {
      if(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight===0){
        this.page +=1
        this.$bus.$emit('globalEvent',this.page)
      }
    }, false)
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.show{
  height: 100vh;
  overflow-x: hidden;
}
.bg{
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(246,246,246);
}
.main{
  display: grid;
  grid-template-columns: 70% 30%;
  width: 1000px;
  margin-left: 22%;
  .col1{
    margin: 0 1rem;
  }
  .left{
    background-color: #fff;
    margin-top: 6rem;
    font-size: 16px;
    height: 64px;
    line-height: 60px;
    .router-link-active {
      color: #00a1d6;
    }
  }
  .right{
    width: 300px;
    height: 320px;
    background-color: #fff;
    margin: 6rem 0 0 1rem;
    .create{
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      font-size: 16px;
      span{
        color: rgb(133,144,166);
        font-size: 14px;
      }
    }
    .btn{
      margin-left: 2rem;
      .el-button{
        margin: 0 1rem;
      }
    }
    .txt{
      margin-top: 1rem;
      span{
        margin-left: 2.2rem;
      } 
    }
    .tip{
      display: grid;
      grid-template-columns: 70% 30%;
      width: 260px;
      height: 100px;
      background-color: rgb(249,249,250);
      margin:1rem 0 0 20px;
      .left1{
        width: 160px;
        padding: 1rem;
        h4{
          font-size: 16px;
        }
        p{
          color: rgb(133,144,166);
        } 
      }
      .right1{
        img{
          margin-top: 2rem;
        }
      }
    }
    .submit{
        width: 260px;
        height: 40px;
        border: solid 1px rgb(127,178,255);
        border-radius: 3px;
        margin: 2rem 0 0 2rem;
        h3{
          text-align: center;
          line-height:40px;
          color: rgb(0,102,255);
        }
      }
  }
}
</style>