<template>
  <div class="banxin">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
  <el-form-item label="账号" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">立即登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {LoginApi} from '~/request/api'
export default {
 data() {
  return {
    loginForm: {
      username: '',
      password: '',
      avatar:''
    },
    rules: {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请填写密码', trigger: 'blur' },
        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
      ]
    }
  };
},
methods: {
  login() {
    this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await LoginApi(this.loginForm);
          if (res.errCode === 0) {
            localStorage.setItem('username',res.data.username);
            localStorage.setItem('wego-token',res.data['wego-token']);
            localStorage.setItem('avatar',res.data.avatar);
            this.$message.success(res.message)
            this.$router.push("/home")
            setTimeout(()=>{
              location.reload();
            },1000)
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error('请修改错误项')
          return false
        }
      })
  },
}
}
</script>

<style>

</style>