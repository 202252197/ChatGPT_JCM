<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>君尘陌AI聊天</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">模型列表</span>
        <div class="person-cards-wrapper">
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
          @personCardSort="personCardSort"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <div class="chatLeft">
      <div class="online-person">
        <span class="onlin-text">参数设置</span>
        <div class="person-cards-wrapper">
          <div>
            <input class="inputs" v-model="SettingInfo.KeyMsg" placeholder="请输入OpenAI KEY"/>
          </div>
          <div>
            <div class="block">
              <span class="demonstration" style="">Max_tokens</span>
              <el-slider class="astrict" v-model="SettingInfo.MaxTokens" :step="1" :min="0" :max="2048"></el-slider>
            </div>
          </div>
          <div>
            <div class="block">
              <span class="demonstration">temperature(0~1)</span>
              <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="1"></el-slider>
            </div>
          </div>
          <div>
            <div class="block">
              <span class="demonstration" s>Top_p(0~1)</span>
              <el-slider class="astrict" v-model="SettingInfo.TopP" :step="0.1" :min="0" :max="1"></el-slider>
            </div>
          </div>
          <div>
            <div class="block">
              <span class="demonstration">Frequency_penalty(-2~2)</span>
              <el-slider class="astrict" v-model="SettingInfo.FrequencyPenalty" :step="0.1" :min="-2" :max="2" ></el-slider>
            </div>
          </div>
          <div>
            <div class="block">
              <span class="demonstration">Presence_penalty(-2~2)</span>
              <el-slider class="astrict" v-model="SettingInfo.PresencePenalty" :step="0.1" :min="-2" :max="2"></el-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

import { getFriend } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      SettingInfo:{
        KeyMsg:"",
        MaxTokens:1000,
        Temperature:1,
        TopP:1,
        FrequencyPenalty:0,
        PresencePenalty:0
      },
      pcCurrent: "",
      personList: [],
      showChatWindow: false,
      chatWindowInfo: {},
    };
  },
  mounted() {
    getFriend().then((res) => {
      console.log(res);
      this.personList = res;
    });
  },
  methods: {
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
      margin-top: 100px;
      .onlin-text {
        margin-left: 30%;
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .person-cards-wrapper {
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