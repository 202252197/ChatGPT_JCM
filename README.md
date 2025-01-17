

<div align=center>
  <img src="https://i.imgur.com/FSoxQAC.png"   />
</div>
</p>
<h4 align="center">基于Vue2+ElementUI构建的OpenAI系统</h4>
<p align="center">
	<a href="https://github.com/202252197/ChatGPT_JCM"><img src="http://badge.devlive.org/api/badge/github/202252197/ChatGPT_JCM.svg?type=stars&style=minimal"></a>
	<a href="https://github.com/202252197/ChatGPT_JCM"><img src="https://img.shields.io/badge/OpenAI%20Manager-1.0.0-brightgreen.svg"></a>
	<a href="https://github.com/202252197/ChatGPT_JCM/main/LICENSE"><img src="https://img.shields.io/badge/license-BSD_3Clause-brightgreen.svg"></a>
</p>

<div>
声明：免费且作为开源学习使用。
项目使用Vue2进行开发，给大家提供一个方便使用的OpenAI Web 管理界面，有好的建议和bug欢迎大家提出来，项目会一直开源和代码优化，方便对OpenAI API进行入门了解使用，后期会接入后端，实现更丰富的功能。
</div>
<br/>
<div>
  欢迎访问gitcode: <a  href="https://gitcode.com/2022521971/ChatGPT_JCM">https://gitcode.com/2022521971/ChatGPT_JCM</a>
</div>
> 🤭记得点个小星星Starred
## 会话
![webui4.5](https://www.freeimg.cn/i/2023/12/26/658a737bec9c4.jpeg)
## 模型
![webui4.5](https://www.freeimg.cn/i/2023/12/26/658a7358e83b7.jpeg)
## 微调模型
![webui4.5](https://www.freeimg.cn/i/2023/12/26/658a74002da34.jpeg)
## 文件
![webui4.5](https://www.freeimg.cn/i/2023/12/26/658a73b451da1.jpeg)
## 中英文切换
![webui4.5](https://www.freeimg.cn/i/2023/12/26/658a73e2c8945.jpeg)
## 适配手机
<div>
  <img src="https://www.freeimg.cn/i/2023/12/26/658a7444f169c.jpeg" alt="drawing" width="270px"/>
  <img src="https://www.freeimg.cn/i/2023/12/26/658a7456ade1e.jpeg" alt="drawing" width="280px"/>
  <img src="https://www.freeimg.cn/i/2023/12/26/658a74685a4e4.jpeg" alt="drawing" width="270px"/>
</div>

## 参考视频
https://www.bilibili.com/video/BV1BM4y187bp 使用API调用StableDiffusion生成图片简单案例
https://www.bilibili.com/video/BV1iL411k7pC 本地+云服务器 部署此项目视频
https://www.bilibili.com/video/BV1ss4y1d72g 此项目微调使用的简单案例
关注我的B站，持续输出简单的入门案例

# 部署步骤
## 本地部署

```sh
npm install 安装依赖
npm run serve 运行项目
npm run build 构建项目
```

# 在线体验地址 (需要使用OpenAI KEY)

 > https://huggingface.co/spaces/junchenmo/OpenAI-Manager

## OpenAI-Key设置以及自定义设置
#### 只需要在界面输入openai官方key即可
注意：如果是错误的key或者是没有额度的key不会输出任何内容

#### 在/src/store/mutation-types.js

可以在此文件中设置AI头像+用户头像+用户名称

# 技术栈

|  名称   | 版本  |
|  ----  | ----  |
| vue  | 2.6.14 |
| element-ui  | 2.15.12 |
| NodeJS  | 14+ |

# 项目进度（对标OpenAI官方接口文档）

|  接口   | 描述  | 
|  ----  | ----  |
| List Models  | 获取模型列表 | 
| Completion  | text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001, davinci, curie, babbage, ada等模型 |
| Chat Completion  | gpt-4, gpt-4-0314, gpt-4-32k, gpt-4-32k-0314, gpt-3.5-turbo, gpt-3.5-turbo-0301等最新模型 |
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
| 导出导入数据   | 支持导出当前会话，导出全部会话，导入当前会话，导出当前会话，清除当前会话，清除全部会话 |x
| 角色扮演    | 内置多角色prompt |
| 界面多语言    | 支持中英文语言 |

# 贡献者
<div>
  <a href="https://github.com/202252197/ChatGPT_JCM/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=202252197/ChatGPT_JCM" />
  </a>
</div>



# 免责声明
这不是官方的OpenAI产品。这是一个个人项目，与OpenAI没有任何关系。不要起诉我。


![Visitor Count](https://profile-counter.glitch.me/202252197/count.svg)

