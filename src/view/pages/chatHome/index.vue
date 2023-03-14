<template>
  <div class="chatHome">
    <div class="chatLeft" style="width:24%">
      <div class="title">
        <h1>君尘陌AI聊天</h1>
      </div>
      <div class="online-person" style="margin-top: 5%;"> 
        <span class="onlin-text">模型列表</span>
        <input class="inputs" v-model="modelSearch"  style=" margin-top: 10px;" />
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
     
        <el-card shadow="hover" id="jianbian" style="line-height: 120%;text-align: center;">
            总余额：${{ this.moneryInfo.totalGranted | numFilterReservedTwo }}<br/>
            可用余额：${{ this.moneryInfo.totalAvailable | numFilterReservedSix }}<br/>
            消耗余额：${{ moneryInfo.totalUsed | numFilterReservedSix }}<br/>
        </el-card>
     
      <div class="online-person">
        <span class="setting" @click="SettingStatus=0" :class="{ active: SettingStatus === 0 }">对话</span>
        <span class="setting" @click="SettingStatus=1" :class="{ active: SettingStatus === 1 }">图片</span>
        <span class="setting" @click="SettingStatus=2" :class="{ active: SettingStatus === 2 }">语音</span>
        <span class="setting" @click="SettingStatus=3" :class="{ active: SettingStatus === 3 }">微调</span>
        <span class="setting" @click="SettingStatus=4" :class="{ active: SettingStatus === 4 }">文件</span>
        <div class="s-wrapper">
          <div >
            <input class="inputs" v-model="SettingInfo.KeyMsg" placeholder="请输入OpenAI KEY" style="width: 100%; margin-left: 0px;margin-right: 0px;"/>
          </div>
            <!--对话设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==0">
                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定要生成的最大单词数，不能超过2048。" placement="top">
                    <span class="demonstration" style="">max_tokens</span>
                  </el-tooltip>
               
                  <el-slider class="astrict" v-model="SettingInfo.MaxTokens" :step="1" :min="0" :max="2048"></el-slider>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定生成文本的随机性，范围是0到1，越高表示越多样化和创造性，越低表示越保守和确定性。" placement="top">
                    <span class="demonstration">temperature(0~1)</span>
                  </el-tooltip>

                  <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="1"></el-slider>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定在每个步骤中保留概率最高的单词的比例，范围是0到1，与temperature类似，但更加灵活和稳健。" placement="top">
                    <span class="demonstration" s>top_p(0~1)</span>
                  </el-tooltip>  

                  <el-slider class="astrict" v-model="SettingInfo.TopP" :step="0.1" :min="0" :max="1"></el-slider>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定降低重复单词出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                    <span class="demonstration">frequency_penalty(-2~2)</span>
                  </el-tooltip>  

                  <el-slider class="astrict" v-model="SettingInfo.FrequencyPenalty" :step="0.1" :min="-2" :max="2" ></el-slider>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定降低重复话题出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                    <span class="demonstration">presence_penalty(-2~2)</span>
                  </el-tooltip>
                  <el-slider class="astrict" v-model="SettingInfo.PresencePenalty" :step="0.1" :min="-2" :max="2"></el-slider>
                </div>
                <div style="height: 30px;"></div>
              </div>
            </el-collapse-transition>

            <!--图片设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==1">

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="生成图片的数量。" placement="top">
                    <span class="demonstration">n(1~10)</span>
                  </el-tooltip>  
                  <el-slider class="astrict" v-model="SettingInfo.n" :step="1" :min="-1" :max="10"></el-slider>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="图片的大小。" placement="top">
                    <span class="demonstration">size</span>
                  </el-tooltip>  
                  <div>
                    <el-select v-model="SettingInfo.size" placeholder="请选择" style="margin-top: 10px;">
                      <el-option
                        v-for="item in imgSizes"
                        :key="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="打开之后聊天发送的内容为描述图片的信息" placement="top">
                    <span class="demonstration">产图模式</span>
                  </el-tooltip>
                  <div>
                    <el-switch v-model="SettingInfo.openProductionPicture" :width="defaulWidth" style="margin-top: 10px;"></el-switch>
                  </div>
                </div>

              </div>
            </el-collapse-transition>
            


            <!--音频设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==2">

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="指定语音识别的随机性，范围是0到1，越高表示越多样化和创造性，越低表示越保守和确定性。" placement="top">
                    <span class="demonstration">temperature(0~1)</span>
                  </el-tooltip>

                  <el-slider class="astrict" v-model="SettingInfo.TemperatureAudio" :step="0.1" :min="0" :max="1"></el-slider>
                </div>
                
                <div class="block">
                  <el-tooltip class="item" effect="dark" content="请选你录音说的语言，以便于更快更精准的识别" placement="top">
                    <span class="demonstration">language</span>
                  </el-tooltip>  
                  <div>
                    <el-select v-model="SettingInfo.language" placeholder="请选择" style="margin-top: 10px;">
                      <el-option
                        v-for="item in languages"
                        :key="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="英文录音识别专用" placement="top">
                    <span class="demonstration">英语音频翻译</span>
                  </el-tooltip>
                  <div>
                    <el-switch v-model="SettingInfo.translateEnglish" :width="defaulWidth" style="margin-top: 10px;"></el-switch>
                  </div>
                </div>

              </div>
            </el-collapse-transition>


            <!--微调-->
            <el-collapse-transition>
              <div v-show="SettingStatus==3">

              </div>
            </el-collapse-transition>

              <!--文件-->
            <el-collapse-transition>
              <div v-show="SettingStatus==4">

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
      //宽度
      defaulWidth:70,
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
        translateEnglish:false,
        openProductionPicture:false,
        KeyMsg:"",
        MaxTokens:1000,
        Temperature:1,
        TemperatureAudio:0,
        TopP:1,
        FrequencyPenalty:0,
        PresencePenalty:0,
        n:1,
        size:"256x256",
        language:"zh"
      },
      pcCurrent: "",
      modelSearch: "",
      //模型列表
      personList: [],
      //模型列表缓存
      personListCache: [],
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
        }],
      languages:[{
          value: 'zh'
        }, {
          value: 'en'
        }, {
          value: 'fr'
        }, {
          value: 'de'
        },{
          value: 'ja'
        }]
    };
  },
  mounted() {
    // 在Vue实例中添加监听函数
    this.$watch('SettingInfo.KeyMsg', this.watchKeyMsg);
    this.$watch('modelSearch', this.watchModelSearch);
    if(sessionStorage.getItem("OpenAI_key")){
      this.SettingInfo.KeyMsg=sessionStorage.getItem("OpenAI_key")
    }
  },
  filters: {
    numFilterReservedSix (value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(4)
    },
    numFilterReservedTwo (value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(2)
    }
  },
  methods: {
    // 监听modelSearch属性的变化
    watchModelSearch:function(newVal,oldVal){
      if(this.personList.length !==0 ){
        this.personList = this.personListCache.filter(person => person.id.includes(newVal))
      }
    },
    // 监听KeyMsg属性的变化
    watchKeyMsg: function(newVal, oldVal) {
      //获取模型列表
      getModels(newVal).then((res) => {
        //保存OpenAI key到session中
        sessionStorage.setItem('OpenAI_key', newVal)
        this.personList = res;
        this.personListCache = res;
         //获取余额信息
        getMoneyInfo(newVal).then((res) => {
          this.moneryInfo.totalGranted = res.total_granted;
          this.moneryInfo.totalUsed = res.total_used;
          this.moneryInfo.totalAvailable = res.total_available;
        });
      }).catch(e =>{
        this.$message({
          message: "OpenAI Key有问题哦~",
          type: "error",
        });
      })
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
 .inputs {
        width: 65%;
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
    background-color:rgb(39, 42, 55);
    border-color: #409EFF;
    color: #fff;
    border-width:0px;
  }
  .astrict{
    width: 90%;
  }
  .block{
    margin-top: 5%;
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
        margin-top: 10px;
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