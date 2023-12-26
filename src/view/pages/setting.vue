<template>
  <div class="setting">
    <el-container>
      <el-header>
        <transition name="el-zoom-in-top">
          <div v-show="show" class="transition-box">
            <h3>JUN CHEN MO</h3>
          </div>
        </transition>
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
          <div v-show="show" class="transition-box">
            <span>
              现已接入OpenAI的Models API、Completions API、Chat API、Audio API、Images API、Files API、Fine-tunes API后续会添加更多有意思的功能进去，希望大家给我的GitHub点个小小的星星，
              大家如果有什么好的想法可以在GitHub中提出来，觉得项目不错的朋友可以打赏一波，感谢支持。
            </span>
            <div>
              <a href="https://space.bilibili.com/326625155?spm_id_from=333.337.0.0">BliBili</a>---<a href="https://github.com/202252197/ChatGPT_JCM">GitHub</a>
            </div>
            <div>
              <h3>愿半生编码，如一生老友</h3>
            </div>
            <div>
              <img src="https://i.328888.xyz/2023/05/09/iQ8tvv.jpeg" width="300px" height="300px"/>
              <img src="https://i.328888.xyz/2023/05/09/iQNnf3.jpeg" width="300px" height="300px"/>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
};
</script>

<style>
  .transition-box {
    text-align: center;
    margin-top: 5%;
    color: #F2F6FC;
    font-size: 30px;
  }
  h1 {
    color: aliceblue;
    font-size: 80px;
  }
  a {
    text-decoration: none;
    color: #67C23A;
  }
</style>
