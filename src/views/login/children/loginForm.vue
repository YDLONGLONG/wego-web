<template>
  <div>
    <el-form :model="user" status-icon :rules="rules" ref="loginForm">
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:30rem;margin-bottom:1rem;" type="primary" @click="login">登录</el-button>
        <router-link to="/login/signIn" replace>
          <el-button style="width:30rem">注册</el-button>
        </router-link>
      </el-form-item>
      <router-link to="/login/reSet" style="color: #00A1D6;float:left" replace>忘记密码？</router-link>
      <router-link replace to="/login/loginCode" style="color: #00A1D6;float: right">验证码登录</router-link>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
        user: {
        email: '',
        password: ''
      },
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
    ...mapActions(['setUserId']),
    login() {
        this.$refs.userLogin.validate(async valid => {
            if (valid) {
                let result = await login(this.userLogin)
                if (result.err === 0) {
                this.$message.success(result.msg)
                this.setUserId(result.data._id)
                await this.$router.go(-1)
                } else {
                this.$message.error(result.msg)
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
  width: 30rem;
}
</style>
