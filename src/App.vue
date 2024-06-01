<template>
  <div>
    <div v-if="$route.meta.keepAlive">
      <Header />
      <router-view></router-view>
    </div>
    <div v-if="!$route.meta.keepAlive">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
export default {
  components: {
    Header
  }
}
</script>

<style></style>
