<template>
  <div>
    <el-menu router>
    <div class="header">
      <div class="header1">
        <router-link to="/home/article" class="col1">主站</router-link>
        <router-link to="/vip" class="col1">会员</router-link>
        <router-link to="/find" class="col1">发现</router-link>
        <router-link to="/master" class="col1">等你来答</router-link>
      </div>
      <div class="header2">
        <div><el-input placeholder="请输入内容" class="input-with-select" type="mini" v-model="keyWord">
          <el-button slot="append" icon="el-icon-search" @click="searchTrend"></el-button>
        </el-input></div>
        <div><el-button type="primary" size="medium" round>提问</el-button></div>
      </div>
      <div class="header3">
        <router-link to="/notice" class="col1"><i class="el-icon-message-solid"></i></router-link>
        <router-link to="/message" class="col1"><i class="el-icon-chat-line-round"></i></router-link>
      <div class="login">
        <div v-if="!userId">
          <router-link to="/login">登录</router-link>
        </div>
        <div v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <router-link :to="`/mine/${userId}`">
                <el-avatar :src="headUrl" icon="el-icon-user-solid" :size="48"></el-avatar>
                </router-link>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <span @click="logout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
      </div>
      </div>
    </div>
  </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { isLogin, logout, getUserAvatar } from "../api/user";
export default {
  name:'Header',
  data(){
    return{
      headUrl: "",
      keyWord: ""
    }
  },
  computed: {
    ...mapState(["userId"])
  },
  watch: {
    userId(newValue) {
      //登录获取头像
      if (newValue) {
        this.getUserAvatar();
      }
    },
  },
  created() {
    this.init();
    this.getUserAvatar();
  },
  methods:{
    ...mapActions(["setUserId"]),
    async logout() {
      let result = await logout();
      console.log(result)
      this.setUserId("");
      this.headUrl = "";
      this.$message.success(result.message);
      await this.$router.replace("/login");
    },
    //获取用户头像
    async getUserAvatar() {
      if (this.userId) {
        let result = await getUserAvatar(this.userId);
        this.headUrl = this.$apiServer + result.data[0].avatar;
        console.log(this.headUrl)
      }
    },
    //搜索
    async searchTrend() {
      if (this.keyWord) this.$router.push({path: "/home/video",query: {keyWord: this.keyWord}});
    },
    async init() {
      try {
        let result = await isLogin();
        if (result.errCode !== 0) {
          this.setUserId("");
        }
      } catch (e) {
        this.setUserId("");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  position: fixed;
  font-size: 16px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  width: 100%;
  .header{
    display: grid;
    grid-template-columns: 35% 30% 35%;
    .header1{
      margin-left: 35rem;
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
      .login{
        position: relative;
        left: 60px;
        bottom: 50px;
      }
    }
    .col1{
      margin-right: 2rem;
    }
  }
}
</style>
