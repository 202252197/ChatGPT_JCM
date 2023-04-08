<template>
  <div class="chat-window">
    <div class="top">
      <el-row style="height: 70px;">

        <el-col :span="personInfoSpan[0]">
          <div class="head-pic">
            <HeadPortrait :imgUrl="frinedInfo.headImg"></HeadPortrait>
          </div>
        </el-col>

        <el-col :span="personInfoSpan[1]">
          <div class="info-detail">
            <div class="name">{{ frinedInfo.name }}</div>
            <div class="detail">{{ frinedInfo.detail }}</div>
          </div>
        </el-col>
        <el-col :span="personInfoSpan[2]">
          <div class="other-fun">
            <!-- <label @click="changeLanguage">
              <span class="iconfont">
                <svg t="1680840158581" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5743" id="mx_n_1680840158585" width="25" height="25"><path d="M424.7 343.4H386c-1.1 0-2 0.9-2 2v81.3c0 1.1 0.9 2 2 2h38.7c1.1 0 2-0.9 2-2v-81.3c0-1.1-0.9-2-2-2zM296.7 343.4H258c-1.1 0-2 0.9-2 2v81.3c0 1.1 0.9 2 2 2h38.7c1.1 0 2-0.9 2-2v-81.3c0-1.1-0.9-2-2-2z" fill="#76798a" p-id="5744"></path><path d="M896 130H128c-23.6 0-42.7 19.1-42.7 42.7v682.7c0 23.6 19.1 42.7 42.7 42.7h768c23.6 0 42.7-19.1 42.7-42.7V172.7c0-23.6-19.1-42.7-42.7-42.7zM170.6 471.4V300.7c0-23.5 19.2-42.7 42.7-42.7h85.3c0-23.5 19.2-42.7 42.7-42.7S384 234.5 384 258h85.3c23.5 0 42.7 19.2 42.7 42.7v170.6c0 23.5-19.2 42.7-42.7 42.7H384v42.8c0 23.5-19.2 42.7-42.7 42.7s-42.7-19.2-42.7-42.7v-42.7h-85.3c-23.5 0-42.7-19.2-42.7-42.7zM512 791.3c-93.1 0-179.6-46.3-231.1-124-6.5-9.7-3.8-23 6-29.5 9.7-6.5 23-3.9 29.5 6 43.7 65.7 116.8 104.9 195.6 104.9 11.8 0 21.3 9.5 21.3 21.3s-9.5 21.3-21.3 21.3z m65.3-525.8c3.9-11.1 16.2-16.9 27.2-13 56.3 19.9 105.6 58.3 138.7 108.2 6.5 9.7 3.8 23-6 29.5-3.6 2.4-7.7 3.6-11.8 3.6-6.9 0-13.7-3.3-17.8-9.5-28.1-42.2-69.8-74.8-117.3-91.6-11.1-3.9-16.9-16.1-13-27.2z m233.4 547.2H640c-23.5 0-42.7-19.2-42.7-42.7V471.5c0-23.5 19.2-42.7 42.7-42.7h169.9c23.8 0 43.7 19.4 43.4 43.2-0.4 23.2-19.4 42.1-42.7 42.1h-126c-1.1 0-2 0.9-2 2v60c0 1.1 0.9 2 2 2h126c23.3 0 42.4 18.9 42.7 42.1 0.4 23.7-19.6 43.2-43.4 43.2H684.7c-1.1 0-2 0.9-2 2v60c0 1.1 0.9 2 2 2h125.2c23.8 0 43.8 19.4 43.5 43.2-0.4 23.2-19.4 42.1-42.7 42.1z" fill="#76798a" p-id="5745"></path></svg>
              </span>
            </label> -->
            <label @click="clearMsgList">
              <span class="iconfont icon-qingchu"></span>
            </label>
            <label @click="importFromJsonArr">
              <span class="iconfont icon-daoru"></span>
            </label>
            <label @click="exportObjArrToJson">
              <span class="iconfont icon-daochu"></span>
            </label>
            <label for="imgFile">
              <span class="iconfont icon-tupian"></span>
            </label>
            <label for="docFile">
              <span class="iconfont icon-wenben"></span>
            </label>
            <input type="file" name="" id="imgFile" @change="sendImg" accept="image/*" />
            <input type="file" name="" id="docFile" @change="sendFile" accept="application/*,text/*" />
            <!-- 导入当前会话内容 -->
            <input type="file" ref="onupdateJosnArr" @change="handleFileUpload" style="display: none;">
          </div>
        </el-col>
      </el-row>

    </div>
    <div v-show="!acqStatus">
      <div class="line"></div>
    </div>

    <div class="botoom" style="background-color:rgb(50, 54, 68);">
      <!-- :style="{ backgroundImage: 'url(' + contentBackImageUrl + ')' }" -->
      <div class="chat-content" id="chat-content" ref="chatContent" @scroll="onScroll">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== 'jcm'">
            <div class="chat-text" v-if="item.chatType == 0">
              <el-row :gutter="20">
                <el-col :span="2">
                  <svg t="1679666016648" @click="$copy(item.msg, '已复制')" class="icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6241" width="22" height="22">
                    <path
                      d="M661.333333 234.666667A64 64 0 0 1 725.333333 298.666667v597.333333a64 64 0 0 1-64 64h-469.333333A64 64 0 0 1 128 896V298.666667a64 64 0 0 1 64-64z m-21.333333 85.333333H213.333333v554.666667h426.666667v-554.666667z m191.829333-256a64 64 0 0 1 63.744 57.856l0.256 6.144v575.701333a42.666667 42.666667 0 0 1-85.034666 4.992l-0.298667-4.992V149.333333H384a42.666667 42.666667 0 0 1-42.368-37.674666L341.333333 106.666667a42.666667 42.666667 0 0 1 37.674667-42.368L384 64h447.829333z"
                      fill="#909399" p-id="6242"></path>
                  </svg>
                </el-col>
                <el-col :span="21">
                </el-col>
              </el-row>

              <markdown-it-vue :content="item.msg.trim()" />
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img :src="item.msg" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
              <el-image style="border-radius: 10px" :src="item.msg" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
              </div>
            </div>
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType == 0">
              <span style="font-size:16px">{{ item.msg }}</span>
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img :src="item.msg" alt="表情" v-if="item.extend.imgType == 1" style="width: 100px; height: 100px" />
              <el-image style="max-width: 300px; border-radius: 10px" :src="item.msg" :preview-src-list="srcImgList"
                v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard :fileType="item.extend.fileType" :file="item.msg"></FileCard>
              </div>
            </div>
            <div class="info-time">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <!--表情-->
        <div class="emoji boxinput" @click="clickEmoji" v-show="buttonStatus">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <!--录音-->
        <div class="luyin boxinput" @click="stopRecording" v-if="recording" v-show="buttonStatus">
          <i class="el-icon-microphone" style="margin-top: 17%;"></i>
        </div>
        <div class="luyin boxinput" @click="startRecording" v-if="!recording" v-show="buttonStatus">
          <i class="el-icon-turn-off-microphone" style="margin-top: 17%;"></i>
        </div>
        <!--emo表情列表-->
        <div class="emoji-content" v-show="buttonStatus">
          <Emoji v-show="showEmoji" @sendEmoji="sendEmoji" @closeEmoji="clickEmoji"></Emoji>
        </div>
        <!--输入框-->
        <el-input type="textarea" id="textareaMsg" ref="textInput" :autosize="{}" class="textarea" v-model="inputMsg"
          maxlength="2048"
          style="margin-left: 2%;margin-top: 3px;min-height: 51px;max-height:400px;max-width: 80%;min-width: 45%;  height: auto;"
          @keydown.enter.stop @keydown.enter.shift.prevent="insertLineBreak"
          :placeholder="$t('placeholder.question')"></el-input>
        <!--发送-->
        <div>
          <div class="send boxinput" @click="sendText">
            <img src="@/assets/img/emoji/rocket.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { animation, getNowTime, JCMFormatDate } from "@/util/util";
