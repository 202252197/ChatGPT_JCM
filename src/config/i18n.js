import Vue from "vue";
// 引入i18n插件
import VueI18n from "vue-i18n";
// 引入语言包
import enLocale from "@/lang/en";
import zhLocale from "@/lang/zh-CN";
// 引入element-ui语言包
import elementEn from 'element-ui/lib/locale/lang/en'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'
// 下面不可少的两个配置【参考官网 按需加载里定制 i18n】
import ElementLocale from 'element-ui/lib/locale'
ElementLocale.i18n((key, value) => i18n.t(key, value))

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEn // element-ui语言包
  },
  zh: {
    ...zhLocale,
    ...elementZh
  },
};

// 配置i18n
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "zh", // 从缓存中获取当前的语言类型
  messages,
});

export default i18n;
