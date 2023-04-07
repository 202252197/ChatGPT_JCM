<template>
    <div class="setting">
      <el-container>
        <el-row :gutter="24">
            <el-col :span="6">
            
            </el-col>
            <el-col :span="18">
                
            </el-col>
        </el-row>
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
  