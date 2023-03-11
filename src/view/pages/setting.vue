<template>
  <div class="setting">
    <el-container>
      <el-header>
        <transition name="el-zoom-in-top">
            <div style="text-align: center"  v-show="show" class="transition-box">
              <h1 style="color: aliceblue; font-size: 80px;">L V S H I H A O</h1>
            </div>
        </transition>
       
      </el-header>
      <el-main>
        <transition name="el-zoom-in-top">
            <div style="text-align: center;margin-top: 5%;"  v-show="show" class="transition-box" >
              <span style="color: #F2F6FC;">
                很感谢大家对我的支持，现已接入OpenAI的Models API、Completions API、Chat API后续会添加更多有意思的功能进去，希望大家给我的GitHub点个小小的星星，
                大家如果有什么好的想法可以在GitHub中提出来，我们一起来完善这个页面。
              </span>
              <div style="font-size: 97px;margin-top: 5%;">
                <a href="" style="text-decoration: none;color: #67C23A;">BliBili</a>---<a href="" style="text-decoration: none;color: #67C23A;">GitHub</a>
              </div>
            </div>
        </transition>
      </el-main>
      <el-footer style="margin-top: 18%;">ssssssssssssssssssssssssssssss</el-footer>
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
    this.show=true
  }
}
</script>

<style>

</style>