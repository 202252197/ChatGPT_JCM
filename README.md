<a href="https://github.com/202252197">
  <img width=800 src="https://github-profile-trophy.vercel.app/?username=202252197&column=7&theme=gruvbox&no-frame=true"/>
</a>

# OpenAI Manage Web
声明：此项目只发布于 GitHub，基于 Apache2.0 协议，免费且作为开源学习使用。并且不会有任何形式的卖号、付费服务、卖key等行为。谨防受骗。
项目使用Vue2进行开发，给大家提供一个好看的OpenAI web 管理界面，有好的建议和bug欢迎大家提出来，项目会一直开源和代码优化，方便对openai进行入门了解使用，后期会接入后端，实现更丰富的功能。

> 🤭记得点个小星星

## 会话
![webui4.5](https://i.328888.xyz/2023/03/26/iDIKfd.jpeg)
## 模型
![webui4.5](https://i.328888.xyz/2023/03/26/iDIvcN.jpeg)
## 微调模型列表
![webui4.5](https://i.328888.xyz/2023/03/26/iDIsno.jpeg)
## 文件
![webui4.5](https://i.328888.xyz/2023/03/26/iDIEoE.jpeg)


# 部署步骤

## 感觉麻烦的可以直接下载应用程序使用
https://wweu.lanzoub.com/iSKF90rckdyh (蓝奏云下载地址)

## 参考视频
https://www.bilibili.com/video/BV1iL411k7pC  本地和云服务器部署视频


## 本地部署
```
pnpm install
pnpm run serve
pnpm run build
// 或者 
npm install
npm run serve
npm run build

```
 

## OpenAI-Key设置以及自定义设置
### 在.env.serve中添加代码
```
VUE_APP_OPENAI_API_KEY='你的openai api key'
```
### 在/src/store/mutation-types.js

可以在此文件中设置AI头像+用户头像+用户名称


# Docker部署(暂时不是最新的镜像)

## 构建镜像
使用以下命令构建镜像，其中 "jcm-chatgpt" 是您想要给镜像取的名称，"." 表示 Dockerfile 在当前目录中。
```
docker build -t jcm-chatgpt .
```
## 运行镜像
构建完成后，可以使用以下命令运行镜像，其中 "my-container" 是您想要给容器取的名称。该命令会将容器端口 80 映射到本地机器的端口 80。
```
docker run --name my-chatgpt -p 80:80 jcm-chatgpt
```

# 技术栈

|  名称   | 版本  |
|  ----  | ----  |
| vue  | 2.6.14 |
| element-ui  | 2.15.12 |
| NodeJS  | 14+ |
| tauri  | 1.2.3 |

# 项目进度（对标OpenAI官方接口文档）

|  接口   | 描述  | 
|  ----  | ----  |
| List Models  | 获取模型列表 | 
| Completion  | text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001, davinci, curie, babbage, ada模型 |
| Chat Completion  | gpt-4, gpt-4-0314, gpt-4-32k, gpt-4-32k-0314, gpt-3.5-turbo, gpt-3.5-turbo-0301模型 |
| Create edit  | 创建编辑(待..) |
| Create Image  | 根据描述生成图片 |
| Create image edit  | 根据上传的图片结合输入的描述生成图片 |
| Create Image Variation  | 根据上传的图片生成变体图片 |
| Create embeddings    | 创建向量查询(可以实现PDF对话)(待..) |
| Create transcription  | 语音转换为文字 |
| Create translation    | 一个或多个来源语言的语音或音频文件翻译成目标语言 |
| List files    | 文件列表 |
| Upload file    | 上传文件 |
| Delete file    | 删除文件 |
| Retrieve file    | 检索文件信息 |
| Retrieve file content    | 检索文件内容(OpenAI为了防止滥用,只要plus用户才可以使用) |
| Create fine-tune    | 创建微调 |
| List fine-tunes    | 微调列表 |
| Retrieve fine-tune    | 检索微调信息 |
| Cancel fine-tune    | 取消微调 |
| List fine-tune events | 微调事件列表(待..) |
| Delete fine-tune model    | 删除微调模型 |
| Create moderation    | 创建审核 |
| List engines | 引擎列表(已弃用) |
| Retrieve engine | 检索引擎信息(已弃用) |
| 多会话储存和上下文逻辑    | GPT3.5模型支持上下文逻辑,多窗口上下文对话 |
| 导出导入数据   | 支持导出当前会话，导出全部会话，导入当前会话，导出当前会话，清除当前会话，清除全部会话 |
| 聊天截图到本地图片    | 截图功能，有缺陷只能截图当前窗口的图片，建议QQ长截图（暂时取消） |
| 更换聊天窗口背景    | 支持输入背景图片URL，暂时取消并保留此功能，没太大意义（暂时取消） |
| 更换主题    | 待开发 |
| 界面多语言    | 待开发 |
| 增加后端实现更多功能    | 待开发 |
| More    | 待开发 |


# OpenAI交流群
<div>
<img src="https://i.328888.xyz/2023/03/25/iAi2Dd.jpeg" alt="drawing" width="300px" height="300px"/>
<img src="https://i.328888.xyz/2023/03/28/iWUyDz.jpeg" alt="drawing" width="300px" height="300px"/>
</div>

兄弟们如果群满的话加上方V拉进去


# 个人说明
14岁进入it行业，如今19了，时间过得太快了，从当初的html，css到java语言(gecco爬虫、ssm、springboot、dubbo、springCloud和Alibaba...)框架，然后到大数据(Hadoop、spark、flink...)的数据处理框架，学习真的学无止境，非常热爱编程，大家支持一下，你们的支持是我更新最大的动力，点个免费的小星星。
我后期会录制一些大家提出的问题解决方案，热爱分享，热爱技术，更热爱大家。

## Star History
[![Star History Chart](https://api.star-history.com/svg?repos=202252197/ChatGPT_JCM&type=Timeline)](https://star-history.com/#202252197/ChatGPT_JCM&Timeline)

## 使用tauri构建client

# 免责声明
这不是官方的OpenAI产品。这是一个个人项目，与OpenAI没有任何关系。不要起诉我。

![FairyWorld's github stats](https://github-readme-stats.vercel.app/api?username=202252197&show_icons=true&include_all_commits=true&count_private=true&line_height=28&theme=vue-dark)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=202252197&layout=compact&langs_count=12&theme=vue-dark&line_height=28)

[![FairyWorld's github activity graph](https://github-readme-activity-graph.cyclic.app/graph?username=202252197&theme=dracula)](https://github.com//202252197/ChatGPT_JCM)
<p align="left">
<a href="https://github.com/202252197/ChatGPT_JCM" ><img src="https://img.shields.io/github/stars/202252197/ChatGPT_JCM" /></a>
<a href="https://github.com/202252197/ChatGPT_JCM" ><img src="https://img.shields.io/github/last-commit/202252197/ChatGPT_JCM" /></a>
<a href="https://github.com/202252197/ChatGPT_JCM" ><img src="https://img.shields.io/github/release/202252197/ChatGPT_JCM" /></a>
<a href="https://github.com/202252197/ChatGPT_JCM" ><img src="https://img.shields.io/github/downloads/202252197/ChatGPT_JCM/total" /></a>
<a href="https://github.com/202252197/ChatGPT_JCM" ><img src="https://img.shields.io/github/license/202252197/ChatGPT_JCM" /></a>
</p>

![Visitor Count](https://profile-counter.glitch.me/202252197/count.svg)

