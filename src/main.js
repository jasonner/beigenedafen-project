import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'
import './util/rem'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import animated from "animate.css"
import Vant from 'vant';
import 'vant/lib/index.css';
import VueScratchable from 'vue-scratchable';
import wx from 'weixin-jsapi'
Vue.prototype.$isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
      } else {
          return false;
      }
},
Vue.prototype.$wx = wx
Vue.component('vue-scratchable', VueScratchable);
Vue.use(Vant);

Vue.use(animated)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
// import 'lib-flexible/flexible'

Vue.use(ElementUI);
Vue.use(VueRouter,)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://apicore.forhoo.cn/beigene/'  //关键代码
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
