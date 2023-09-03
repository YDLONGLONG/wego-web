<template>
  <div>
      <div class="bg"></div>
      <div class="main">
        <div class="left">
            <div class="title">
                <div class="title-left">
                    <el-avatar :size="64" :src="headurl"></el-avatar>
                    <router-link :to="`/mine/${user.userid}`"><span class="span">{{user.username}}</span></router-link>
                    <span>{{trend.createdate | fullDateFormat}}</span>
                    </div>
                <div>
                    管理
                </div>
            </div>
            <div class="left-main">
                <div class="left-title">{{trend.title}}</div>
                <div class="left-article" v-html="trend.content"></div>
            </div>
            <div class="comment">
                <!--     写评论   -->
                <el-row type="flex" align="middle" class="textarea">
                    <el-col :span="1">
                    </el-col>
                    <el-col :span="18">
                    <el-input type="textarea" v-model="content" resize="none" :autosize="{ minRows: 8, maxRows: 8 }" placeholder="在这里写点什么吧！"></el-input>
                    </el-col>
                    <el-col :span="4" style="padding-left:2rem">
                    <el-button type="primary" v-if="userId" @click="sendComment">发表评论</el-button>
                    </el-col>
                </el-row>
                <!--      一条评论    -->
                <el-row class="readcomment" v-for="(comment_item,index) in comment" :key="comment_item.commentid">
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="22" class="item" style="border-top: 1px solid #E5E9EF;padding-top: 1rem;margin-top: 1rem">
                    <router-link :to="`/mine/${comment_item[0].commentator}`">
                        <b>{{comment_item[0].username}}</b>
                    </router-link>
                    <div>{{comment_item[0].content}}</div>
                    <p>
                        <span>{{comment_item[0].createdate | fullDateFormat}}</span>
                        <span>
                        <span class="replySpan" @click="deleteComment(comment_item[0].commentid)" v-if="comment_item[0].commentator==userName">删除</span>
                        </span>
                    </p>
                    <!--          一条回复    -->
                    <el-row v-for="item in comment_item[0].reply" :key="item._id" style="margin: 0;">
                        <el-col :span="1">
                        </el-col>
                        <el-col :span="23">
                            <b>{{ item.username }}</b>
                        <span style="font-size: 1.2rem;margin: 0 0.4rem">回复</span>
                            <b>{{ item.commentator }}</b>
                        <span style="margin-left: 1rem">{{ item.reply_content }}</span>
                        <p>
                            
                        </p>
                        </el-col>
                    </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <div class="title-header">
                    <el-avatar :size="64" :src="headurl" shape="square"></el-avatar>
                    <router-link :to="`/mine/${user.userid}`"><span>{{user.username}}</span></router-link>
                </div>
                <div class="title-footer">
                    <span>主题<div>123</div></span>
                    <span>点赞<div>123</div></span>
                    <span>关注<div>123</div></span>
                    <span>粉丝<div>123</div></span>
                </div>
            </div>
        </div>
  </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getTrendInfo, getComment, sendComment, deleteComment, getAllCR } from '../../api/trend'
