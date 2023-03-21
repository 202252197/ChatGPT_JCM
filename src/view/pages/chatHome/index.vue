<template>
  <div class="chatHome">
    <div class="chatLeft" style="width:24%" v-show="showPersonList">
      <div class="title">
        <h2>君尘陌AI聊天</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;"> 
        <el-row :gutter="24">
          <el-col :span="7" :offset="2">
            <div class="setting">
              <span class="" @click="modelClick" :class="{ whiteText: cutSetting === 0 }">模型</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="setting">
              <span class="" @click="sessionClick" :class="{ whiteText: cutSetting === 1 }">会话</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="setting">
              <span class="" @click="fineTuningClick" :class="{ whiteText: cutSetting === 2 }">微调</span>
            </div>
          </el-col>
        </el-row>
        <div v-show="cutSetting==0">
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

        <div v-show="cutSetting==1">
          <div class="send boxinput" @click="newSession">
            <svg t="1679215361568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3128" width="30" height="30"><path d="M512.001024 0A512 512 0 0 0 0.001024 512a506.88 506.88 0 0 0 92.16 292.352V972.8a51.2 51.2 0 0 0 51.2 51.2H512.001024a512 512 0 0 0 0-1024z m0 921.6H194.561024v-134.144a51.2 51.2 0 0 0-10.24-30.72A406.016 406.016 0 0 1 102.401024 512a409.6 409.6 0 1 1 409.6 409.6z" fill="#ffffff" p-id="3129"></path><path d="M716.801024 486.4a51.2 51.2 0 0 0-51.2 51.2 153.6 153.6 0 0 1-307.2 0 51.2 51.2 0 0 0-102.4 0 256 256 0 0 0 512 0 51.2 51.2 0 0 0-51.2-51.2z" fill="#ffffff" p-id="3130"></path></svg>
            New Chat
          </div>
          <div class="s-wrapper">
            <div v-for="sessionInfo in sessionList"
              :key="sessionInfo.id" 
              @click="clickSession(sessionInfo)">
              <Session
                :sessionInfo="sessionInfo"
                :pcCurrent="sessionCurrent"
              ></Session>
            </div>
          </div>
        </div>

        <div v-show="cutSetting==2">
          <input class="inputs" v-model="fineTuningSearch"  style=" margin-top: 10px;" />
          <div class="s-wrapper">
            <div
              class="personList"
              v-for="fineTuningInfo in fineTuningList"
              :key="fineTuningInfo.id"
              @click="clickFineTuning(fineTuningInfo)"
            >
              <PersonCard
                :personInfo="fineTuningInfo"
                :pcCurrent="ftCurrent"
              ></PersonCard>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div class="top-left" @click="toggleLeft">
        <svg t="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30"><path d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z" fill="#BDD2EF" p-id="5765"></path><path d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z" fill="#2867CE" p-id="5766"></path></svg>
        <svg t="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30"><path d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z" fill="#BDD2EF" p-id="7552"></path><path d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z" fill="#2867CE" p-id="7553"></path></svg>
      </div>
      <div class="top-right" @click="toggleRight">
        <svg t="1679366707602" class="icon" v-show="!showSetupList" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30"><path d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z" fill="#BDD2EF" p-id="7552"></path><path d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z" fill="#2867CE" p-id="7553"></path></svg>
        <svg t="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30"><path d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z" fill="#BDD2EF" p-id="5765"></path><path d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z" fill="#2867CE" p-id="5766"></path></svg>
      </div>
      <div v-if="showChatWindow">
        <ChatWindow
          ref="chatWindow"
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
    <div class="chatLeft" v-show="showSetupList">
     
        <el-card shadow="hover" id="jianbian" style="line-height: 120%;text-align: center;">
            总余额：${{ this.moneryInfo.totalGranted | numFilterReservedTwo }}<br/>
            可用余额：${{ this.moneryInfo.totalAvailable | numFilterReservedSix }}<br/>
            消耗余额：${{ moneryInfo.totalUsed | numFilterReservedSix }}<br/>
        </el-card>
     
      <div class="online-person">
        <el-row :gutter="20">
          <el-col :span="6"><span class="setting" @click="SettingStatus=0" :class="{ active: SettingStatus === 0 }">对话</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=1" :class="{ active: SettingStatus === 1 }">图片</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=2" :class="{ active: SettingStatus === 2 }">音频</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=3" :class="{ active: SettingStatus === 3 }">微调</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=4" :class="{ active: SettingStatus === 4 }">文件</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=5" :class="{ active: SettingStatus === 5 }">会话</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=6" :class="{ active: SettingStatus === 6 }">识图</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus=7" :class="{ active: SettingStatus === 7 }">设置</span></el-col>
        </el-row>
        
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
                  <el-tooltip class="item" effect="dark" content="指定生成文本的随机性，范围是0到2，越高表示越多样化和创造性，越低表示越保守和确定性。" placement="top">
                    <span class="demonstration">temperature(0~2)</span>
                  </el-tooltip>

                  <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="2"></el-slider>
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
                  <el-tooltip class="item" effect="dark" content="打开之后聊天发送的内容为描述图片的信息" placement="top">
                    <span class="demonstration">产图模式</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.openProductionPicture" :width="defaulWidth" style="margin-left: 15%;"></el-switch>
                </div>

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="打开之后先上传图片，然后再输入提示词进行修改。" placement="top">
                    <span class="demonstration">改图模式</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.openChangePicture" :width="defaulWidth" style="margin-left: 15%;"></el-switch>
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
                  <el-tooltip class="item" effect="dark" content="生成图片的数量。" placement="top">
                    <span class="demonstration">n(1~10)</span>
                  </el-tooltip>  
                  <el-slider class="astrict" v-model="SettingInfo.n" :step="1" :min="-1" :max="10"></el-slider>
                </div>

              </div>
            </el-collapse-transition>
            


            <!--音频设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==2">

                <div class="block">
                  <el-tooltip class="item" effect="dark" content="英文录音识别专用" placement="top">
                    <span class="demonstration">英文识别</span>
                  </el-tooltip>
                  <el-switch v-model="SettingInfo.translateEnglish" :width="defaulWidth" style="margin-left: 15%;"></el-switch>
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
                  <el-tooltip class="item" effect="dark" content="指定语音识别的随机性，范围是0到1，越高表示越多样化和创造性，越低表示越保守和确定性。" placement="top">
                    <span class="demonstration">temperature(0~1)</span>
                  </el-tooltip>

                  <el-slider class="astrict" v-model="SettingInfo.TemperatureAudio" :step="0.1" :min="0" :max="1"></el-slider>
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

           <!--会话-->
            <el-collapse-transition>
              <div v-show="SettingStatus==5">

              </div>
            </el-collapse-transition>

            <!--识图-->
            <el-collapse-transition>
              <div v-show="SettingStatus==6">
       
              </div>
            </el-collapse-transition>

                <!--界面设置-->
            <el-collapse-transition>
              <div v-show="SettingStatus==7">
                <div class="block">
                  <el-tooltip class="item" effect="dark" content="将图片的url路径填入此处即可设置聊天背景。" placement="top">
                    <span class="demonstration">聊天背景</span>
                  </el-tooltip>
                  <input class="inputs" v-model="SettingInfo.contentImageUrl" placeholder="设置聊天界面的背景URL" style="margin-top: 10px; width: 100%; margin-left: 0px;margin-right: 0px;"/>
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
import Session from "@/components/Session.vue";
import ChatWindow from "./chatwindow.vue";
import {AI_HEAD_IMG_URL} from '@/store/mutation-types'
import { getModels,getMoneyInfo,getFineTunesList } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
    Session
  },
  data() {
    return {
      //宽度
      defaulWidth:70,
      //0是聊天设置，1是图片设置
      SettingStatus:0,
      //0是模型列表，1是会话列表
      cutSetting:0,
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
        openChangePicture:false,
        KeyMsg:process.env.VUE_APP_OPENAI_API_KEY,
        MaxTokens:1000,
        Temperature:1,
        TemperatureAudio:0,
        TopP:1,
        FrequencyPenalty:0,
        PresencePenalty:0,
        n:1,
        size:"256x256",
        language:"zh",
        contentImageUrl:""
      },
      //当前点击的模型
      pcCurrent: "",
      //当前点击的会话
      sessionCurrent:"",
      //当前点击的微调模型
      ftCurrent:"",
      //微调搜索数据
      fineTuningSearch:"",
      //模型搜索数据
      modelSearch: "",
      //微调模型列表
      fineTuningList: [],
      //模型列表
      personList: [],
      //会话列表
      sessionList: [],
      //模型列表缓存
      personListCache: [],
      //是否显示聊天窗口
      showChatWindow: false,
      //当前窗口的对话模型信息
      chatWindowInfo: {},
      //图片大小参数列表
      imgSizes: [{
          value: '256x256'
        }, {
          value: '512x512'
        }, {
          value: '1024x1024'
        }],
      //语音定义的参数
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
        }],
      // 是否隐藏模型列表和功能设置选择列表
      showPersonList: true,
      showSetupList: true,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    if(this.SettingInfo.KeyMsg){
      //获取模型列表
      getModels(this.SettingInfo.KeyMsg).then((res) => {
        //保存OpenAI key到session中
        this.personList = res;
        this.personListCache = res;
        console.log("auto click.")
        if (this.personList.length > 0) {
          this.clickPerson(this.personList[0])
          }
        this.updateMoneyInfo()
      }).catch(e =>{
        this.$message({
          message: "OpenAI Key有问题哦~",
          type: "error",
        });
      })
    }
    // 在Vue实例中添加监听函数
    this.$watch('SettingInfo.KeyMsg', this.watchKeyMsg);
    this.$watch('SettingInfo.contentImageUrl', this.watchContentImageUrl);
    this.$watch('modelSearch', this.watchModelSearch);
    this.$watch('SettingInfo.openChangePicture', this.watchOpenChangePicture);
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
    // 点击切换显示状态
    toggleLeft() {
      console.log("left clicked")
      this.showPersonList = !this.showPersonList;
    },
    toggleRight() {
      console.log("right clicked")
      this.showSetupList = !this.showSetupList;
    },
    //监听窗口尺寸的变化
    handleResize() {
      if (window.innerWidth <= 1150) {
        this.showPersonList = false;
        this.showSetupList = false;
        this.showChatWindow = true;
        const info = {
          img: "",
          name: "ChatGPT-3.5",
          detail: "chatgpt v3.5 所基于的模型",
          lastMsg: "chatgpt v3.5 所基于的模型",
          id: "gpt-3.5-turbo",
          headImg:AI_HEAD_IMG_URL,
          showHeadImg: true
        }
        this.chatWindowInfo = info;
        this.personInfo = info;
      } else {
        this.showPersonList = true;
        this.showSetupList = true;
      };
    },
    // 监听openChangePicture属性的变化
    watchOpenChangePicture:function(newVal,oldVal){
      if(!newVal){
        
      }
    },
    // 监听contentImageUrl属性的变化
    watchContentImageUrl:function(newVal,oldVal){
      if(newVal){
         this.$refs.chatWindow.updateContentImageUrl(newVal)
      }else{
         this.$refs.chatWindow.updateContentImageUrl("https://bpic.51yuansu.com/backgd/cover/00/31/39/5bc8088deeedd.jpg?x-oss-process=image/resize,w_780")
      }
    },
    // 监听modelSearch属性的变化
    watchModelSearch:function(newVal,oldVal){
      if(this.personList.length !==0 ){
        this.personList = this.personListCache.filter(person => person.id.includes(newVal))
      }
      if(newVal==""){
        this.personList = this.personListCache
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
    //创建会话
    newSession(){
      //获取当前会话长度
      const currentLen=this.sessionList.length+1
      //定义对象
      const obj= {
        "id":currentLen,
        "title":"",
        "dataList":[]
      }
      //先获取对话的列表
      const msgList=this.$refs.chatWindow.getMesList();
      if(msgList.length>=2){
        if(this.sessionCurrent){
          this.sessionCurrent=""
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        }else{
          obj.title=msgList[0].msg
          obj.dataList=msgList;
          let tempSessionList= this.sessionList;
          tempSessionList.push(obj)
          
          this.sessionList=tempSessionList.reverse();
          this.sessionCurrent = "";
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        }
      }else if(msgList.length=1){
       //清除当前窗口数据
       this.$refs.chatWindow.clearMsgList();
      }else{
        console.log("啥都不干")
      }
    },
    //模型列表被点击
    modelClick(){
      this.cutSetting=0
      this.showChatWindow = false;
    },
    //会话列表被点击
    sessionClick(){
      this.sessionCurrent=""
      this.cutSetting=1
      this.chatWindowInfo={
        img: "",
        name: "ChatGPT-3.5",
        detail: "chatgpt v3.5 所基于的模型",
        lastMsg: "chatgpt v3.5 所基于的模型",
        id: "gpt-3.5-turbo",
        headImg:AI_HEAD_IMG_URL,
        showHeadImg: true
      }
      this.showChatWindow = true;
    },
     //微调模型列表被点击
     fineTuningClick(){
      this.cutSetting=2
      this.showChatWindow = false;
      //获取微调模型列表
      getFineTunesList(this.SettingInfo.KeyMsg).then((res) => {
        this.fineTuningList=res
      }).catch(e =>{
        this.$message({
          message: "OpenAI Key有问题哦~",
          type: "error",
        });
      })
    },
    //模型被点击
    clickPerson(info) {
      //清除当前选择的会话
      this.sessionCurrent= "";
      //清除当前选择的微调
      this.ftCurrent="";
      //显示当前聊天窗口
      this.showChatWindow = true;
      //传入当前聊天窗口信息
      this.chatWindowInfo = info;
      //设置当前被点击的对象
      this.personInfo = info;
      //设置当前被点击的模型id
      this.pcCurrent = info.id;
    },
    //会话被点击
    clickSession(info) {
      //清除当前选择的微调
      this.ftCurrent="";
      //清除当前选择的模型
      this.pcCurrent= "";
      this.sessionCurrent = info.id;
      this.$refs.chatWindow.assignmentMesList(info.dataList)
    },
    //微调模型被点击
    clickFineTuning(info){
      //清除当前选择的会话
      this.sessionCurrent= "";
      //清除当前选择的模型
      this.pcCurrent= "";
      //显示当前聊天窗口
      this.showChatWindow = true;
      //传入当前聊天窗口信息
      this.chatWindowInfo = info;
      //设置当前被点击的对象
      this.fineTuningInfo = info;
      //设置当前选着的微调模型id
      this.ftCurrent = info.id
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
.top-left,
.top-right {
  position: absolute;
  top: 5px;
  cursor: pointer;
}
.top-left {
  left: 5px;
}
.top-right {
  right: 5px;
}
.boxinput {
  height:30px;
  line-height:50px;
  color: #fff;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: 90%;
  text-align: center;
  height: 50px;
  background-color: rgb(66, 70, 86);
  border-radius: 15px;
  border: 1px solid rgb(80, 85, 103);
  position: relative;
  cursor: pointer;
}
.icon {
  margin-right: 10px;
  vertical-align: middle;
}
.send {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(91 162 78);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
  }
 }
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
.whiteText{
  color: #fff;
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
        margin-left: 20%;
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