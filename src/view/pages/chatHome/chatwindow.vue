<template>
  <div class="chat-window">
    <div class="top" >
      <el-row>
 
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
            <label @click="sc" >
              <span class="iconfont icon-snapchat"></span>
            </label>
            <label for="docFile">
              <span class="iconfont icon-wenjian"></span>
            </label>
            <label for="imgFile">
              <span class="iconfont icon-tupian"></span>
            </label>
            <input
              type="file"
              name=""
              id="imgFile"
              @change="sendImg"
              accept="image/*"
            />
            <input
              type="file"
              name=""
              id="docFile"
              @change="sendFile"
              accept="application/*,text/*"
            />
            <!-- accept="application/*" -->
          </div>
        </el-col>
    </el-row>
   
    </div>
    <div class="botoom"  :style="{ backgroundImage: 'url(' + contentBackImageUrl + ')' }">
      <div class="chat-content" id="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== 'jcm'">
            <div class="chat-text" v-if="item.chatType == 0"  >
             <markdown-it-vue class="md-body"  :content="item.msg.trim()"/></div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
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
              <span style="font-size:16px">{{item.msg}}</span>
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
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
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div>
        <!--输入框-->
        <textarea id="textareaMsg" class="inputs" style="z-index: 9999999999;min-height: 50px;max-height:400px;max-width: 80%;min-width: 45%;"    maxlength="2000" rows="3" dir autocorrect="off" aria-autocomplete="both" spellcheck="false" autocapitalize="off" autocomplete="off" v-model="inputMsg" @keyup.enter="sendText"  ></textarea>
        <!--发送-->
        <div v-if="acqStatus">
          <div class="send boxinput" @click="sendText" >
            <img src="@/assets/img/emoji/rocket.png" alt="" />
          </div>
        </div>
        <!--等待-->
        <div v-else>
          <div class="send boxinput" @click="waitMsg"  >
            <div class="spinner">
              <img src="@/assets/img/shuaxin.png" alt="AI回答中" />
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { animation,getNowTime,JCMFormatDate } from "@/util/util";
import { getChatMsg,getCompletion,getChatCompletion,createImage,createImageEdit,createImageVariations,createTranscription,createTranslation } from "@/api/getData";
import HeadPortrait from "@/components/HeadPortrait";
import Emoji from "@/components/Emoji";
import FileCard from "@/components/FileCard.vue";
import base from "@/api/index";
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import html2canvas from 'html2canvas';
import {AI_HEAD_IMG_URL,USER_HEAD_IMG_URL,USER_NAME} from '@/store/mutation-types'

