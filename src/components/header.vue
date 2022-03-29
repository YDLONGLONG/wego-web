<template>
  <div>
    <el-menu router>
    <div class="header">
      <div class="header1">
        <router-link to="/home/article" class="col1">主站</router-link>
        <router-link to="/vip" class="col1">会员</router-link>
        <router-link to="/find" class="col1">发现</router-link>
        <router-link to="/answer" class="col1">等你来答</router-link>
      </div>
      <div class="header2">
        <div><el-input placeholder="请输入内容" class="input-with-select" type="mini">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input></div>
        <div><el-button type="primary" size="medium" round>提问</el-button></div>
      </div>
      <div class="header3">
        <router-link to="/notice" class="col1"><i class="el-icon-message-solid"></i></router-link>
        <router-link to="/message" class="col1"><i class="el-icon-chat-line-round"></i></router-link>
        <router-link to="/login" class="col1">登录</router-link>
      </div>
    </div>
  </el-menu>
  </div>
</template>

<script>
export default {
  name:'Header',
  data(){
    return{

    }
  },
  
}
</script>

<style lang="scss" scoped>
.el-menu {
  font-size: 16px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  .header{
    display: grid;
    grid-template-columns: 35% 30% 35%;
    .header1{
      margin-left: 40rem;
      .router-link-active {
        border-bottom: #00a1d6 solid 2px;
      }
      .col1{
        color: rgb(133,144,166);
      }
    }
    .header2{
      display: grid;
      grid-template-columns: 90% 10%;
      .input-with-select{
        width: 400px;
      }
    }
    .header3{
      margin-right: 40rem;
    }
    .col1{
      margin-right: 2rem;
    }
  }
}
</style>
