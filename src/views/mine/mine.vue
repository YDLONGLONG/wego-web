<template>
  <div>
      <div class="bg"></div>
      <div class="main">
        <div class="mine">
            <el-form label-width="80px">
                <el-form-item label="头像">
                <el-upload
                name="file"
                :action="this.$apiServer+'/user/editUserImg'"
                :data="{userid:userId}"
                :show-file-list="false"
                :on-success="success"
                :before-upload="beforeUpload"
                accept=".jpg,.jpeg,.png"
                :disabled="this.$route.params.userid!=userId"
                >
                <el-avatar :size="64" :src="this.$apiServer+user.avatar" title="点击头像可上传"></el-avatar>
                </el-upload>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="user.username" :disabled="this.$route.params.userid!=userId"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="user.userinfo.age" :disabled="this.$route.params.userid!=userId"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="user.userinfo.sex" placeholder="请选择您的性别" :disabled="this.$route.params.userid!=userId">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                    </el-select>
                    {{user.userinfo.sex==0?'男':'女'}}
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="user.userinfo.address" :disabled="this.$route.params.userid!=userId"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="user.userinfo.birthday" style="width: 100%;" :disabled="this.$route.params.userid!=userId"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="user.userinfo.createtime" style="width: 100%;" disabled></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if="this.$route.params.userid==userId" @click="updateUserInfo">确定修改</el-button>
                </el-form-item>
                <el-form-item label="密码">
                    原密码<el-input v-model="oldpassword" type="password" :disabled="this.$route.params.userid!=userId"></el-input>
                    新密码<el-input v-model="newpassword" type="password" :disabled="this.$route.params.userid!=userId"></el-input>
                    <el-button type="primary" v-if="this.$route.params.userid==userId" style="margin-top:1rem;" @click="setPassword">确定修改</el-button>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="user.phone" :disabled="this.$route.params.userid!=userId"></el-input>
                    <el-button type="primary" v-if="this.$route.params.userid==userId" style="margin-top:1rem;" @click="bindPhone">确定修改</el-button>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="user.email" :disabled="this.$route.params.userid!=userId"></el-input>
                    <el-button type="primary" v-if="this.$route.params.userid==userId" style="margin-top:1rem;" @click="bindEmail">确定修改</el-button>
                </el-form-item>
                </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import { GetUser,updateUserInfo,setPassword,bindPhone,bindEmail} from '../../api/user'
import { mapState } from 'vuex'
export default {
    data(){
      return{
        user:{
          username:'',
          avatar:'',
          phone:'',
          email:'',
          userinfo:{
            age:'',
            sex:'',
            birthday:'',
            address:''
          }
        },
        headurl:'',
        oldpassword:'',
        newpassword:'',
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    async setPassword(){
        let result =  await setPassword({userid:this.userId,oldpassword:this.oldpassword,newpassword:this.newpassword});
        if(result.errCode==0){
            this.$message.success(result.message);
        }else{
            this.$message.error(result.message);
        }
      },
      async bindPhone(){
        let result =  await bindPhone({userid:this.userId,phone:this.user.phone});
        if(result.errCode==0){
            this.$message.success(result.message);
        }else{
            this.$message.error(result.message);
        }
      },
      async bindEmail(){
        let result =  await bindEmail({userid:this.userId,email:this.user.email});
        if(result.errCode==0){
            this.$message.success(result.message);
        }else{
            this.$message.error(result.message);
        }
      },
      async updateUserInfo(){
        let result =  await updateUserInfo({username:this.user.username,age:this.user.userinfo.age,sex:this.user.userinfo.sex,birthday:this.user.userinfo.birthday,address:this.user.userinfo.address,userid:this.userId});
        if(result.errCode==0){
            this.$message.success(result.message);
        }else{
            this.$message.error(result.message);
        }
      },
      beforeUpload(file) {
      const isType = file.type === ('image/jpeg' || 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isType) {
        this.$message.error('格式只能是jpg/jpeg/png格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB!')
        return false
      }
      return true
    },
    success(res) {
      if (res.errCode==0) {
        this.$message.success(message);
      }
    },
    async init(id) {
      let result = await GetUser(id)
      this.user = result.data[0];
      this.headurl = this.$apiServer+this.user.avatar;
      if (!this.userId) {
        this.$message.warning('请先登录')
        return await this.$router.push('/login')
      }
    }
  },
  created() {
    let {userid} = this.$route.params;
    this.init(userid)
  }
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
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    padding-top: 6rem;
    .mine{
        width: 1000px;
        height: 100%;
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 1rem;
        padding: 3rem;
    }
}
</style>