export default {
  components: {
    HeadPortrait,
    Emoji,
    FileCard,
    MarkdownItVue
  },
  props: {
    settingInfo: Object,
    frinedInfo: Object,
    default() {
      return {};
    },
  },
  watch: {
    frinedInfo() {
      this.getFriendChatMsg();
    },
  },
  data() {
    return {
      //是否显示表情和录音按钮
      buttonStatus:true,
      //是否在接收消息中，如果是则true待发送状态，如果是false则是等待消息转圈状态
      acqStatus: true,
      chatList: [],
      inputMsg: "",
      showEmoji: false,
      friendInfo: {},
      srcImgList: [],
      recording: false,
      audioChunks: [],
      screenshot:"",
      contentBackImageUrl:"https://bpic.51yuansu.com/backgd/cover/00/31/39/5bc8088deeedd.jpg?x-oss-process=image/resize,w_780",
      updateImage:null,
      // 是否隐藏对话框上方介绍（空间局促时隐藏）
      personInfoSpan: [2, 17, 5],
    };
  },
  mounted() {
    this.getFriendChatMsg();
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destoryed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    //监听窗口的变化
    handleResize() {
      if (window.innerWidth <= 700) {
        this.buttonStatus=false
        var textareaMsg = document.getElementById("textareaMsg");
        textareaMsg.style.marginLeft = "0px";
        this.personInfoSpan = [14, 0, 10];
      } else {
        this.buttonStatus=true
        this.personInfoSpan = [2, 17, 5];
      };
    },
    //赋值对话列表
    assignmentMesList(msgList){
     this.chatList=msgList
    },
    //获取对话列表
    getMesList(){
      return this.chatList
    },
    //清除当前对话列表
    clearMsgList(){
      this.chatList=[]
    },
    //更新内容背景图片
    updateContentImageUrl(imgUrl){
      this.contentBackImageUrl=imgUrl
    },
    //截图
    sc(){
      const contentEle = document.querySelector('#chat-content')
      const options = {
        backgroundColor: "rgb(39, 42, 55)" // 设置截图背景颜色
      };
      html2canvas(contentEle,options).then(canvas => {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'screenshot.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        });
      })
    },
    //组装上下文数据
    contextualAssemblyData(){
      const conversation = []
      for(var chat of this.chatList) {
        if(chat.uid=='jcm'){
          let my={'speaker':'user','text':chat.msg}
          conversation.push(my)
        }else if(chat.uid==this.frinedInfo.id){
          let ai={'speaker':'agent','text':chat.msg}
          conversation.push(ai)
        }
      }
      return conversation
    },
    //开始录音
    startRecording(){
      navigator.mediaDevices.getUserMedia({ audio: true }) .then((stream) => {
        this.recorder = new MediaRecorder(stream);
        this.recorder.addEventListener('dataavailable', event => {
          this.audioChunks.push(event.data)
        })
        this.recording = true
        this.recorder.start()
        // 在这里使用录音器
        this.$message({
          message: "开始录音咯！",
        });
      }).catch((error) => {
        this.$message({
          type:"error",
          message: "获取音频流失败啦！",
        });
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
        formData.append('model',"whisper-1")
        formData.append('temperature',this.settingInfo.TemperatureAudio)
        formData.append('response_format',"text")
        
        if(this.settingInfo.translateEnglish){
          createTranslation(formData,this.settingInfo.KeyMsg).then(data =>{
            this.$nextTick(() => {
              this.inputMsg = data;
            });
          })
        }else{
          formData.append('language',this.settingInfo.language)
     
          createTranscription(formData,this.settingInfo.KeyMsg).then(data =>{
          this.$nextTick(() => {
            this.inputMsg = data;
          });
        })
        }
      }
      this.$message({
          message: "结束录音咯！",
      });
    },
    //发送消息时等待
    waitMsg(){
      this.$message({
        message: this.frinedInfo.id+":"+"客观稍等片刻，马上告诉您！~",
      });
    },
    //获取聊天记录
    getFriendChatMsg() {
    //   let params = {
    //     frinedId: this.frinedInfo.id,
    //   };
    //   getChatMsg(params).then((res) => {
    //     this.chatList = res;
    //     this.chatList.forEach((item) => {
    //       if (item.chatType == 2 && item.extend.imgType == 2) {
    //         this.srcImgList.push(item.msg);
    //       }
    //     });
    // this.scrollBottom();
    //   });
    },
    //发送信息
    sendMsg(msgList) {
      this.chatList.push(msgList);
      this.scrollBottom();
    },
   //发送文字信息
   sendText() {
      document.getElementById("textareaMsg").style.height="26px";
      this.$nextTick(() => {
        this.acqStatus=false
      })
      const dateNow=JCMFormatDate(getNowTime());

      let params={}

      if(this.settingInfo.openChangePicture){
        if(this.updateImage==null){
          this.$nextTick(() => {
            this.acqStatus=true
          });
          this.$message({
            message: "编辑图片模式：请您聊天窗口右上角先上传图片，再发送修改的内容~",
            type: "warning",
          });
          return
        }else{
            // 通过验证后，上传文件
            const formData = new FormData();
            formData.append("image", this.updateImage);
            formData.append("prompt", this.inputMsg);
            formData.append("n", this.settingInfo.n);
            formData.append("size", this.settingInfo.size);

            const dateNow=JCMFormatDate(getNowTime());

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
            createImageEdit(formData,this.settingInfo.KeyMsg).then(data =>{
              for(var imgInfo of data) {
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
              this.acqStatus=true
              this.updateImage=null
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
        if(this.settingInfo.openProductionPicture){
            params.prompt=this.inputMsg,
            params.n=this.settingInfo.n,
            params.size=this.settingInfo.size,
          createImage(params,this.settingInfo.KeyMsg).then(data =>{
            for(var imgInfo of data) {
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
            this.acqStatus=true
          })
        }else{
           //如果是文字模式则进入
          params.model=this.frinedInfo.id,
          params.max_tokens=this.settingInfo.MaxTokens,
          params.temperature=this.settingInfo.Temperature,
          params.top_p=this.settingInfo.TopP,
          params.presence_penalty=this.settingInfo.PresencePenalty,
          params.frequency_penalty=this.settingInfo.FrequencyPenalty
          let chatBeforResMsg = {
              headImg: AI_HEAD_IMG_URL,
              name: this.frinedInfo.name,
              time: JCMFormatDate(getNowTime()),
              msg: "",
              chatType: 0, //信息类型，0文字，1图片
              uid: this.frinedInfo.id, //uid
          };
          if(this.frinedInfo.id==="gpt-3.5-turbo" || this.frinedInfo.id==="gpt-3.5-turbo-0301"){
            this.chatCompletion(params,chatBeforResMsg)
          }else{
            this.completion(params,chatBeforResMsg)
          }
        }
        this.$emit('personCardSort', this.frinedInfo.id)
        this.inputMsg = "";
        this.$parent.updateMoneyInfo();
      } else {
        this.$nextTick(() => {
            this.acqStatus=true
          });
        this.$message({
          message: "消息不能为空哦~",
          type: "warning",
        });
      }
    },
    async chatCompletion(params,chatBeforResMsg){
        let conversation=this.contextualAssemblyData();
        params.messages=conversation.map(item => {
            return {
              role: item.speaker === 'user' ? 'user' : 'assistant',
              content: item.text
            }
        })
        params.stream=true
        //新增一个空的消息
        this.sendMsg(chatBeforResMsg);
        const currentResLocation=this.chatList.length-1

        let _this=this
        try {
          await fetch(
              base.baseUrl+'/v1/chat/completions',{
              method: "POST",
              body: JSON.stringify({
                ...params
              }),
              headers: {
                Authorization: 'Bearer ' + this.settingInfo.KeyMsg,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          ).then(response=>{
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
                decoded = _this.chatList[currentResLocation].reminder + decoded;
                let decodedArray = decoded.split("data: "); 

                decodedArray.forEach(decoded => {
                  if(decoded!==""){
                    if(decoded.trim()==="[DONE]"){
                      return;
                    }else{
                      const response = JSON.parse(decoded).choices[0].delta.content?JSON.parse(decoded).choices[0].delta.content:"";
                      _this.chatList[currentResLocation].msg=_this.chatList[currentResLocation].msg+response
                    }
                  }
                });
                return readStream(reader);
              });
            }
            readStream(reader);
          });
    
          this.acqStatus = true;
        } catch (error) {
          console.error(error);
        }
    },
    async completion(params,chatBeforResMsg){
      params.stop="END"
      params.prompt=this.inputMsg
      // A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
      params.stream=true
      //新增一个空的消息
      this.sendMsg(chatBeforResMsg);
      const currentResLocation=this.chatList.length-1
      let _this=this
      try {
        await fetch(
            base.baseUrl+'/v1/completions',{
            method: "POST",
            body: JSON.stringify({
              ...params
            }),
            headers: {
              Authorization: 'Bearer ' + this.settingInfo.KeyMsg,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        ).then(response=>{
          const reader = response.body.getReader();
    
          function readStream(reader) {
            return reader.read().then(({ done, value }) => {
              if (done) {
                return;
              }
              let decodeds = new TextDecoder().decode(value);
      
              let decodedArray = decodeds.split("data: ")

              decodedArray.forEach(decoded => {
                if(decoded!==""){
                  if(decoded.trim()==="[DONE]"){
                    return;
                  }else{
                    const response = JSON.parse(decoded).choices[0].text;
                    _this.chatList[currentResLocation].msg=_this.chatList[currentResLocation].msg+response
                  }
                }
              });
              return readStream(reader);
            });
          }
          readStream(reader);
        });
   
        this.acqStatus = true;
      } catch (error) {
        console.error(error);
      }

    },
    resetUpdate(){
      this.updateImage=null
      alert("更新的文件已重置")
    },
    //获取窗口高度并滚动至最底层
    scrollBottom() {
      this.$nextTick(() => {
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
      const dateNow=JCMFormatDate(getNowTime());
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
      this.acqStatus=false
      //获取文件
      const file = e.target.files[0];

      // 验证文件类型是否为PNG格式
      if (file.type !== "image/png") {
        this.$message({
          message: "请上传一个有效的PNG文件~",
          type: "warning",
        });
        this.acqStatus=true
        return;
      }

      // 验证文件大小是否小于4MB
      if (file.size > 4 * 1024 * 1024) {
        this.$message({
          message: "请上传一个小于4MB的文件~",
          type: "warning",
        });
        this.acqStatus=true
        return;
      }

      if(this.settingInfo.openChangePicture){
        this.updateImage=file
        this.$message({
          message: "图片上传完成啦，请给我提示进行编辑~",
          type: "info",
        });
        e.target.files = null;
        this.acqStatus=true
        return
      }
      // 通过验证后，上传文件
      const formData = new FormData();
      formData.append("image", file);
      formData.append("n", this.settingInfo.n);
      formData.append("size", this.settingInfo.size);

      const dateNow=JCMFormatDate(getNowTime());
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
      reader.onloadend = function() {
        chatMsg.msg = this.result; //赋值
        _this.srcImgList.push(chatMsg.msg);
      };
      this.sendMsg(chatMsg);

      createImageVariations(formData,this.settingInfo.KeyMsg).then(data =>{
        for(var imgInfo of data) {
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
        this.acqStatus=true
      })
      e.target.files = null;
    },
    //发送文件
    sendFile(e) {
      const dateNow=JCMFormatDate(getNowTime());
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
textarea::-webkit-scrollbar {
  width: 3px; /* 设置滚动条宽度 */
}
textarea::-webkit-scrollbar-thumb {
  background-color: rgb(66, 70, 86); /* 设置滚动条滑块的背景色 */
  border-radius: 50%; /* 设置滑块的圆角 */
}
.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {
    margin-bottom: 20px;
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
  .botoom {
    width: 100%;
    height: 74vh;
    background-size:100% 100%;
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
        width: 3px; /* 设置滚动条宽度 */
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgb(66, 70, 86); /* 设置滚动条滑块的背景色 */
        border-radius: 50%; /* 设置滑块的圆角 */
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
          padding: 20px;
          border-radius: 20px 20px 20px 5px;
          background-color: rgb(226 226 226);
          color: #fff;
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
          padding: 20px;
          border-radius: 20px 20px 5px 20px;
          background-color: rgb(29, 144, 245);
          color: #fff;
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
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
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
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
        width: 50px;
      }
      .luyin {
        margin-left: 1.5%;font-size: 30px;text-align: center;
        transition: 0.3s;
        width: 50px;
        &:hover {
          color:#fff;
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
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
</style>
