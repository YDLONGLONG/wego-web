<template>
  <div>
    <el-form :model="userLogin" status-icon :rules="rules" ref="userLogin">
      <el-form-item prop="email">
        <el-input v-model="userLogin.email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="userLogin.password" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:49%;" type="primary" @click="login">登录</el-button>
        <!-- 注册 -->
        <router-link to="/login/signIn" replace>
          <el-button style="width:49%;margin-left:3px;">注册</el-button>
        </router-link>
      </el-form-item>
      <router-link to="/login/reSet" style="color: #00A1D6;float:left" replace>忘记密码？</router-link>
      <router-link replace to="/login/loginCode" style="color: #00A1D6;float: right">验证码登录</router-link>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { login } from '../../../api/user'
export default {
  data() {
    return {
      userLogin: {
        email: '',
        password: ''
      },
      hh:'hhaa',
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    ...mapActions(['setUserId','setUserName']),
    login() {
        this.$refs.userLogin.validate(async valid => {
        if (valid) {
          let result = await login({account:this.userLogin.email,password:this.userLogin.password})
          console.log(result)
          if (result.errCode === 0) {
            this.$message.success(result.message)
            this.setUserId(result.data[0].userid)
            this.setUserName(result.data[0].username)
            await this.$router.go(-1)
          } else {
            this.$message.error(result.message)
          }
        } else {
          this.$message.error('请修改错误项')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 28rem;
}
</style>
