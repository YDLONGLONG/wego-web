<template>
  <div>
    <el-menu router>
    <div class="header">
      <div class="header1">
        <router-link to="/home/article" class="col1">主站</router-link>
        <!-- <router-link to="/vip" class="col1">游戏1</router-link>
        <router-link to="/vip2" class="col1">游戏2</router-link>
        <router-link to="/vip3" class="col1">游戏3</router-link>
        <router-link to="/vip4" class="col1">游戏4</router-link> -->
        <router-link to="/find" class="col1">发现</router-link>
        <router-link to="/master" class="col1">等你来答</router-link>
      </div>
      <div class="header2">
        <div>
          <el-dropdown trigger="hover" placement="top-start">
            <span class="el-dropdown-link">
              <el-input placeholder="请输入内容" class="input-with-select" type="mini" v-model="keyWord" @input="searchTips">
              <el-button slot="append" icon="el-icon-search" @click="searchTrend"></el-button>
              </el-input>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-card class="box-card" v-if="searchHistory.length>0 && !keyWord">
                <div slot="header" class="clearfix">
                  <span>历史搜索</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllHistory">清空全部</el-button>
                </div>
                <el-tag
                  v-for="tag,index in searchHistory"
                  :key="index"
                  closable
                  type="info"
                  style="margin: 1rem;cursor:pointer;"
                  @close="clearHistory(tag)"
                  @click="searchTip(tag)">
                  {{tag}}
                </el-tag>
              </el-card>
              <el-card class="box-card" v-if="hotTip.length>0 && !keyWord">
                <div slot="header" class="clearfix">
                  <span>热门搜索</span>
                </div>
                <div v-for="o,i in hotTip" :key="i">
                  <el-dropdown-item style="flex: 1;"><div @click="searchTip(o.tipName)">{{ i+1 }} {{ o.tipName }}</div></el-dropdown-item>
                </div>
              </el-card>
              <el-card class="box-card"  v-if="searchTipList.length>0 && keyWord">
                <div v-for="o,i in searchTipList" :key="i">
                  <el-dropdown-item><div @click="searchTip(o.title)">{{ i+1 }} {{ o.title }}</div></el-dropdown-item>
                </div>
              </el-card>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
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
import { searchTips,getHotTip,addHotTip } from "../api/trend";
import _ from 'lodash'
export default {
  name:'Header',
  data(){
    return{
      headUrl: "",
      keyWord: "",
      searchTipList: [],
      searchHistory: [],
      hotTip:[]
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
  mounted() {
    this.getHistory();
    this.getHotTip()
  },
  methods:{
    ...mapActions(["setUserId"]),
    async logout() {
      let result = await logout();
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
      }
    },
    //搜索按钮跳转
    async searchTrend() {
      if (this.keyWord) this.$router.push({path: "/home/video",query: {keyWord: this.keyWord}});
      await addHotTip(this.keyWord)
      this.addHistory();
      this.getHistory();
    },
    //搜索历史跳转
    async searchTip(keyWord) {
      if (keyWord) this.$router.push({path: "/home/video",query: {keyWord: keyWord}});
      await addHotTip(keyWord)
      this.addHistory(keyWord);
      this.getHistory();
    },
    addHistory(keyWord) {
      keyWord == null ? this.searchHistory.unshift(this.keyWord) : this.searchHistory.unshift(keyWord);
      let historyArr0 = new Set(this.searchHistory);
      let historyArr = Array.from(historyArr0);
      if(historyArr.length>5)historyArr.pop()
      localStorage.setItem('searchList', JSON.stringify(historyArr))
    },
    getHistory(){
      if(!localStorage.getItem('searchList')){
        localStorage.getItem('searchList', '[]')
      }else{
        this.searchHistory = JSON.parse( localStorage.getItem('searchList') )
      }
    },
    clearAllHistory(){
      if(confirm('确定要清空历史记录吗？')){
        localStorage.removeItem('searchList');
        this.searchHistory = [];
        this.$forceUpdate();
      }
    },
    clearHistory(tag){
      this.searchHistory = this.searchHistory.filter(item => item != tag)
      localStorage.setItem('searchList', JSON.stringify(this.searchHistory))
    },
    async getHotTip(){
      let result = await getHotTip();
      this.hotTip = result.data;
    },
    //搜索提示
    searchTips:_.debounce(async function(){
      if (this.keyWord==''){
        this.searchTipList = [];
        return;
      }
      let result = await searchTips(this.keyWord);
      this.searchTipList = result.data;
    },1000),
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 400px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-dropdown-menu{
  margin: 0;
  padding: 0;
}
</style>
