<template>
  <div id="app"  @mousedown="windowMove(true)" @mouseup="windowMove(false)">
    <Home></Home>
  </div>
</template>

<script>
import "@/assets/font/font.css"
import Home from './view/home.vue'
import { isPc } from '@/util/util.js'

export default {
  name: 'App',
  components: {
    Home
  }, 
  methods:{
    windowMove(canMove){
      if (isPc()){
        import("electron").then(({ ipcRenderer }) => {
          ipcRenderer.send('window-move-open', canMove ?? false);
        });
      }
    },
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
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>