import { getChatMsg, getCompletion, getChatCompletion, createImage, createImageEdit, createImageVariations, createTranscription, createTranslation, createEmbeddings } from "@/api/getData";
import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import base from "@/api/index";
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import { AI_HEAD_IMG_URL, USER_HEAD_IMG_URL, USER_NAME } from '@/store/mutation-types'
import { saveAs } from 'file-saver';

export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
    MarkdownItVue
  },
  props: {
    storeStatu: Number,
    settingInfo: Object,
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  watch: {
  },
  data() {
    return {
      isAutoScroll: true,
      fileArrays: [],
      inputsStatus: true,
      rows: 1,
      //是否显示表情和录音按钮
      buttonStatus: true,
      //是否在接收消息中，如果是则true待发送状态，如果是false则是等待消息转圈状态
      acqStatus: true,
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      recording: false,
      audioChunks: [],
      screenshot: "",
      contentBackImageUrl: "https://bpic.51yuansu.com/backgd/cover/00/31/39/5bc8088deeedd.jpg?x-oss-process=image/resize,w_780",
      updateImage: null,
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [1, 17, 6],
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
    //导入当前内容json触发的方法
    importFromJsonArr() {
      this.$refs.onupdateJosnArr.click(); // 触发选择文件的弹框
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result; // 文件内容
        const parsed = JSON.parse(fileContent); // 转换为数组
        this.chatList = this.chatList.concat(parsed)
      };
      reader.readAsText(file);
    },
    //导出当前会话到json文件
    exportObjArrToJson() {
      console.log(this.chatList)
      let jsonString = JSON.stringify(this.chatList); // 将数组转为JSON字符串
      let blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
      saveAs(blob, "data.json");
    },
    //监听窗口的变化
    handleResize() {
      if (window.innerWidth <= 700) {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '93%';
          this.buttonStatus = false
          var textareaMsg = document.getElementById("textareaMsg");
          textareaMsg.style.marginLeft = "0px";
          this.personInfoSpan = [14, 0, 10];
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
          if (isMobile) {
            document.querySelectorAll('.chatInputs')[0].style.margin = '0%';
          } else {
            document.querySelectorAll('.chatInputs')[0].style.margin = '3%';
          }
       });
      } else {
        this.$nextTick(() => {
          document.querySelectorAll('.chat-content')[0].style.height = '88%';
          this.buttonStatus = true
          this.personInfoSpan = [1, 17, 6];
       });
      };
    },
    newLine(event) {
      this.rows += 1;
      let text = this.$refs.textInput.value;
      text += '\n';
      this.$refs.textInput.value = text;
    },
    //赋值对话列表
    assignmentMesList(msgList) {
      this.chatList = msgList
    },
    //获取对话列表
    getMesList() {
      return this.chatList
    },
    //清除当前对话列表
    clearMsgList() {
      this.chatList = []
    },
    //更新内容背景图片
    updateContentImageUrl(imgUrl) {
      this.contentBackImageUrl = imgUrl
    },
    //组装上下文数据
    contextualAssemblyData() {
      const conversation = []
      for (var chat of this.chatList.filter(chat => chat.chatType === 0)) {
        if (chat.uid == 'jcm') {
          let my = { 'speaker': 'user', 'text': chat.msg }
          conversation.push(my)
        } else if (chat.uid == this.frinedInfo.id) {
          let ai = { 'speaker': 'agent', 'text': chat.msg }
          conversation.push(ai)
        }
      }
      return conversation
    },
    //开始录音
    startRecording() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', event => {
          this.audioChunks.push(event.data)
        })
        this.recording = true
        this.recorder.start()
        // 在这里使用录音器
        this.$message.success(this.$t('message.start_recording'))
      }).catch((error) => {
        this.$message.error(this.$t('message.fail_audio'))
      });
    },
    //停止录音
    async stopRecording() {
      this.recorder.stop()
      this.recording = false
      this.recorder.ondataavailable = (event) => {
        const blob = new Blob([event.data], { type: 'audio/wav' });
        const file = new File([blob], 'recording.wav', {
          type: 'audio/wav',
          lastModified: Date.now()
        });
        const formData = new FormData()
        formData.append('file', file)
        formData.append('model', "whisper-1")
        formData.append('temperature', this.settingInfo.TemperatureAudio)
        formData.append('response_format', "text")

        if (this.settingInfo.translateEnglish) {
          createTranslation(formData, this.settingInfo.KeyMsg).then(data => {
            this.$nextTick(() => {
              this.inputMsg = data;
            });
          })
        } else {
          formData.append('language', this.settingInfo.language)

          createTranscription(formData, this.settingInfo.KeyMsg).then(data => {
            this.$nextTick(() => {
              this.inputMsg = data;
            });
          })
        }
      }
      this.$message.success(this.$t('message.end_recording'))
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },
    // 在组件或页面外部声明计算余弦相似度的函数
    cosineSimilarity(a, b) {
      const dotProduct = a.reduce((acc, curr, i) => acc + curr * b[i], 0);
      const normA = Math.sqrt(a.reduce((acc, curr) => acc + curr * curr, 0));
      const normB = Math.sqrt(b.reduce((acc, curr) => acc + curr * curr, 0));
      return dotProduct / (normA * normB);
    },
    //发送文字信息
    sendText() {
      // if(this.settingInfo.readefile){
      //   console.log(this.fileArrays)
      //   const formData = new FormData();
      //   formData.append("model", "text-embedding-ada-002");
      //   formData.append("input", "吕世昊是谁?");
      //   createEmbeddings(formData,this.settingInfo.KeyMsg).then(data => {
      //     const inputEmbedding=data.data[0]
      //     // const similarText = this.findMostSimilarEmbedding(, this.fileArrays);

      //     // 计算每个句子embedding与输入数据embedding之间的相似度
      //     const similarities = this.cosineSimilarity(this.fileArrays.embedding, inputEmbedding.embedding)
      //     const similaritiesArr=[];
      //     console.log(similarities)
      //     similaritiesArr.push(similarities)
      //     // 对相似度进行排名，选择与输入数据最相似的句子或文章段落作为匹配结果
      //     const topMatchIndex = similaritiesArr.reduce((maxIndex, similarity, index) => similarity > similaritiesArr[maxIndex] ? index : maxIndex, 0)

      //     console.log(topMatchIndex)
      //     const topMatchText = sentences[topMatchIndex]
      //     console.log('最匹配的句子是：', topMatchText)
      //     // console.log('最相似的文本为：', similarText);
      //   })


      //   // const configuration = new Configuration({
      //   //   apiKey:  ,
      //   // });
      //   // const openai = new OpenAIApi(configuration);
      //   // const response = openai.embeddings({
      //   //   model: 'text-embedding-ada-002',
      //   //   input:"text"
      //   // });
      //   // console.log(response)

      //   return
      // }
      this.rows = 1;
      // document.getElementById("textareaMsg").style.height = "26px";
      this.$nextTick(() => {
        this.acqStatus = false
      })
      const dateNow = JCMFormatDate(getNowTime());

      let params = {}

      if (this.settingInfo.openChangePicture) {
        if (this.updateImage == null) {
          this.$nextTick(() => {
            this.acqStatus = true
          });
          this.$message.warning(this.$t('message.edit_picture'))
          return
        } else {
          // 通过验证后，上传文件
          const formData = new FormData();
          formData.append("image", this.updateImage);
          formData.append("prompt", this.inputMsg);
          formData.append("n", this.settingInfo.n);
          formData.append("size", this.settingInfo.size);

          const dateNow = JCMFormatDate(getNowTime());

          let chatMsg = {
            headImg: USER_HEAD_IMG_URL,
            name: USER_NAME,
            time: dateNow,
            msg: this.inputMsg,
            chatType: 0, //信息类型，0文字，1图片
            uid: "jcm", //uid
          };

          this.sendMsg(chatMsg);
          this.inputMsg = "";

          createImageEdit(formData, this.settingInfo.KeyMsg).then(data => {
            for (var imgInfo of data) {
              let imgResMsg = {
                headImg: AI_HEAD_IMG_URL,
                name: this.frinedInfo.name,
                time: JCMFormatDate(getNowTime()),
                msg: imgInfo.url,
                chatType: 1, //信息类型，0文字，1图片
                extend: {
                  imgType: 2, //(1表情，2本地图片)
                },
                uid: this.frinedInfo.id, //uid
              };
              this.sendMsg(imgResMsg);
              this.srcImgList.push(imgInfo.url);
            }
            this.updateImage = null
            this.acqStatus = true
          })
          return
        }
      }

      if (this.inputMsg) {
        let chatMsg = {
          headImg: USER_HEAD_IMG_URL,
          name: USER_NAME,
          time: dateNow,
          msg: this.inputMsg,
          chatType: 0, //信息类型，0文字，1图片
          uid: "jcm", //uid
        };
        this.sendMsg(chatMsg);

        //如果是图片模式则进入待开发不过可用改状态使用
        if (this.settingInfo.openProductionPicture) {
          params.prompt = this.inputMsg,
            params.n = this.settingInfo.n,
            params.size = this.settingInfo.size,
            createImage(params, this.settingInfo.KeyMsg).then(data => {
              for (var imgInfo of data) {
                let imgResMsg = {
                  headImg: AI_HEAD_IMG_URL,
                  name: this.frinedInfo.name,
                  time: JCMFormatDate(getNowTime()),
                  msg: imgInfo.url,
                  chatType: 1, //信息类型，0文字，1图片
                  extend: {
                    imgType: 2, //(1表情，2本地图片)
                  },
                  uid: this.frinedInfo.id, //uid
                };
                this.sendMsg(imgResMsg);
                this.srcImgList.push(imgInfo.url);
              }
              this.acqStatus = true
            })
        } else {
          //如果是文字模式则进入
          params.model = this.frinedInfo.id,
            params.max_tokens = this.settingInfo.chat.MaxTokens,
            params.temperature = this.settingInfo.chat.Temperature,
            params.top_p = this.settingInfo.chat.TopP,
            params.n = this.settingInfo.chat.n,
            params.stream = this.settingInfo.chat.stream,
            params.stop = this.settingInfo.chat.stop,
            params.presence_penalty = this.settingInfo.chat.PresencePenalty,
            params.frequency_penalty = this.settingInfo.chat.FrequencyPenalty

          let chatBeforResMsg = {
            headImg: AI_HEAD_IMG_URL,
            name: this.frinedInfo.name,
            time: JCMFormatDate(getNowTime()),
            msg: "",
            chatType: 0, //信息类型，0文字，1图片
            uid: this.frinedInfo.id, //uid
          };
          if (this.frinedInfo.id === "gpt-3.5-turbo" || this.frinedInfo.id === "gpt-3.5-turbo-0301") {
            this.chatCompletion(params, chatBeforResMsg)
          } else {
            this.completion(params, chatBeforResMsg)
          }
        }
        if (this.storeStatu == 0) {
          this.$emit('personCardSort', this.frinedInfo.id)

        } else if (this.storeStatu == 1) {
          this.$emit('fineTunesCardSort', this.frinedInfo.id)
        }
        this.inputMsg = "";
        // this.$parent.updateMoneyInfo();
      } else {
        this.$nextTick(() => {
          this.acqStatus = true
        });
        this.$message.warning(this.$t('message.msg_empty'))
      }
    },
    async chatCompletion(params, chatBeforResMsg) {
      let textContext = this.inputMsg;
      let itemContent;
      let noUrlNetMessage;
      if (this.settingInfo.openNet) {
        let context = "max_results=" + this.settingInfo.max_results + "&q=" + textContext + "&region=us-en";
        await fetch(
          'https://search.freechatgpt.cc/search?' + context
        ).then(response => response.json())
          .then(
            data => {
              let netMessage = "Web search results:  ";
              noUrlNetMessage = netMessage + "\n\n";
              for (let i = 0; i < data.length; i++) {
                netMessage += "[" + (i + 1) + "] \"" + data[i].body.substring(0, 400) + "\"  ";
                netMessage += "URL:" + data[i].href + "  ";
                noUrlNetMessage += "[" + (i + 1) + "] \"" + data[i].body.substring(0, 400) + "\"     \n\n";
              }
              const date = new Date();
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const formattedDate = `${year}/${month}/${day}`;
              netMessage = netMessage.substring(0, 1500)

              netMessage += "Current date:" + formattedDate + "  ";
              netMessage +=
                "Instructions: Using the provided web search results, write a comprehensive reply to the given query. " +
                "Make sure to cite results using [[number](URL)] notation after the reference. If the provided search " +
                "results refer to multiple subjects with the same name, write separate answers for each subject." +
                "Query: " + textContext +
                "Reply in 中文";
              noUrlNetMessage += " 您的问题: " + textContext;
              itemContent = {};
              itemContent.time = JCMFormatDate(getNowTime());
              itemContent.msg = netMessage;
              itemContent.chatType = 0;
              itemContent.name = "网络";
              itemContent.headImg = "https://i.328888.xyz/2023/04/04/ijlmhJ.png";
              itemContent.uid = this.frinedInfo.id;
              this.chatList.push(itemContent);

              let conversation = this.contextualAssemblyData();

              params.messages = conversation.map(item => {
                return {
                  role: item.speaker === 'user' ? 'user' : 'assistant',
                  content: item.text
                }
              })

              itemContent.msg = noUrlNetMessage;
              this.$nextTick(() => {
                this.acqStatus = true
              });
            });
      } else {
        let conversation = this.contextualAssemblyData();
        params.messages = conversation.map(item => {
          return {
            role: item.speaker === 'user' ? 'user' : 'assistant',
            content: item.text
          }
        })
        params.stream = true
        //新增一个空的消息
        this.sendMsg(chatBeforResMsg);

        const currentResLocation = this.chatList.length - 1
        let _this = this
        try {
          await fetch(
            base.baseUrl + '/v1/chat/completions', {
            method: "POST",
            timeout: 10000,
            body: JSON.stringify({
              ...params
            }),
            headers: {
              Authorization: 'Bearer ' + this.settingInfo.KeyMsg,
              "Content-Type": "application/json"
            },
          }
          ).then(response => {
            this.isAutoScroll = true;
            const reader = response.body.getReader();
            function readStream(reader) {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  return;
                }
                if (!_this.chatList[currentResLocation].reminder) {
                  _this.chatList[currentResLocation].reminder = "";
                }

                let decoded = new TextDecoder().decode(value);
                if (params.stream) {
                  decoded = _this.chatList[currentResLocation].reminder + decoded;
                  let decodedArray = decoded.split("data: ");

                  decodedArray.forEach(decoded => {
                    if (decoded !== "") {
                      if (decoded.trim() === "[DONE]") {
                        return;
                      } else {
                        const response = JSON.parse(decoded).choices[0].delta.content ? JSON.parse(decoded).choices[0].delta.content : "";
                        _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + response
                        _this.scrollBottom();
                      }
                    }
                  });
                  return readStream(reader);
                } else {
                  _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + JSON.parse(decoded).choices[0].message.content
                }

              });
            }
            // _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + ":grinning:"
            readStream(reader);
            this.$nextTick(() => {
              this.acqStatus = true
            });
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    async completion(params, chatBeforResMsg) {
      if (this.settingInfo.chat.suffix !== "") {
        params.suffix = this.settingInfo.chat.suffix  //chat没有
      }
      params.echo = this.settingInfo.chat.echo,  //chat没有
        params.prompt = this.inputMsg
      //新增一个空的消息
      this.sendMsg(chatBeforResMsg);
      const currentResLocation = this.chatList.length - 1
      let _this = this
      try {
        await fetch(
          base.baseUrl + '/v1/completions', {
          method: "POST",
          timeout: 10000,
          body: JSON.stringify({
            ...params
          }),
          headers: {
            Authorization: 'Bearer ' + this.settingInfo.KeyMsg,
            "Content-Type": "application/json"
          },
        }
        ).then(response => {
          if (response.status == 404) {
            this.$message.error(this.$t('message.model_del'))
            this.$nextTick(() => {
              this.acqStatus = true
            });
            return
          }
          const reader = response.body.getReader();

          function readStream(reader) {
            return reader.read().then(({ done, value }) => {
              if (done) {
                return;
              }
              let decodeds = new TextDecoder().decode(value);
              if (params.stream) {
                let decodedArray = decodeds.split("data: ")

                decodedArray.forEach(decoded => {
                  if (decoded !== "") {
                    if (decoded.trim() === "[DONE]") {
                      return;
                    } else {
                      const response = JSON.parse(decoded).choices[0].text;
                      _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + response
                    }
                  }
                });
                return readStream(reader);
              } else {
                _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + JSON.parse(decodeds).choices[0].text
              }
            });
          }
          this.$nextTick(() => {
            this.acqStatus = true
          });
          // _this.chatList[currentResLocation].msg = _this.chatList[currentResLocation].msg + ":grinning:"
          readStream(reader);
        })
      } catch (error) {

      }

    },
    resetUpdate() {
      this.updateImage = null
    },
    onScroll() {
      const scrollDom = this.$refs.chatContent;
      const scrollTop = scrollDom.scrollTop;
      const offsetHeight = scrollDom.offsetHeight;
      const scrollHeight = scrollDom.scrollHeight;
      // 当滚动到底部，设置 isAutoScroll 为 true
      if (scrollTop + offsetHeight === scrollHeight) {
        this.isAutoScroll = true;
      } else {
        // 否则，用户正在手动滑动，设置为 false，停止自动滚动
        this.isAutoScroll = false;
      }
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
        if (!this.isAutoScroll) return; // 如果 isAutoScroll 为 false，不执行滚动方法
        const scrollDom = this.$refs.chatContent;
        animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
      });
    },
    //关闭标签框
    clickEmoji() {
      this.showEmoji = !this.showEmoji;
    },

    //发送表情
    sendEmoji(msg) {
      const dateNow = JCMFormatDate(getNowTime());
      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        msg: msg,
        chatType: 1, //信息类型，0文字，1图片
        extend: {
          imgType: 1, //(1表情，2本地图片)
        },
        uid: "jcm",
      };
      this.sendMsg(chatMsg);
      this.clickEmoji();
    },
    //发送本地图片
    sendImg(e) {
      this.acqStatus = false
      //获取文件
      const file = e.target.files[0];

      // 验证文件类型是否为PNG格式
      if (file.type !== "image/png") {
        this.$message.warning(this.$t('message.valid_png'))
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return;
      }

      // 验证文件大小是否小于4MB
      if (file.size > 4 * 1024 * 1024) {
        this.$message.warning(this.$t('message.less_4M'))
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return;
      }

      if (this.settingInfo.openChangePicture) {
        this.updateImage = file
        this.$message.info(this.$t('message.upload_complete'))
        e.target.files = null;
        this.$nextTick(() => {
          this.acqStatus = true
        });
        return
      }
      // 通过验证后，上传文件
      const formData = new FormData();
      formData.append("image", file);
      formData.append("n", this.settingInfo.n);
      formData.append("size", this.settingInfo.size);

      const dateNow = JCMFormatDate(getNowTime());
      let _this = this;

      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        msg: "",
        chatType: 1, //信息类型，0文字，1图片, 2文件
        extend: {
          imgType: 2, //(1表情，2本地图片)
        },
        uid: "jcm",
      };

      if (!e || !window.FileReader) return; // 看是否支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(file); // 关键一步，在这里转换的
      reader.onloadend = function () {
        chatMsg.msg = this.result; //赋值
        _this.srcImgList.push(chatMsg.msg);
      };
      this.sendMsg(chatMsg);

      createImageVariations(formData, this.settingInfo.KeyMsg).then(data => {
        for (var imgInfo of data) {
          let imgResMsg = {
            headImg: AI_HEAD_IMG_URL,
            name: this.frinedInfo.name,
            time: JCMFormatDate(getNowTime()),
            msg: imgInfo.url,
            chatType: 1, //信息类型，0文字，1图片
            extend: {
              imgType: 2, //(1表情，2本地图片)
            },
            uid: this.frinedInfo.id, //uid
          };
          this.sendMsg(imgResMsg);
          this.srcImgList.push(imgInfo.url);
        }
        this.acqStatus = true
      })
      e.target.files = null;
    },

    //发送文件
    sendFile(e) {
      // let file = e.target.files[0];
      // let reader = new FileReader();
      // reader.readAsText(file);
      // let _this=this
      // reader.onload = function(event) {
      //   let text = event.target.result;
      //   //处理文件数据
      //   const delimiters = ['.', '?', '!', '\n',':',","];
      //   let result = [];
      //   for (let i = 0; i < text.length; i++) {
      //     let current = '';
      //     while (i < text.length && !delimiters.includes(text[i])) {
      //       current += text[i];
      //       i++;
      //     }
      //     // 加入句子，并去除前后空格
      //     if (current.trim()) {
      //       result.push(current.trim());
      //     }
      //   }
      //   const formData = new FormData()
      //   formData.append("model", "text-embedding-ada-002");
      //   formData.append("input", result);
      //   createEmbeddings(formData,_this.settingInfo.KeyMsg).then(data => {
      //     _this.fileArrays = data.data[0]
      //   })
      // };  
      const dateNow = JCMFormatDate(getNowTime());
      let chatMsg = {
        headImg: USER_HEAD_IMG_URL,
        name: USER_NAME,
        time: dateNow,
        msg: "",
        chatType: 2, //信息类型，0文字，1图片, 2文件
        extend: {
          fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
        },
        uid: "jcm",
      };
      let files = e.target.files[0]; //图片文件名
      chatMsg.msg = files;

      if (files) {
        switch (files.type) {
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            chatMsg.extend.fileType = 1;
            break;
          case "application/vnd.ms-excel":
          case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            chatMsg.extend.fileType = 2;
            break;
          case "application/vnd.ms-powerpoint":
          case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            chatMsg.extend.fileType = 3;
            break;
          case "application/pdf":
            chatMsg.extend.fileType = 4;
            break;
          case "application/zip":
          case "application/x-zip-compressed":
            chatMsg.extend.fileType = 5;
            break;
          case "text/plain":
            chatMsg.extend.fileType = 6;
            break;
          default:
            chatMsg.extend.fileType = 0;
        }
        this.sendMsg(chatMsg);
        e.target.files = null;
      }
    }
  },
};
</script>


