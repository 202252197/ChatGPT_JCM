<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="100px" v-show="asideStatus">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      asideStatus: true
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
   //监听窗口尺寸的变化
    handleResize() {
      if (window.innerWidth <= 1150) {
        this.asideStatus=false
      } else {
        this.asideStatus=true
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 90vw;
  height: 90vh;
  background-color: rgb(39, 42, 55);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
