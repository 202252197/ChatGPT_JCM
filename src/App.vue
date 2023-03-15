<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import "@/assets/font/fonts.css"
import Home from './view/home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
@import url(./assets/font/iconfont.css);
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-size: 25px;
  vertical-align: middle;
  color: rgb(117,120,137);
  transition: .3s;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  padding: 0;
  margin: 0;
  font-family: 'SSFY';
}


#app {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/img/bj.png") no-repeat;
  background-size:cover;
  position:absolute;
      
}
</style>