<style lang="scss" scoped>
.iconfont:hover {
  
   color: rgb(29, 144, 245);
  .block {
    opacity: 1;
  }

}

::v-deep {
  .el-textarea__inner {
    background-color: rgb(66, 70, 86);
    border-radius: 15px;
    border: 2px solid rgb(34, 135, 225);
    /* padding: 10px; */
    box-sizing: border-box;
    transition: 0.2s;
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    /* margin: 0 20px; */
    width: 98%;
    height: 50px !important; 

  }
}

pre {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

.hljs {
  background-color: #211f1f !important;
  border-radius: 20px !important;
  box-shadow: 0px 0px 9px 0px #000000 !important;
  color: #ffff !important;
}

textarea::-webkit-scrollbar {
  width: 3px;
  /* 设置滚动条宽度 */
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(66, 70, 86);
  /* 设置滚动条滑块的背景色 */
  border-radius: 50%;
  /* 设置滑块的圆角 */
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .head-pic {
      float: left;
    }

    .info-detail {
      float: left;
      margin: 5px 20px 0;

      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }

    .other-fun {
      float: right;
      margin-top: 20px;

      span {
        margin-left: 30px;
        cursor: pointer;
      }

      // .icon-tupian {

      // }
      input {
        display: none;
      }
    }
  }


  .textarea {
    &:focus {
      outline: none;
    }
  }

  .botoom {
    width: 100%;
    height: 85vh;
    background-size: 100% 100%;
    // background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;

    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        width: 3px;
        /* 设置滚动条宽度 */
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(66, 70, 86);
        /* 设置滚动条滑块的背景色 */
        border-radius: 50%;
        /* 设置滑块的圆角 */
      }

      .chat-friend {
        width: 100%;
        float: left;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;

        .chat-text {
          float: left;
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 20px 20px 5px;
          background-color: #fff;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-start;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }

          span {
            line-height: 30px;
          }

          span:last-child {
            color: rgb(101, 104, 115);
            margin-left: 10px;
            vertical-align: middle;
          }
        }
      }

      .chat-me {
        width: 100%;
        float: right;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .chat-text {
          float: right;
          max-width: 90%;
          padding: 15px;
          border-radius: 20px 20px 5px 20px;
          background-color: #95ec69;
          color: #000;
          word-break: break-all;
        }

        .chat-img {
          img {
            max-width: 300px;
            max-height: 200px;
            border-radius: 10px;
          }
        }

        .info-time {
          margin: 10px 0;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 10px;
          }

          span {
            line-height: 30px;
          }

          span:first-child {
            color: rgb(101, 104, 115);
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }

    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;

      .boxinput {
        width: 50px;
        height: 50px;
        background-color: rgb(50, 54, 68);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        box-shadow: 0px 0px 5px 0px rgb(0, 136, 255);
        position: relative;
        cursor: pointer;

        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .emoji {
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .luyin {
        color: #fff;
        margin-left: 1.5%;
        font-size: 30px;
        text-align: center;
        transition: 0.3s;
        width: 50px;
        min-width: 50px;
      }

      .inputs {
        width: 95%;
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

      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);

        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}


.line {
  position: relative;
  width: 94%;
  margin-left: 2%;
  height: 2px;
  background: linear-gradient(to right, red, yellow, green);
  animation: shrink-and-expand 2s ease-in-out infinite;

}

.line::before,
.line::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: inherit;
}

.line::before {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  left: 0;
  transform-origin: left;
  animation: shrink-left 2s ease-in-out infinite;
}

.line::after {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  right: 0;
  transform-origin: right;
  animation: shrink-right 2s ease-in-out infinite;
}

@keyframes shrink-and-expand {

  0%,
  100% {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(0);
  }
}

@keyframes shrink-left {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}

@keyframes shrink-right {

  0%,
  50% {
    transform: scaleX(1);
  }

  50.1%,
  100% {
    transform: scaleX(0);
  }
}
</style>
