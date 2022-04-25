<template>
  <div>
    <el-form :model="user" :rules="rules" status-icon ref="loginCode">
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-col :span="14">
          <el-input v-model.number="user.code" placeholder="输入验证码"></el-input>
        </el-col>
        <el-col :span="1" :offset="2">
          <el-button type="primary" @click="getCode">点击获取</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:30rem" @click="codelogin">提交</el-button>
      </el-form-item>
      <router-link replace to="/login/loginForm" style="color: #00A1D6;display: block;text-align: right">
        密码登录
      </router-link>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { sendEmail, codelogin } from '../../../api/user'
export default {
  data() {
    return {
      user: {
        email: '',
        code:''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { type: 'number', message: '请输入正确的6位验证码', trigger: 'blur' }
        ]
      },
      isDisabled: false
    }
  },
  methods: {
    ...mapActions(['setUserId']),
    async codelogin() {
      this.$refs.loginCode.validate(async valid => {
        if (valid) {
          let result = await codelogin({
            code: this.user.code,
            account: this.user.email
          })
          console.log(result)
          if (!result.errCode) {
            this.$message.success(result.message)
            this.setUserId(result.data[0].userid)
            await this.$router.go(-1)
          } else this.$message.error(result.message)
        } else {
          this.$message.error('请修改错误项')
          return false
        }
      })
    },
    async getCode() {
      let result = await sendEmail(this.user.email)
      if (!result.errCode) {
        this.$message.success(result.message)
      } else this.$message.error(result.message)
      let count = 0
      this.isDisabled = true
      let tag = setInterval(() => {
        if (++count >= 60) {
          clearInterval(tag)
          this.isDisabled = false
          return (this.btnText = '点击获取')
        }
        this.btnText = `${60 - count}秒后获取`
      }, 1000)
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.el-form {
  width: 30rem;
}
</style>
