<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data(){
      return{
        data: {
          title: '立骨巅峰 涵钙一生',
          desc: '第十八届钙素论坛 暨助力世界骨质疏松日',
          imgUrl: 'https://oss.sxyweb.com.cn/2021/wj/jiyu0906/map-logo.png',
          link: 'https://wxcore.forhoo.com.cn/21/wj/Message0906/#/index'
        },
      }
    },
    mounted(){
      if(this.isWeixin()){ // 微信环境下禁用分享
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
          // 通过下面这个API隐藏右上角按钮
          WeixinJSBridge.call('hideOptionMenu');
        });
      }
    },
    methods:{
      isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
      }

    },
  }
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: SourceHanSansCN, SourceHanSansCN-Normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #303030;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

body,p,h1,h2,h3,h4,h5,h6,div,dd,dt,dl,form,kbd,table,ul,li,marquee,hr,blockquote,ol,pre,fieldset,legend,button,input,textarea,th,td{font-size:12px; margin:0; padding:0; font-family: SourceHanSansCN, SourceHanSansCN-Normal, Tahoma, Verdana,  Helvetica, sans-serif;}
address,cite,dfn,em,var{font-style:normal;}
button,input,select,textarea{font-size:100%; cursor:pointer}
input{ cursor:pointer}
table{border-collapse:collapse;border-spacing:0;}
small{font-size:12px;}
ul,ol{list-style:none;}
img{border:0;}
ul{list-style:none;}
.clear{ clear:both;}
a{text-decoration: none; color: #666666; }
a:hover{ color:#000; text-decoration:none}
input[type="submit"],input[type="reset"],input[type="button"],input[type="text"], button { -webkit-appearance: none;border-radius: 0; } 
input,textarea,select,a:focus {
    outline: none;
}
.clearfix:after { visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */  
}
.van-dialog__message{
  font-size: 28px !important;
}
.van-dialog{
  width: 69% !important;
}
.van-dialog__confirm, .van-dialog__confirm:active{
  color: #e3347b !important;

}
.van-button__text{
  font-size: 24px !important;
}
.van-dialog__cancel, .van-dialog__confirm{
  height: 80px !important;
  line-height: 80px !important;
} 
</style>
