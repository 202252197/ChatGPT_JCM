<template>
  <div class="chatHome">
    <div class="chatLeft" style="width:31%">
      <div class="title">
        <h1>君尘陌AI聊天</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">模型列表</span>
        <div class="s-wrapper">
          <div
            class="personList"
            v-for="personInfo in personList"
            :key="personInfo.id"
            @click="clickPerson(personInfo)"
          >
            <PersonCard
              :personInfo="personInfo"
              :pcCurrent="pcCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow
          :frinedInfo="chatWindowInfo"
          :settingInfo="SettingInfo"
          @personCardSort="personCardSort"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <div class="chatLeft">
     
        <el-card shadow="hover" id="jianbian" style="line-height: 120%;">
            总余额：${{ this.moneryInfo.totalGranted | numFilterReservedTwo }}<br/>
            可用余额：${{ this.moneryInfo.totalAvailable | numFilterReservedSix }}<br/>
            消耗余额：${{ moneryInfo.totalUsed | numFilterReservedSix }}<br/>
        </el-card>
     
      <div class="online-person">
        <span class="setting" @click="SettingStatus=0" :class="{ active: SettingStatus === 0 }">对话设置</span>
        <span class="setting" @click="SettingStatus=1" :class="{ active: SettingStatus === 1 }">图片设置</span>
        <div class="s-wrapper">
          <div >
            <input class="inputs" v-model="SettingInfo.KeyMsg" placeholder="请输入OpenAI KEY" style="width: 100%; margin-left: 0px;margin-right: 0px;"/>
          </div>
            <!--对话设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==0">
                <div class="block">
                  <span class="demonstration" style="">Max_tokens</span>
                  <el-slider class="astrict" v-model="SettingInfo.MaxTokens" :step="1" :min="0" :max="2048"></el-slider>
                </div>

                <div class="block">
                  <span class="demonstration">temperature(0~1)</span>
                  <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="1"></el-slider>
                </div>

                <div class="block">
                  <span class="demonstration" s>Top_p(0~1)</span>
                  <el-slider class="astrict" v-model="SettingInfo.TopP" :step="0.1" :min="0" :max="1"></el-slider>
                </div>

                <div class="block">
                  <span class="demonstration">Frequency_penalty(-2~2)</span>
                  <el-slider class="astrict" v-model="SettingInfo.FrequencyPenalty" :step="0.1" :min="-2" :max="2" ></el-slider>
                </div>

                <div class="block">
                  <span class="demonstration">Presence_penalty(-2~2)</span>
                  <el-slider class="astrict" v-model="SettingInfo.PresencePenalty" :step="0.1" :min="-2" :max="2"></el-slider>
                </div>
                <div style="height: 30px;"></div>
              </div>
            </el-collapse-transition>

            <!--图片设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==1">

                <div class="block">
                  <span class="demonstration">n(1~10)</span>
                  <el-slider class="astrict" v-model="SettingInfo.n" :step="1" :min="-1" :max="10"></el-slider>
                </div>

                <div class="block">
                  <span class="demonstration">size</span>
                  <el-select v-model="SettingInfo.size" placeholder="请选择" style="margin-top: 10px;">
                    <el-option
                      v-for="item in imgSizes"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

              </div>
            </el-collapse-transition>
            
        </div>
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

import { getModels,getMoneyInfo } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      //0是聊天设置，1是图片设置
      SettingStatus:0,
      //余额信息
      moneryInfo:{
        totalGranted:0,
        totalUsed:0,
        totalAvailable:0
      },
      //全部的设置参数
      SettingInfo:{
        KeyMsg:"",
        MaxTokens:1000,
        Temperature:1,
        TopP:1,
        FrequencyPenalty:0,
        PresencePenalty:0,
        n:1,
        size:"256x256"
      },
      pcCurrent: "",
      //模型列表
      personList: [],
      //是否显示聊天窗口
      showChatWindow: false,
      //当前窗口的对话模型信息
      chatWindowInfo: {},
      imgSizes: [{
          value: '256x256'
        }, {
          value: '512x512'
        }, {
          value: '1024x1024'
        }]
    };
  },
  mounted() {
    // 在Vue实例中添加监听函数
    this.$watch('SettingInfo.KeyMsg', this.watchKeyMsg);
    
  },
  filters: {
    numFilterReservedSix (value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(6)
    },
    numFilterReservedTwo (value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(2)
    }
  },
  methods: {
    // 监听KeyMsg属性的变化
    watchKeyMsg: function(newVal, oldVal) {
      //获取模型列表
      getModels(newVal).then((res) => {
        this.personList = res;
      });
      //获取余额信息
      getMoneyInfo(newVal).then((res) => {
        this.moneryInfo.totalGranted = res.total_granted;
        this.moneryInfo.totalUsed = res.total_used;
        this.moneryInfo.totalAvailable = res.total_available;
      });
    },
    // 更新当前余额
    updateMoneyInfo(){
      getMoneyInfo(this.SettingInfo.KeyMsg).then((res) => {
        this.$nextTick(() => {
          this.moneryInfo.totalGranted = res.total_granted;
          this.moneryInfo.totalUsed = res.total_used;
          this.moneryInfo.totalAvailable = res.total_available;
        })
      })
    },
    clickPerson(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      this.personInfo = info;
      this.pcCurrent = info.id;
    },
    personCardSort(id) {
      if (id !== this.personList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].id == id) {
            nowPersonInfo = this.personList[i];
            this.personList.splice(i, 1);
            break;
          }
        }
        this.personList.unshift(nowPersonInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner  {
              background-color: transparent;
              color: #409EFF;
            }
  .setting{
    margin-left:0px;
    padding-left: 10px;
    color: rgb(176, 178, 189);
  }
  .setting.active {
    color: #fff; // 选中后的颜色
  }
  .setting:hover{
    cursor: pointer;
  }
  #jianbian{
    background-color:rgb(50, 54, 68);
    color: #fff;
    border-radius: 35px;
    border-width: 3px;
  }
  .astrict{
    width: 90%;
  }
  .block{
    margin-top: 10%;
    .demonstration{
      color:aliceblue;
      text-align: center;
    }
  }
 .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
.chatHome {
  // margin-top: 20px;
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .online-person {
      margin-top: 10%;
      .onlin-text {
        margin-left: 35%;
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .s-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}

</style>