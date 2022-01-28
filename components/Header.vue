<template>
  <header>
    <div class="banxin content">
      <img :src="logo" height="50" />
      <el-menu
      :default-active="active"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
    <el-menu-item :index="item.link" v-for="item in navArr" :key="item.id" :disabled="item.disable===1">{{item.title}}</el-menu-item>
    <el-menu-item>
        <nuxt-link :to="`/login`" class="dl" v-if="!username"><el-button size="medium" type="danger">登录</el-button></nuxt-link>
        <div v-else>
        <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :src="avatar" :size="48"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-menu-item>
    </el-menu>
    </div>
  </header>
</template>

<script>
import {NavApi} from '~/request/api'
const logo = require("~/static/images/logo.jpg");
export default {
  data() {
    return {
        logo:logo,
        navArr:[],
        avatar:'',
        username:''
    }
  },
  created(){
      NavApi().then(res=>{
          if(res.errCode===0){
              this.navArr = res.data;
          }
      })
      if(this.$route.path==="/"){
          this.$router.push("/home")
      }
  },
  mounted(){
      this.init();
  },
  computed:{
    active(){
      return this.$route.path
    }
  },
  methods:{
      handleSelect(){},
      async logout() {
        localStorage.removeItem("wego-token");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        this.$message.success("退出成功");
        this.$router.push("/home");
        setTimeout(()=>{
              location.reload();
            },1000)
    },
    async init() {
      this.username = localStorage.getItem('username');
      this.avatar = "/images/" + localStorage.getItem('avatar');
    }
  }
};
</script>

<style lang="less">
header {
  background: #545c64;
  .content {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>