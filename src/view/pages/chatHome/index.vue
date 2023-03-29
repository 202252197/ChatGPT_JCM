<template>
  <div class="chatHome">
    <div class="chatLeft" style="width:22%" v-show="showPersonList">
      <div class="title" style="text-align: center;">
        <svg t="1679634305168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3634" width="40" height="40">
          <path
            d="M512 960.4c-23.2 0-46.5-6-67.2-17.9L173.5 785.8c-41.4-23.9-67.2-68.5-67.2-116.3V356.1c0-47.8 25.7-92.4 67.2-116.3L444.8 83.1c41.4-23.9 92.9-23.9 134.3 0l271.4 156.7c41.4 23.9 67.2 68.5 67.2 116.3v313.4c0 47.8-25.7 92.4-67.2 116.3L579.2 942.5c-20.7 11.9-44 17.9-67.2 17.9z m0-805.6c-7.7 0-15.4 2-22.3 6L218.3 317.5c-13.8 7.9-22.3 22.7-22.3 38.6v313.4c0 15.9 8.5 30.7 22.3 38.6l271.4 156.7c13.8 7.9 30.8 7.9 44.6 0l271.4-156.7c13.8-7.9 22.3-22.7 22.3-38.6V356.1c0-15.9-8.5-30.7-22.3-38.6L534.3 160.8c-6.9-4-14.6-6-22.3-6z"
            fill="#ffffff" p-id="3635"></path>
          <path
            d="M514 559c-7.8 0-15.5-2-22.4-6L270.9 425.4c-21.5-12.4-28.8-39.8-16.4-61.3 12.4-21.5 39.8-28.8 61.3-16.4l198.1 114.5 189.7-110.9c21.4-12.5 48.9-5.3 61.4 16.1 12.5 21.4 5.3 48.9-16.1 61.4l-212.2 124c-7 4.1-14.9 6.2-22.7 6.2z"
            fill="#ffffff" p-id="3636"></path>
          <path
            d="M512 805.8c-24.8 0-44.9-20.1-44.9-44.9V514.1c0-24.8 20.1-44.9 44.9-44.9s44.9 20.1 44.9 44.9V761c0 24.7-20.1 44.8-44.9 44.8z"
            fill="#ffffff" p-id="3637"></path>
        </svg>
        <h2>OpenAI Manage</h2>
      </div>
      <div class="online-person" style="margin-top: 5%;">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="sessionClick" :class="{ whiteText: cutSetting === 1 }">会话</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="modelClick" :class="{ whiteText: cutSetting === 0 }">模型</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="fineTuningClick" :class="{ whiteText: cutSetting === 2 }">微调</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="setting" style="text-align: center;">
              <span class="" @click="fileClick" :class="{ whiteText: cutSetting === 3 }">文件</span>
            </div>
          </el-col>
        </el-row>
        <div v-show="cutSetting == 0">
          <input class="inputs" v-model="modelSearch" style=" margin-top: 10px;" placeholder="模型名称"/>
          <div class="s-wrapper">
            <div class="personList" v-for="personInfo in personList" :key="personInfo.id"
              @click="clickPerson(personInfo)">
              <PersonCard :personInfo="personInfo" :pcCurrent="pcCurrent"></PersonCard>
            </div>
          </div>
        </div>

        <div v-show="cutSetting == 1">
          <input class="inputs" v-model="sessionSearch" style=" margin-top: 10px;" placeholder="会话名称"/>
          <div class="s-wrapper">
            <div v-for="sessionInfo in sessionList" :key="sessionInfo.id" @click="clickSession(sessionInfo)">
              <Session :sessionInfo="sessionInfo" :pcCurrent="sessionCurrent"></Session>
            </div>
          </div>
        </div>

        <div v-show="cutSetting == 2">
          <input class="inputs" v-model="fineTuningSearch" style=" margin-top: 10px;" placeholder="微调模型名称" />
          <div class="s-wrapper">
            <div class="personList" v-for="fineTuningInfo in fineTuningList" :key="fineTuningInfo.id"
              @click="clickFineTuning(fineTuningInfo)">
              <PersonCard :personInfo="fineTuningInfo" :pcCurrent="ftCurrent"></PersonCard>
            </div>
          </div>
        </div>

        <div v-show="cutSetting == 3">
          <input class="inputs" v-model="fileSearch" style=" margin-top: 10px;" placeholder="文件名称" />
         
          <div class="s-wrapper">
            <div class="personList" v-for="(fileInfo, index) in fileList" :key="index" @click="clickFile(fileInfo)">
              <File :fileInfo="fileInfo" :pcCurrent="fiCurrent"></File>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div class="top-left" @click="toggleLeft">
        <svg t="1679366341860" class="icon" v-show="!showPersonList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
            d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
            fill="#BDD2EF" p-id="5765"></path>
          <path
            d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
            fill="#2867CE" p-id="5766"></path>
        </svg>
        <svg t="1679366707602" class="icon" v-show="showPersonList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
            d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
            fill="#BDD2EF" p-id="7552"></path>
          <path
            d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
            fill="#2867CE" p-id="7553"></path>
        </svg>
      </div>
      <div class="top-right" @click="toggleRight">
        <svg t="1679366707602" class="icon" v-show="!showSetupList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7551" width="30" height="30">
          <path
            d="M514 912c-219.9 0-398.8-178.9-398.8-398.9 0-219.9 178.9-398.8 398.8-398.8s398.8 178.9 398.8 398.8c0 220-178.9 398.9-398.8 398.9z m0-701.5c-166.9 0-302.7 135.8-302.7 302.7S347.1 815.9 514 815.9s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5z"
            fill="#BDD2EF" p-id="7552"></path>
          <path
            d="M402.5 677.3c0-15 5.7-30.1 17.2-41.5l122.6-122.6-122.6-122.6c-22.9-22.9-22.9-60.2 0-83.1 22.9-22.9 60.2-22.9 83.1 0l164.1 164.1c22.9 22.9 22.9 60.2 0 83.1L502.8 718.8c-22.9 22.9-60.2 22.9-83.1 0-11.5-11.4-17.2-26.5-17.2-41.5z"
            fill="#2867CE" p-id="7553"></path>
        </svg>
        <svg t="1679366341860" class="icon" v-show="showSetupList" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="5764" width="30" height="30">
          <path
            d="M912.8 513.2C912.8 733.1 733.9 912 514 912S115.2 733.1 115.2 513.2 294.1 114.3 514 114.3s398.8 179 398.8 398.9z m-701.5 0c0 166.9 135.8 302.7 302.7 302.7s302.7-135.8 302.7-302.7S680.9 210.5 514 210.5 211.3 346.3 211.3 513.2z"
            fill="#BDD2EF" p-id="5765"></path>
          <path
            d="M626.8 345.9c0 15-5.7 30.1-17.2 41.5L487.1 510l122.6 122.6c22.9 22.9 22.9 60.2 0 83.1-22.9 22.9-60.2 22.9-83.1 0L362.4 551.6c-22.9-22.9-22.9-60.2 0-83.1l164.1-164.1c22.9-22.9 60.2-22.9 83.1 0 11.5 11.5 17.2 26.5 17.2 41.5z"
            fill="#2867CE" p-id="5766"></path>
        </svg>
      </div>
      <div v-if="showChatWindow">
        <ChatWindow ref="chatWindow" :frinedInfo="chatWindowInfo" :settingInfo="SettingInfo" :storeStatu="storeStatus"
          @personCardSort="personCardSort"></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <svg t="1679552353056" class="icon iconfont icon-snapchat" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="3488" width="200" height="200">
          <path
            d="M992.33 416.37c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-63.96h63.98c17.66 0 31.98-14.32 31.98-31.98s-14.32-31.98-31.98-31.98h-63.98v-95.94c0.01-8.48-3.36-16.62-9.35-22.62-6-6-14.14-9.37-22.62-9.36h-95.94V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96H544.6V32.61c0-17.67-14.32-31.98-31.98-31.98-17.67 0-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98s-31.98 14.32-31.98 31.98v63.96h-63.96V32.61c0-17.67-14.32-31.98-31.98-31.98S224.8 14.95 224.8 32.61v63.96h-95.94c-8.48 0-16.62 3.36-22.62 9.36s-9.36 14.14-9.36 22.62v95.94H32.92c-17.67 0-31.98 14.32-31.98 31.98s14.32 31.98 31.98 31.98h63.96v63.96H32.92c-17.67 0-31.98 14.32-31.98 31.98 0 17.67 14.32 31.98 31.98 31.98h63.96v63.97H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.65 14.31 31.97 31.97 31.97h63.96v63.98H32.92c-17.66 0-31.97 14.31-31.97 31.97 0 17.66 14.31 31.97 31.97 31.97h63.96v63.98H32.92C15.26 736.18 0.95 750.5 0.95 768.15s14.31 31.97 31.97 31.97h63.96v95.95a31.944 31.944 0 0 0 9.36 22.62c6 5.99 14.14 9.36 22.62 9.35h95.94v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98 17.67 0 31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h63.96v63.98c0 17.66 14.32 31.98 31.98 31.98s31.98-14.32 31.98-31.98v-63.98h95.94c8.48 0.02 16.62-3.35 22.62-9.35s9.37-14.14 9.35-22.62v-95.95h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98V672.2h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.98h63.98c17.65 0 31.97-14.31 31.97-31.97 0-17.66-14.31-31.97-31.97-31.97h-63.98v-63.97h63.98zM864.41 864.1H160.84V160.53h703.57V864.1zM406.82 580.42h79.2l15.48 61.56h67.68l-83.16-267.84h-77.04l-83.16 267.84h65.52l15.48-61.56z m18-72.36c6.84-26.64 14.04-57.96 20.52-86.04h1.44c7.2 27.36 14.04 59.4 21.24 86.04l5.76 22.68h-54.72l5.76-22.68zM697.7 641.98h-64.44V374.14h64.44v267.84z"
            p-id="3489"></path>
        </svg>
      </div>
    </div>
    <div class="chatLeft" v-show="showSetupList">

      <el-card shadow="hover" id="jianbian" style="line-height: 120%;text-align: center;">
        总余额：${{ this.moneryInfo.totalGranted | numFilterReservedTwo }}<br />
        可用余额：${{ this.moneryInfo.totalAvailable | numFilterReservedSix }}<br />
        消耗余额：${{ moneryInfo.totalUsed | numFilterReservedSix }}<br />
      </el-card>

      <div class="online-person">
        <el-row :gutter="20">
          <el-col :span="6"><span class="setting" @click="SettingStatus = 0"
              :class="{ active: SettingStatus === 0 }">对话</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 1"
              :class="{ active: SettingStatus === 1 }">图片</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 2"
              :class="{ active: SettingStatus === 2 }">音频</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 3"
              :class="{ active: SettingStatus === 3 }">微调</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 4"
              :class="{ active: SettingStatus === 4 }">文件</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 5"
              :class="{ active: SettingStatus === 5 }">会话</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 6"
              :class="{ active: SettingStatus === 6 }">识图</span></el-col>
          <el-col :span="6"><span class="setting" @click="SettingStatus = 7"
              :class="{ active: SettingStatus === 7 }">设置</span></el-col>
        </el-row>

        <div class="s-wrapper" style="height: 68vh;">

          <div>
            <input class="inputs" v-model="SettingInfo.KeyMsg" placeholder="请输入OpenAI KEY" type="password"
              style="width: 100%; margin-left: 0px;margin-right: 0px;" />
          </div>
          <!--对话设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 0">
              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定要生成的最大单词数，不能超过2048。" placement="top">
                  <span class="demonstration" style="">max_tokens</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.MaxTokens" :step="1" :min="0" :max="2048"></el-slider>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定生成文本的随机性，范围是0到2，越高表示越多样化和创造性，越低表示越保守和确定性。"
                  placement="top">
                  <span class="demonstration">temperature(0~2)</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.Temperature" :step="0.1" :min="0" :max="2"></el-slider>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定在每个步骤中保留概率最高的单词的比例，范围是0到1，与temperature类似，但更加灵活和稳健。"
                  placement="top">
                  <span class="demonstration" s>top_p(0~1)</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.TopP" :step="0.1" :min="0" :max="1"></el-slider>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定降低重复单词出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                  <span class="demonstration">frequency_penalty(-2~2)</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.FrequencyPenalty" :step="0.1" :min="-2"
                  :max="2"></el-slider>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定降低重复话题出现概率的程度，范围是0到1，越高表示越避免重复。" placement="top">
                  <span class="demonstration">presence_penalty(-2~2)</span>
                </el-tooltip>
                <el-slider class="astrict" v-model="SettingInfo.PresencePenalty" :step="0.1" :min="-2"
                  :max="2"></el-slider>
              </div>
              <!-- <div class="block">
                <el-tooltip class="item" effect="dark" content="开启读文模式" placement="top">
                  <span class="demonstration">开启读文模式</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.readefile" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>
              <div style="height: 30px;"></div> -->
            </div>
          </el-collapse-transition>

          <!--图片设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 1">

              <div class="block">
                <el-tooltip class="item" effect="dark" content="打开之后聊天发送的内容为描述图片的信息" placement="top">
                  <span class="demonstration">产图模式</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.openProductionPicture" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="打开之后先上传图片，然后再输入提示词进行修改。" placement="top">
                  <span class="demonstration">改图模式</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.openChangePicture" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="图片的大小。" placement="top">
                  <span class="demonstration">size</span>
                </el-tooltip>
                <div>
                  <el-select v-model="SettingInfo.size" placeholder="请选择" style="margin-top: 10px;">
                    <el-option v-for="item in imgSizes" :key="item.value" :value="item.value">
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
            <div v-show="SettingStatus == 2">

              <div class="block">
                <el-tooltip class="item" effect="dark" content="语音转文字" placement="top">
                  <span class="demonstration">语音转文字</span>
                </el-tooltip>
                <el-switch v-model="SettingInfo.translateEnglish" :width="defaulWidth"
                  style="margin-left: 15%;"></el-switch>
              </div>

              <div class="block">
                <el-tooltip class="item" effect="dark" content="将一个或多个来源语言的语音或音频文件翻译成目标语言" placement="top">
                  <span class="demonstration">language</span>
                </el-tooltip>
                <div>
                  <el-select v-model="SettingInfo.language" placeholder="请选择" style="margin-top: 10px;">
                    <el-option v-for="item in languages" :key="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>


              <div class="block">
                <el-tooltip class="item" effect="dark" content="指定语音识别的随机性，范围是0到1，越高表示越多样化和创造性，越低表示越保守和确定性。"
                  placement="top">
                  <span class="demonstration">temperature(0~1)</span>
                </el-tooltip>

                <el-slider class="astrict" v-model="SettingInfo.TemperatureAudio" :step="0.1" :min="0"
                  :max="1"></el-slider>
              </div>


            </div>
          </el-collapse-transition>


          <!--微调-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 3">
              <div class="fineTune boxinput" @click="retrieveFine" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                检索微调
              </div>
              <div class="fineTune boxinput" @click="cancelFine" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                取消微调
              </div>
              <div class="fineTune boxinput" @click="hidenCancelFine" v-if="cancelFineStatus"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                隐藏已取消的微调
              </div>
              <div class="fineTune boxinput" @click="showCancelFine" v-else
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                显示已取消的微调
              </div>
              <div class="fineTune boxinput" @click="deleteFine" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                删除微调模型
              </div>
              <div class="fineTune boxinput" @click="showFineSetting = !showFineSetting"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                创建微调
              </div>
              <el-collapse-transition>
                <div v-show="showFineSetting">
                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="包含训练数据的文件ID" placement="top">
                      <span class="demonstration" style="">trainingFile<span style="color: red;">*</span></span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.training_file" placeholder="训练数据的文件ID" />
                  </div>


                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="包含验证数据的文件ID" placement="top">
                      <span class="demonstration" style="">validationFile</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.validation_file" placeholder="验证数据文件ID" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="您可以选择ada、babbage、curie、davinci或者是你自己通过微调训练的模型名称"
                      placement="top">
                      <span class="demonstration" style="">model</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.model" placeholder="模型名称" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="通过调整n_epochs的数量，可以控制模型的训练时期和训练次数，从而影响模型的性能和收敛速度"
                      placement="top">
                      <span class="demonstration" style="">nEpochs</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.n_epochs" placeholder="训练次数" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark"
                      content="较大的 batch_size可以加快模型的训练速度、模型的稳定性和泛化能力，较小的 batch_size 可以减少内存和计算资源的使用、提高模型在测试数据上的性能"
                      placement="top">
                      <span class="demonstration" style="">batchSize</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.batch_sizeStr" placeholder="每批数据的大小" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark"
                      content="可以控制微调训练期间使用的学习率是预训练模型使用的学习率的多少倍。例如，如果您设置为2.0，则微调训练期间使用的学习率将是预训练模型使用的学习率的两倍。"
                      placement="top">
                      <span class="demonstration" style="">learningRateMultiplier</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.learning_rate_multiplier" placeholder="学习率" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="分类任务中的类数,此参数对于多类分类是必需的" placement="top">
                      <span class="demonstration" style="">classificationNClasses</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.classification_n_classes"
                      placeholder="分类任务中的类数" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="二元分类中的正类,需要此参数来生成精度、召回率和 F1 执行二元分类时的指标。"
                      placement="top">
                      <span class="demonstration" style="">classificationPositiveClass</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.classification_positive_class"
                      placeholder="二元分类中的正类" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="将计算指定 F-beta 分数 贝塔值。F-beta 分数是 F-1 分数的概括。 这仅用于二元分类。"
                      placement="top">
                      <span class="demonstration" style="">classificationBetas</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.classification_betas" placeholder="分类贝塔" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="最多 40 个字符的字符串，将添加到微调的模型名称中。" placement="top">
                      <span class="demonstration" style="">suffix</span>
                    </el-tooltip>

                    <input class="weitiao" v-model="SettingInfo.fineTunes.suffix" placeholder="后缀" />
                  </div>

                  <div class="block">
                    <el-tooltip class="item" effect="dark"
                      content="设置较高的值，那么模型在生成文本时会更加注重提示，设置较低的值模型则会更加注重自己的语言模型，生成更自由的文本" placement="top">
                      <span class="demonstration" style="">promptLossWeight</span>
                    </el-tooltip>

                    <el-slider class="astrict" v-model="SettingInfo.fineTunes.prompt_loss_weight" :step="0.01" :min="0.01"
                      :max="1" style="width: 95%;"></el-slider>
                  </div>


                  <div class="block">
                    <el-tooltip class="item" effect="dark" content="用于确定是否在训练过程中计算分类特定的指标，例如准确率和F-1分数,可以在结果文件中查看这些指标."
                      placement="top">
                      <span class="demonstration" style="">computeClassificationMetrics</span>
                    </el-tooltip>
                    <div>
                      <el-switch v-model="SettingInfo.fineTunes.compute_classification_metrics" :width="defaulWidth"
                        style="margin-top: 15px;margin-left: 35%;"></el-switch>
                    </div>
                  </div>

                  <div class="fineTune boxinput" @click="createFine"
                    style="margin-left: 0px;margin-right: 0px;width: 99%; background-color: #409EFF;">
                    创建
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </el-collapse-transition>

          <!--文件-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 4">
              <div class="fineTune boxinput" @click="uploadFile" style="margin-left: 0px;margin-right: 0px;width: 99%;"> 
                <input type="file" ref="fileInput" style="display: none;" @change="onFileChange">
                <svg t="1679458974300" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  p-id="1590" width="30" height="30">
                  <path
                    d="M567.466667 634.325333v234.666667a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333v-234.666667H413.866667a8.533333 8.533333 0 0 1-6.826667-13.653333l110.933333-147.925333a8.533333 8.533333 0 0 1 13.653334 0l110.933333 147.925333a8.533333 8.533333 0 0 1-6.826667 13.653333h-68.266666z"
                    fill="#ffffff" p-id="1591"></path>
                  <path
                    d="M768 725.333333a128 128 0 0 0 38.613333-250.112l-39.850666-12.586666-14.506667-39.253334a256.128 256.128 0 0 0-480.554667 0l-14.464 39.253334-39.850666 12.586666A128.085333 128.085333 0 0 0 256 725.333333a42.666667 42.666667 0 0 1 0 85.333334 213.333333 213.333333 0 0 1-64.341333-416.810667 341.461333 341.461333 0 0 1 640.682666 0A213.418667 213.418667 0 0 1 768 810.666667a42.666667 42.666667 0 0 1 0-85.333334z"
                    fill="#ffffff" p-id="1592"></path>
                </svg>
                上传文件
              </div>
              <div class="fineTune boxinput" @click="deleteOnFile" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                删除文件
              </div>
              <div class="fineTune boxinput" @click="retrieveOnFile"  style="margin-left: 0px;margin-right: 0px;width: 99%;">
                查看文件
              </div>
              <div class="fineTune boxinput" @click="retrieveOnFileContent"  style="margin-left: 0px;margin-right: 0px;width: 99%;">
                查看文件内容
              </div>
            </div>
          </el-collapse-transition>

          <!--会话-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 5">
              <div class="fineTune boxinput" @click="newSession" style="margin-left: 0px;margin-right: 0px;width: 99%;">
                <svg t="1679215361568" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3128" width="25" height="25">
                  <path
                    d="M512.001024 0A512 512 0 0 0 0.001024 512a506.88 506.88 0 0 0 92.16 292.352V972.8a51.2 51.2 0 0 0 51.2 51.2H512.001024a512 512 0 0 0 0-1024z m0 921.6H194.561024v-134.144a51.2 51.2 0 0 0-10.24-30.72A406.016 406.016 0 0 1 102.401024 512a409.6 409.6 0 1 1 409.6 409.6z"
                    fill="#ffffff" p-id="3129"></path>
                  <path
                    d="M716.801024 486.4a51.2 51.2 0 0 0-51.2 51.2 153.6 153.6 0 0 1-307.2 0 51.2 51.2 0 0 0-102.4 0 256 256 0 0 0 512 0 51.2 51.2 0 0 0-51.2-51.2z"
                    fill="#ffffff" p-id="3130"></path>
                </svg>
                创建会话
              </div>
              <div class="fineTune boxinput" @click="clearCurrentContext"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                清空当前会话内容
              </div>
              <div class="fineTune boxinput" @click="exportObjArrToJson"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                导出当前会话内容
              </div>
              <div class="fineTune boxinput" @click="importFromJsonArr"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                导入当前会话内容
                <input type="file" ref="onupdateJosnArr" @change="handleFileUpload" style="display: none;">
              </div>
              <div class="fineTune boxinput" @click="exportObjArrAllToJson"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                导出会话列表
              </div>
              <div class="fineTune boxinput" @click="importFromJsonArrAll"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                导入会话列表
                <input type="file" ref="onupdateJosnArrAll" @change="handleFileUploadAll" style="display: none;">
              </div>
              <div class="fineTune boxinput" @click="clearAllContext"
                style="margin-left: 0px;margin-right: 0px;width: 99%;">
                清除会话列表
              </div>
            </div>
          </el-collapse-transition>

          <!--识图-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 6">

            </div>
          </el-collapse-transition>

          <!--界面设置-->
          <el-collapse-transition>
            <div v-show="SettingStatus == 7">
              <div class="block">
                <el-tooltip class="item" effect="dark" content="将图片的url路径填入此处即可设置聊天背景。" placement="top">
                  <span class="demonstration">聊天背景</span>
                </el-tooltip>
                <input class="inputs" v-model="SettingInfo.contentImageUrl" placeholder="设置聊天界面的背景URL"
                  style="margin-top: 10px; width: 100%; margin-left: 0px;margin-right: 0px;" />
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
import File from "@/components/File.vue";
import ChatWindow from "./chatwindow.vue";
import { AI_HEAD_IMG_URL } from '@/store/mutation-types'
import { getModels, getMoneyInfo, getFineTunesList, getFilesList, uploadFile, createFineTune, cancelFineTune, deleteFineTuneModel,retrieveFineTune,deleteFile,retrieveFile,retrieveFileContent } from "@/api/getData";
import { saveAs } from 'file-saver';
import {  getNowTime, JCMFormatDate,JCMFormatTimestamp } from "@/util/util";
const { Configuration, OpenAIApi } = require("openai");
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
    Session,
    File
  },
  data() {
    return {
      fileSearch:"",
      sessionSearch:"",
      showFineSetting: false,
      cancelFineStatus: true,
      storeStatus: 0,
      //宽度
      defaulWidth: 70,
      //0是聊天设置，1是图片设置
      SettingStatus: 0,
      //0是模型列表，1是会话列表
      cutSetting: 1,
      //余额信息
      moneryInfo: {
        totalGranted: 0,
        totalUsed: 0,
        totalAvailable: 0
      },

      batch_sizeStr: "",
      //全部的设置参数
      SettingInfo: {
        readefile:false,
        inputStatus:true,
        translateEnglish: false,
        openProductionPicture: false,
        openChangePicture: false,
        KeyMsg: process.env.VUE_APP_OPENAI_API_KEY,
        MaxTokens: 1000,
        Temperature: 1,
        TemperatureAudio: 0,
        TopP: 1,
        FrequencyPenalty: 0,
        PresencePenalty: 0,
        n: 1,
        size: "256x256",
        language: "zh",
        contentImageUrl: "",
        fineTunes: {
          training_file: "",
          validation_file: undefined,
          model: "curie",
          learning_rate_multiplier: undefined,
          prompt_loss_weight: 0.01,
          compute_classification_metrics: false,
          classification_n_classes: undefined,
          classification_positive_class: undefined,
          classification_betas: undefined,
          suffix: ""
        }
      },
      //当前点击的文件
      fiCurrent: "",
      //当前点击的模型
      pcCurrent: "",
      //当前点击的会话
      sessionCurrent: "",
      //当前点击的微调模型
      ftCurrent: "",
      //微调搜索数据
      fineTuningSearch: "",
      //模型搜索数据
      modelSearch: "",
      //文件列表
      fileList: [],
      //文件缓存列表
      fineTuningSearch:[],
      //微调模型列表
      fineTuningList: [],
      //微调模型缓存列表
      fineTuningCacheList: [],
      //模型列表
      personList: [],
      //会话列表
      sessionList: [],
      //模型列表缓存
      personListCache: [],
      //是否显示聊天窗口
      showChatWindow: true,
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
      languages: [{
        value: 'zh'
      }, {
        value: 'en'
      }, {
        value: 'fr'
      }, {
        value: 'de'
      }, {
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
    this.chatWindowInfo = {
      img: "",
      name: "ChatGPT-3.5",
      detail: "chatgpt v3.5 所基于的模型",
      lastMsg: "chatgpt v3.5 所基于的模型",
      id: "gpt-3.5-turbo",
      headImg: AI_HEAD_IMG_URL,
      showHeadImg: true
    }
    if (this.SettingInfo.KeyMsg) {
      this.getModelList(this.SettingInfo.KeyMsg);
    }
    // 在Vue实例中添加监听函数
    this.$watch('SettingInfo.KeyMsg', this.watchKeyMsg);
    this.$watch('SettingInfo.contentImageUrl', this.watchContentImageUrl);
    this.$watch('modelSearch', this.watchModelSearch);
    this.$watch('fineTuningSearch', this.watchFineTuningSearch);
    this.$watch('fileSearch', this.watchFileSearch);
    
    this.$watch('SettingInfo.batch_sizeStr', this.batchSizeToInt);
    this.$watch('SettingInfo.openChangePicture', this.watchOpenChangePicture);
    this.$watch('SettingInfo.openProductionPicture', this.watchOpenProductionPicture);
  },
  filters: {
    numFilterReservedSix(value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(4)
    },
    numFilterReservedTwo(value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(2)
    }
  },
  methods: {
    //显示取消过的微调模型
    showCancelFine() {
      this.cancelFineStatus = true
      this.fineTuningList=this.fineTuningCacheList
    },
    hidenCancelFine() {
      this.cancelFineStatus = false
      this.fineTuningList=this.fineTuningCacheList.filter(fineTunin=>fineTunin.fineTunesStatus==="succeeded")
    },
    //导入会话列表触发的方法
    importFromJsonArrAll() {
      this.$refs.onupdateJosnArrAll.click(); // 触发选择文件的弹框
    },
    handleFileUploadAll(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result; // 文件内容
        const parsed = JSON.parse(fileContent); // 转换为数组
        this.sessionList = parsed
      };
      reader.readAsText(file);
    },
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
        this.$refs.chatWindow.assignmentMesList(parsed)
      };
      reader.readAsText(file);
    },
    //导出所有会话到json文件
    exportObjArrAllToJson() {
      let jsonString = JSON.stringify(this.sessionList); // 将数组转为JSON字符串
      let blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
      saveAs(blob, "data.json");
    },
    //导出当前会话到json文件
    exportObjArrToJson() {
      const mesList = this.$refs.chatWindow.getMesList()
      let jsonString = JSON.stringify(mesList); // 将数组转为JSON字符串
      let blob = new Blob([jsonString], { type: "application/json;charset=utf-8" });
      saveAs(blob, "data.json");
    },
    //清除所有的会话内容
    clearAllContext() {
      this.sessionList = []
    },
    //清除当前会话内容
    clearCurrentContext() {
      this.$refs.chatWindow.clearMsgList()
    },
    // 点击切换显示状态
    toggleLeft() {
      console.log("left clicked")
      this.showPersonList = !this.showPersonList;
    },
    toggleRight() {
      console.log("right clicked")
      this.showSetupList = !this.showSetupList;
    },
    //获取模型列表
    getModelList(key) {
      getModels(key).then((modelsRes) => {
        // 提取fineTunesRes集合中所有id属性值
        getFineTunesList(key).then((fineTunesRes) => {
          const fineTunesIds = fineTunesRes.map(item => item.id);
          const models = modelsRes.filter(item => !fineTunesIds.includes(item.id));
          this.personList = models;
          this.personListCache = models;
        })
        // console.log("auto click.")
        // if (this.personList.length > 0) {
        //   this.clickPerson(this.personList[0])
        // }
        this.updateMoneyInfo()
      }).catch(e => {
        this.$message({
          message: "获取模型列表失败哦~",
          type: "error",
        });
      })
    },
    //获取微调模型列表
    getFineTunessList(key) {
      getFineTunesList(key).then((res) => {
        this.fineTuningList = res
        this.fineTuningCacheList = res
      }).catch(e => {
        this.$message({
          message: "获取微调列表失败哦~",
          type: "error",
        });
      })
    },
    //获取文件列表
    getFilessList(key) {
      getFilesList(key).then((res) => {
        this.fileList = res
        this.fileCacheList = res
      }).catch(e => {
        this.$message({
          message: "获取文件列表失败哦~",
          type: "error",
        });
      })
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
          headImg: AI_HEAD_IMG_URL,
          showHeadImg: true
        }
        this.chatWindowInfo = info;
        this.personInfo = info;
      } else {
        this.showPersonList = true;
        this.showSetupList = true;
      };
    },
    watchBatchSizeToInt: function (newVal, oldVal) {
      console.log("测试是是是")
      if (newVal) {
        this.SettingInfo.batchSize = parseInt(newVal)
      }
    },
    // 监听openChangePicture属性的变化
    watchOpenChangePicture: function (newVal, oldVal) {
      if (newVal) {
        this.SettingInfo.openProductionPicture = false
      }
    },
    watchOpenProductionPicture: function (newVal, oldVal) {
      if (newVal) {
        this.SettingInfo.openChangePicture = false
      }
    },
    // 监听contentImageUrl属性的变化
    watchContentImageUrl: function (newVal, oldVal) {
      if (newVal) {
        this.$refs.chatWindow.updateContentImageUrl(newVal)
      } else {
        this.$refs.chatWindow.updateContentImageUrl("https://bpic.51yuansu.com/backgd/cover/00/31/39/5bc8088deeedd.jpg?x-oss-process=image/resize,w_780")
      }
    },
    //监听fineTuningSearch属性的变化
    watchFineTuningSearch:function (newVal, oldVal) {
      if (this.fineTuningList.length !== 0) {
        if(!this.cancelFineStatus){
          this.fineTuningList = this.fineTuningCacheList.filter(fineTunin=>fineTunin.fineTunesStatus==="succeeded").filter(fineTuning => fineTuning.id.includes(newVal))
        }else{
          this.fineTuningList = this.fineTuningCacheList.filter(fineTuning => fineTuning.id.includes(newVal))
        }
      }
      if (newVal == "") {
        if(!this.cancelFineStatus){
          this.fineTuningList = this.fineTuningCacheList.filter(fineTunin=>fineTunin.fineTunesStatus==="succeeded")
        }else{
          this.fineTuningList = this.fineTuningCacheList
        }
      }
    },
    //监听fileSearch属性的变化
    watchFileSearch:function(newVal, oldVal) {
      if (this.fileList.length !== 0) {
        this.fileList = this.fileCacheList.filter(fileList => fileList.id.includes(newVal))
      }
      if (newVal == "") {
        this.fileList = this.fileCacheList
      }
    },
    // 监听modelSearch属性的变化
    watchModelSearch: function (newVal, oldVal) {
      if (this.personList.length !== 0) {
        this.personList = this.personListCache.filter(person => person.id.includes(newVal))
      }
      if (newVal == "") {
        this.personList = this.personListCache
      }
    },
    // 监听KeyMsg属性的变化
    watchKeyMsg: function (newVal, oldVal) {
      //获取模型列表
      getModels(newVal).then((res) => {
        //保存OpenAI key到session中
        this.personList = res;
        this.personListCache = res;
        //获取余额信息
        getMoneyInfo(newVal).then((res) => {
          this.moneryInfo.totalGranted = res.total_granted;
          this.moneryInfo.totalUsed = res.total_used;
          this.moneryInfo.totalAvailable = res.total_available;
        });
      }).catch(e => {
        this.$message({
          message: "获取模型列表失败哦~",
          type: "error",
        });
      })
    },
    // 更新当前余额
    updateMoneyInfo() {
      getMoneyInfo(this.SettingInfo.KeyMsg).then((res) => {
        this.$nextTick(() => {
          this.moneryInfo.totalGranted = res.total_granted;
          this.moneryInfo.totalUsed = res.total_used;
          this.moneryInfo.totalAvailable = res.total_available;
        })
      })
    },
    //创建会话
    newSession() {
      //获取当前会话长度
      const currentLen = this.sessionList.length + 1
      //定义对象
      const obj = {
        "id": currentLen,
        "title": "",
        "dataList": []
      }
      //先获取对话的列表
      const msgList = this.$refs.chatWindow.getMesList();
      if (msgList.length >= 2) {
        if (this.sessionCurrent) {
          this.sessionCurrent = ""
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        } else {
          obj.title = msgList[0].msg
          obj.dataList = msgList;
          let tempSessionList = this.sessionList;
          tempSessionList.push(obj)

          this.sessionList = tempSessionList.reverse();
          this.sessionCurrent = "";
          //清除当前窗口数据
          this.$refs.chatWindow.clearMsgList();
        }
      } else if (msgList.length = 1) {
        //清除当前窗口数据
        this.$refs.chatWindow.clearMsgList();
      }
    },
    //模型列表被点击
    modelClick() {
      this.clearCurrent()
      this.getModelList(this.SettingInfo.KeyMsg)
      //清除被点击的微调对象
      this.fineTuningInfo = {};
      this.SettingStatus = 0
      this.cutSetting = 0
      this.showChatWindow = false;
    },
    //会话列表被点击
    sessionClick() {
      this.clearCurrent()
      this.SettingStatus = 5
      this.cutSetting = 1
      this.chatWindowInfo = {
        img: "",
        name: "ChatGPT-3.5",
        detail: "chatgpt v3.5 所基于的模型",
        lastMsg: "chatgpt v3.5 所基于的模型",
        id: "gpt-3.5-turbo",
        headImg: AI_HEAD_IMG_URL,
        showHeadImg: true
      }
      this.showChatWindow = true;
    },
    //微调模型列表被点击
    fineTuningClick() {
      this.clearCurrent()
      this.SettingStatus = 3;
      this.cutSetting = 2
      this.showChatWindow = false;
      //获取微调模型列表
      this.getFineTunessList(this.SettingInfo.KeyMsg)
    },
    clearCurrent(){
      //清除当前选择的模型微调模型
      this.ftCurrent = ""
      //清除当前选择的模型
      this.pcCurrent = "";
      //清除当前选择的会话
      this.sessionCurrent = "";
      //清除当前选择的文件
      this.fiCurrent= "";
    },
    //文件列表被点击
    fileClick() {
      this.clearCurrent()
      //清除被点击的微调对象
      this.fineTuningInfo = {};
      this.SettingStatus = 4;
      this.cutSetting = 3
      //获取微调模型列表
      this.getFilessList(this.SettingInfo.KeyMsg)
    },
    //上传文件按钮被点击触发的方法
    uploadFile() {
      this.$refs.fileInput.click();
    },
    //文件上传触发的方法
    onFileChange(e) {
      //获取文件
      const file = e.target.files[0];
      // 验证文件类型是否为jsonl格式
      if (!file.name.endsWith('.jsonl')) {
        this.$message({
          message: "请上传一个有效的JSONL文件~",
          type: "warning",
        });
        return;
      }
      // 通过验证后，上传文件
      const formData = new FormData();
      formData.append("file", file);
      formData.append("purpose", "fine-tune");
      uploadFile(formData, this.SettingInfo.KeyMsg).then((res) => {
        this.$copy(res.id, "文件已上传成功,文件ID是" + res.id + ",已经帮您复制啦~")
        //更新文件列表
        this.getFilessList(this.SettingInfo.KeyMsg)
      })
    },
    //检索文件信息
    retrieveOnFile(){
      if (!this.fileInfo || !this.fileInfo.fileId) {
        this.$message.error("只能检索文件哦~")
      } else {
        retrieveFile(this.fileInfo.fileId, this.SettingInfo.KeyMsg).then((res) => {
          let context="`文件ID:`"+res.id+"  \n"
                  +"`文件名称:`"+res.filename+"  \n"
                  +"`文件大小:`"+(res.bytes/1024/1024).toFixed(2)+"MB \n"
                  +"`对象:`"+res.object+"  \n"
                  +"`状态:`"+res.status+"  \n"
                  +"`状态描述`"+res.status_details+"  \n"
                  +"`目的` "+res.purpose+" \n"
                  +"`文件创建时间`"+JCMFormatTimestamp(res.created_at);
          let retrieveFineTuneMsg = {
            headImg: AI_HEAD_IMG_URL,
            name: res.filename,
            time: JCMFormatDate(getNowTime()),
            msg: context,
            chatType: 0, 
            uid: res.id, 
          };
          this.$refs.chatWindow.sendMsg(retrieveFineTuneMsg)
          console.log(res)
        }).catch(e => {
          this.$message.error("文件检索失败了~")
        })
      }
    },
    //检索文件内容
    async retrieveOnFileContent(){
      if (!this.fileInfo || !this.fileInfo.fileId) {
        this.$message.error("只能检索文件内容哦~")
      } else {
        try{
          const configuration = new Configuration({
            apiKey:  this.SettingInfo.KeyMsg,
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.downloadFile(this.fileInfo.fileId);
        }catch(e){
          this.$message.error("OpenAI为了减少滥用，免费帐户将无法下载微调训练的文件~")
        }
      }
    },
    //模型被点击
    clickPerson(info) {
      this.storeStatus = 0;
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
      this.sessionCurrent = info.id;
      this.$refs.chatWindow.assignmentMesList(info.dataList)
    },
    //微调模型被点击
    clickFineTuning(info) {
      this.storeStatus = 1;
      //显示当前聊天窗口
      this.showChatWindow = true;
      //传入当前聊天窗口信息
      this.chatWindowInfo = info;
      //设置当前被点击的对象
      this.fineTuningInfo = info;
      //设置当前选着的微调模型id
      this.ftCurrent = info.id
    },
    //文件被点击
    clickFile(info) {
      this.chatWindowInfo = {
        img: "",
        name: info.id,
        detail: info.detail,
        lastMsg: info.lastMsg,
        id: info.id
      }
      this.fiCurrent=info.fileId
      this.fileInfo=info
      //显示当前聊天窗口
      this.showChatWindow = true;
      
      this.$refs.chatWindow.updateInputsStatus(false)
    },
    //删除文件
    deleteOnFile(){
      if (!this.fileInfo || !this.fileInfo.fileId) {
        this.$message.error("只能删除文件哦~")
      } else {
        deleteFile(this.fileInfo.fileId, this.SettingInfo.KeyMsg).then((res) => {
          this.$message.success("恭喜您删除成功~")
          this.getFilessList(this.SettingInfo.KeyMsg)
        }).catch(e => {
          this.$message.error("文件删除失败了~")
        })
      }
    },
    //创建微调
    createFine() {
      createFineTune(this.SettingInfo.fineTunes, this.SettingInfo.KeyMsg).then((res) => {
        this.$message.success("恭喜您微调创建成功~")
        this.getFineTunessList(this.SettingInfo.KeyMsg)
      }).catch(e => {
        this.$message.error("微调创建失败了...")
      })
    },
    //删除微调
    deleteFine() {
      if (!this.fineTuningInfo || !this.fineTuningInfo.fineTunesId) {
        this.$message.error("只能删除微调中的模型哦~")
      } else {
        deleteFineTuneModel(this.fineTuningInfo.name, this.SettingInfo.KeyMsg).then((res) => {
          this.$message.success("恭喜您微调模型删除成功~")
          console.log(res)
          this.getFineTunessList(this.SettingInfo.KeyMsg)
        }).catch(e => {
          this.$message.error("微调模型删除失败了,模型正在训练中或者中途已取消")
        })
      }
    },
    //取消微调
    cancelFine() {
      if (!this.fineTuningInfo || !this.fineTuningInfo.fineTunesId || this.fineTuningInfo.fineTunesStatus === "succeeded") {
        this.$message.error("只能取消进行训练中的微调模型哦~")
      } else {
        console.log(this.fineTuningInfo.fineTunesId)
        cancelFineTune(this.fineTuningInfo.fineTunesId, this.SettingInfo.KeyMsg).then((res) => {
          this.$message.success("成功取消此模型~")
          this.getFineTunessList(this.SettingInfo.KeyMsg)
        }).catch(e => {
          console.log(e)
          this.$message.error("取消微调模型失败~")
        })
      }
    },
    //检索微调
    retrieveFine(){
      if (!this.fineTuningInfo || !this.fineTuningInfo.fineTunesId) {
        this.$message.error("只能检索的微调模型哦~")
      } else {
        console.log(this.fineTuningInfo.fineTunesId)
        retrieveFineTune(this.fineTuningInfo.fineTunesId, this.SettingInfo.KeyMsg).then((res) => {
          let context="`微调任务ID:`"+res.id+"  \n"
                  +"`任务类型:`"+res.object+"  \n"
                  +"`模型的类型:`"+res.model+"  \n"
                  +"`微调任务的创建时间:`"+JCMFormatTimestamp(res.created_at)+"  \n"
                  +"`微调的事件列表`  \n"
                  +"| 对象 | 日志级别 | 信息 | 创建时间  |\n"
                  +"| :------: | :------: | :------: | :------: |\n";
          res.events.forEach(obj => {
            context += `| ${obj.object} | ${obj.level} | ${obj.message} | ${ JCMFormatTimestamp(obj.created_at) } |\n`;
          });
          context +="\n `微调的模型ID:`"+ res.fine_tuned_model 
                  +"\n\n `微调使用的参数:` \n"
                  +"| 属性 | 设置的值 | \n"
                  +"| :------: | :------: | \n";
          for (let prop in res.hyperparams) {
            if (res.hyperparams.hasOwnProperty(prop)) {
              context += `| ${prop} | ${res.hyperparams[prop]} |\n`;
            }
          }
         context+="\n`用户所属组:`"+res.organization_id;

         if(res.result_files.length==0){
            context+="\n\n`训练结果文件列表:没有`\n\n"
         }else{
            context+="\n\n`训练结果文件列表:`\n\n"
                  +"| ID  | 文件名称 | 文件大小 |   对象 | 状态 |    \n"
                  +"| :------: | :------: | :------: | :------: | :------: | \n";
            res.result_files.forEach(obj => {
              context += `| ${obj.id} | ${obj.filename}  | ${(obj.bytes/1024/1024).toFixed(2)+"MB"} | ${obj.object} | ${obj.status} |  \n`;
            });   
         }
          context+="\n`状态:`"+res.status+"\n";

          if(res.training_files.length==0){
            context+="\n\n`训练的文件列表:没有`\n\n"
          }else{
            context+="\n\n`训练的文件列表:`\n\n"
                  +"| ID  | 文件名称 | 文件大小 |   对象 | 状态 |  \n"
                  +"| :------: | :------: | :------: | :------: | :------: | \n";
            res.training_files.forEach(obj => {
              context += `| ${obj.id} | ${obj.filename}  | ${(obj.bytes/1024/1024).toFixed(2)+"MB"} | ${obj.object} | ${obj.status} |  \n`;
            }); 
          }
          if(res.validation_files.length==0){
            context+="\n\n`验证的文件列表:没有`\n\n"
          }else{
            context+="\n\n`验证的文件列表:`\n\n"
            +"| ID  | 文件名称 | 文件大小 |   对象 | 状态 |  \n"
             +"| :------: | :------: | :------: | :------: | :------: | \n";
            res.validation_files.forEach(obj => {
              context += `| ${obj.id} | ${obj.filename}  | ${(obj.bytes/1024/1024).toFixed(2)+"MB"} | ${obj.object} | ${obj.status} |  \n`;
            }); 
          }
          context+="\n`最后更新时间戳:`"+JCMFormatTimestamp(res.updated_at);
         let retrieveFineTuneMsg = {
            headImg: AI_HEAD_IMG_URL,
            name: res.fine_tuned_model!==null?res.fine_tuned_model:res.id,
            time: JCMFormatDate(getNowTime()),
            msg: context,
            chatType: 0, 
            uid: res.id, 
          };
          this.$refs.chatWindow.sendMsg(retrieveFineTuneMsg)
          console.log(res)
        }).catch(e => {
          console.log(e)
          this.$message.error("检索微调模型失败~")
        })
      }
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
    fineTunesCardSort(id) {
      if (id !== this.fineTuningList[0].id) {
        console.log(id);
        let nowPersonInfo;
        for (let i = 0; i < this.fineTuningList.length; i++) {
          if (this.fineTuningList[i].id == id) {
            nowPersonInfo = this.fineTuningList[i];
            this.fineTuningList.splice(i, 1);
            break;
          }
        }
        this.fineTuningList.unshift(nowPersonInfo);
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
  height: 30px;
  line-height: 50px;
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
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgb(84, 89, 110);

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(91, 219, 239);
  }
}

.weitiao {
  margin-top: 10px;
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
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

  &:focus {
    outline: none;
  }
}

.fineTune {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(66, 70, 86);
  border: 0;
  transition: 0.3s;
  box-shadow: 0px 0px 5px 0px rgb(84, 89, 110);

  &:hover {
    box-shadow: 0px 0px 10px 0px rgb(29, 144, 245);
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

.whiteText {
  color: #fff;
}

::v-deep .el-input__inner {
  background-color: transparent;
  color: #409EFF;
}

.setting {
  margin-left: 0px;
  padding-left: 10px;
  color: rgb(176, 178, 189);
}

.setting.active {
  color: #fff; // 选中后的颜色
}

.setting:hover {
  cursor: pointer;
}

#jianbian {
  background-color: rgb(39, 42, 55);
  border-color: #409EFF;
  color: #fff;
  border-width: 0px;
}

.astrict {
  width: 90%;
}

.settingButton {
  width: 99%;
}

.block {
  margin-top: 5%;

  .demonstration {
    color: aliceblue;
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
        height: 70vh;
        margin-top: 10px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;

        &::-webkit-scrollbar {
          width: 0;
          /* Safari,Chrome 隐藏滚动条 */
          height: 0;
          /* Safari,Chrome 隐藏滚动条 */
          display: none;
          /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;

    .showIcon {
      position: absolute;
      top: calc(50% - 150px);
      /*垂直居中 */
      left: calc(50% - 50px);

      /*水平居中 */
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