import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl
const apiKey="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";
const statements = ["十五日得半卷诗稿，遇墨迹化魂水中。",
                    "—朝有悟，臻至化境。",
                  "神游千山外，化墨入深潭。",
                "但承青莲有侠志,莫道红尘无剑仙。",
              "—生疏狂尽余欢,半剖肝胆入剑寒。",
            "剑至高危如蜀道，生逢穷途行路难。",
          "江湖风雨染白衫，黑云万里不见天。",
        "宠辱两相忘，所欲随心安。",
      "形神不随尘世改，日月青冥纷纷化入剑中来。",
    "倾尽绿蚁花尽开，问潭底剑仙安在哉?",
  "昨日前事皆可弃，明月松风抱剑来。",
"天地逆旅，过客归人。",
"恩怨随风了无痕。",
"席卷英豪天下来!"]

// 获取模型列表
export const getModels = params => {
  return axios({
    method: 'get',
    baseURL: `${baseUrl}/v1/models`,
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    const modelsObj=[]
    //获取所有的模型
    const models = [...new Set(res.data.data.map(model => model.id))].sort();
    models.forEach(model => {
      let modelObj={
        img: "",
        name: model,
        detail: statements[Math.floor(Math.random() * statements.length)],
        lastMsg: "我是"+model+"模型",
        id: model,
        headImg: require("@/assets/img/head_portrait1.jpg")
      }
      modelsObj.push(modelObj)
    });
    return modelsObj;
  })
}


// 获取模型列表
export const getCompletion = (params,token) => {
  console.log(params)
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/v1/completions`,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: params
  }).then(res => {
    console.log("chatgpt说")
    return res.data.choices[0].text;
  })
}


  // 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}