import { GetUser, getUserAvatar } from '../../api/user'
export default {
    data(){
      return{
          trend:{},
          user:{},
          content:'',
          headurl:'',
          comment:[],
          commentator:[],
          reply:[],
          replyer:[]
    }
  },
  computed: {
    ...mapState(["userId", "userName"])
  },
  created(){
      this.init();
  },
  methods: {
    async sendComment(){
        //判断输入是否为空
        if(this.content==''){
            this.$message.error('评论不能为空')
            return;
        }
      let {trendid} = this.$route.params;
      let result = await sendComment({trendid:trendid,commentator:this.userName,content:this.content})
      if(result.errCode==0){
        this.$message.success(result.message)
        setTimeout(() => {
            location.reload();
        }, 2000);
      }else{
        this.$message.error(result.message)
      }
    },
    async deleteComment(commentid){
        if(confirm("确定删除吗")){
            let result = await deleteComment(commentid)
            if(result.errCode==0){
                this.$message.success(result.message)
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }else{
                this.$message.error(result.message)
            }
        }
    },
    async init() {
      let {trendid} = this.$route.params;
      let result = await getTrendInfo(trendid)
      this.trend = result.data[0];
      let result0 = await getUserAvatar(this.trend.userid)
      this.headurl = this.$apiServer+result0.data[0].avatar;
      let result1 = await GetUser(this.trend.userid)
      this.user = result1.data[0];
      let result2 = await getComment(this.trend.trendid)
      for(let i=0;i<=result2.data.length;i++){
        if(result2.data[i]==undefined){
          break;
        }
        let result3 = await getAllCR(result2.data[i].commentid)
        this.comment.push(result3.data)
      }
      //缩放图片
        // let imgs = document.querySelectorAll('.left-article img')
        // for(let i=0;i<imgs.length;i++){
        //     imgs[i].style.width = '100%'
        // }
        this.trend.content = this.trend.content.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
    },
  },
}
</script>

<style lang="scss" scoped>
    .bg{
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(246,246,246);
    }
    .main{
        margin-bottom: 3rem;
        display: grid;
        grid-template-columns: 70% 30%;
        width: 1000px;
        margin-left: 22%;
        .left{
            background-color: #fff;
            margin-top: 6rem;
            font-size: 16px;
            // height: 64px;
            line-height: 60px;
            .title{
                display: flex;
                justify-content: space-between;
                padding: 1rem;
                height: 100px;
                border-bottom: 10px solid rgb(246,246,246);
                .title-left{
                    height: 80px;
                    line-height: 80px;
                    img{
                    border-radius: 3rem;
                    }
                    .span{
                        padding-left: 3rem;
                        font-size: 24px;
                        position: relative;
                        bottom: 15px;
                    }
                    span:nth-child(2){
                        padding-left: 3rem;
                        font-size: 24px;
                        position: relative;
                        bottom: 15px;
                    }
                    span:nth-child(3){
                        padding-left: 3rem;
                        font-size: 16px;
                        position: relative;
                        bottom: 15px;
                    }
                } 
            }
            .left-main{
                .left-title{
                    font-size: 24px;
                    padding-left: 1rem;
                }
                .left-article{
                    padding: 1rem;
                    line-height: 200%;
                    overflow: auto;
                }
            }
            .comment{
                border-top: 10px solid rgb(246,246,246);
                .textarea{
                    margin: 3rem 0 3rem 0;
                }
                .readcomment{
                    margin: 1rem;
                    .item {
                        b {
                        color: #6d757a;
                        font-size: 1.2rem;
                        &:hover {
                            color: #00a1d6;
                        }
                        }
                        div {
                        margin: 0 0 0.5rem;
                        line-height: 200%;
                        }
                        p {
                        margin: 0.8rem 0;
                        color: #99a2aa;
                        font-size: 1.2rem;
                        }
                        .replySpan {
                        margin-left: 1.5rem;
                        cursor: pointer;
                        padding: 0.2rem;
                        border-radius: 4px;
                        &:hover {
                            color: #00a1d6;
                            background-color: #e5e9ef;
                        }
                        }
                        .toggle {
                        color: #6d757a;
                        }
                    }
                }
            }
        }
        .right{
            background: greenyellow;
            width: 300px;
            height: 200px;
            background-color: #fff;
            margin: 6rem 0 0 1rem;
            .title{
                padding: 2rem;
                height: 100px;
                .title-header{
                    .el-avatar{
                        position: relative;
                        top: 1px;
                        width: 100%;
                        height: 100%;
                    }
                    span{
                        margin-left: 1rem;
                        font-size: 24px;
                        position: relative;
                        bottom: 20px;
                    }
                }
                .title-footer{
                    display: flex;
                    justify-content: space-around;
                    padding-top: 3rem;
                    span{
                        font-size: 18px;
                        div{
                            padding-top: 1rem;
                            font-size: 16px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    
</style>