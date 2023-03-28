# OpenAI Manage  Web
声明：此项目只发布于 GitHub，基于 Apache2.0 协议，免费且作为开源学习使用。并且不会有任何形式的卖号、付费服务、卖key等行为。谨防受骗。
项目使用Vue2进行开发，给大家提供一个好看的OpenAI web 管理界面，有好的建议和bug欢迎大家提出来，星星超过1000个随机送10个openai key给群聊活跃的人。

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

## 下载依赖包
```
npm install
```

## 运行
```
npm run serve
```

## 编译
```
npm run build
```

## OpenAI-Key设置以及自定义设置
在.env.serve中添加代码
```
VUE_APP_OPENAI_API_KEY='你的openai api key'
```
在/src/store/mutation-types.js
可以在此文件中设置AI头像+用户头像+用户名称


# Docker部署

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
| NodeJS  | 14.21.3 |
| npm  | 6.14.18 |

# 项目进度

|  接口   | 描述  | 
|  ----  | ----  |
| List Models  | 获取模型列表 | 
| Chat Completion  | gpt-4, gpt-4-0314, gpt-4-32k, gpt-4-32k-0314, gpt-3.5-turbo, gpt-3.5-turbo-0301模型 |
| Completion  | text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001, davinci, curie, babbage, ada模型 |
| Create Image  | 根据描述生成图片 |
| Create image edit  | 根据上传的图片结合输入的描述生成图片 |
| Create Image Variation  | 根据上传的图片生成变体图片 |
| Create transcription  | 语音转换为文字 |
| Create translation    | 一个或多个来源语言的语音或音频文件翻译成目标语言 |
| Create fine-tune    | 创建微调 |
| List fine-tunes    | 微调列表 |
| Cancel fine-tune    | 取消微调 |
| Delete fine-tune model    | 删除微调模型 |
| List files    | 文件列表 |
| Upload file    | 上传文件 |
| 多会话储存和上下文逻辑    | GPT3.5模型支持上下文逻辑,多窗口上下文对话 |
| 聊天截图到本地图片    | 截图功能，有缺陷只能截图当前窗口的图片，建议QQ长截图 |
| 导出导入数据   | 支持导出当前会话，导出全部会话，导入当前会话，导出当前会话，清除当前会话，清除全部会话 |
| 更换聊天窗口背景    | 支持输入背景图片URL，取消此功能没太大意义 |
| 更换主题    | 待开发 |
| 界面多语言    | 待开发 |
| More    | 待开发 |


# 多模型ChatGPT群5
![webui2.0](https://i.328888.xyz/2023/03/25/iAi2Dd.jpeg)
![webui2.0](https://i.328888.xyz/2023/03/28/iWUyDz.jpeg) 
兄弟们如果群满的话加上方V拉进去


# 个人说明
14岁进入it行业，如今19了，时间过得太快了，从当初的html，css到java语言，然后到大数据的数据处理框架，学习真的学无止境，非常热爱编程，大家支持一下，你们的支持是我更新最大的动力，点个免费的小星星。
我后期会录制一些大家提出的问题解决方案，热爱分享，热爱技术，更热爱大家。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=202252197/ChatGPT_JCM&type=Date)](https://star-history.com/#202252197/ChatGPT_JCM&Date)


# 免责声明
这不是官方的OpenAI产品。这是一个个人项目，与OpenAI没有任何关系。不要起诉我。
