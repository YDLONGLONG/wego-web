<template>
  <div>
    <div class="bg"></div>
    <div class="login">
        <div class="form">
        <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
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
.login {
  position: absolute;
  left: 37%;
  top: 20%;
  background: white;
  width: 45rem;
  height: 45rem;
  border-radius: 30px;
  .form {
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    }
}
</style>
