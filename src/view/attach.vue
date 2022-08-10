<template>
  <div class="indexPage">
    <div class="header-list">
      <div class="left">
          <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/logo-left.png" alt="" srcset="">
      </div>
      <div class="right">
          <img src="https://oss.sxyweb.com.cn/2021/q/beigene/logo2.png" alt="" srcset="">
      </div>
    </div>
    <div class="text-login">
      <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/text-logo.png" alt="" srcset="">
    </div>

    <!-- 提交成功提示 -->
    <div v-if="SubmitShow" class="tipText">
        <!-- <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/left-img.png" alt="" srcset="" class="left"> -->
        <p>{{tipTextTitle}}</p>
        <p>{{tipText}}</p>
        <!-- <img class="right" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/right-img.png" alt="" srcset=""> -->
    </div>
    <!-- 评分标准 -->
    <div class="score-content score-content1" v-if="!SubmitShow">
        <div class="title" style="background:#d71f6d">
          <span></span>
          附加题评分
          <span></span>
        </div>
        <div v-for="(item,index) in fujiaContentList" :key="index">
           <div class="list">
          <div class="list-title">
             <span v-if="item.daoshi">导师:{{item.daoshi}}</span> &nbsp;&nbsp;<span v-if="item.userName">代表:{{item.userName}}</span> 
          </div>
        </div>
        <!-- 滑杆 -->
        <div class="slide-bar-content">
            <span class="valueNum">{{item.fujiascore}}</span>
            <div class="small-num">
              <p>0</p>
              <p>最小值</p>
            </div>
            <div class="slide-bar">
                <van-slider @change="sliderChange1(item.fujiascore,index)" v-model="item.fujiascore" active-color="#efefef" style="border:0.1em solid #f4c0d6;background:#d71f6d" class="slide" :min="0" :max="100" >
                  <template #button>
                    <div class="custom-button">{{ item.fujiascore }}</div>
                  </template>
                </van-slider>
            </div>
            <div class="max-num">
              <p>100</p>
              <p>最大值</p>
            </div>
        </div>
      </div>
    </div>

    <!-- 提交数据 -->
    <div class="backBtn"  v-if="!SubmitShow">
      <button  @click="subMitBtn()">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Slider } from 'vant';
Vue.use(Slider);
import qs from 'qs'
export default {
  data(){
    return{
      SubmitShow:false,
      fujiaContentList:[],
      tipTextTitle:'提交成功',
      tipText:'感谢您的参与',
      historyShow:false,
      TotalScore:10,
      TotalScoreList:{
        a1:1,
        a2:1,
        changci:'',
        userid:'',
      }
    }
  },
  mounted(){
    var query=this.$route.query;
    this.changci = query.changci;
    if(this.changci && this.changci !=''){
      sessionStorage.setItem('changci',this.changci);
    };
    if(sessionStorage.getItem('dafen')){
      this.SubmitShow = true;
    }
    this.getXuanshou();
  },
  methods:{
    getXuanshou(){
      let that = this;
      if(!sessionStorage.getItem('changci')){
        that.TotalScoreList.changci = 1;
      }else{
        that.TotalScoreList.changci = sessionStorage.getItem('changci');
      }
      that.axios.get('beigenelistfujiaxuanshou?changci='+that.TotalScoreList.changci)
      .then(function (res) {
          console.log(res.data);
          if(res.status == 200 ){
            if(res.data && res.data.data && res.data.data.length>0){
              that.fujiaContentList = res.data.data;
            }else{
              console.log('暂无数据！')
              that.SubmitShow = true;
            }
          }else{
              that.$message({
              message: '服务异常请稍后重试！',
              type: 'warning'
              });
          }
      });
      this.historyShow = true;
    },

    historyHide(){
      this.historyShow = false;
    },

    sliderChange1(val,index){
      this.fujiaContentList[index].fujiascore = val;
    },

    //提交
    subMitBtn(){
      let that = this;
      console.log(this.fujiaContentList);
      var scorelist = '';
      this.fujiaContentList.forEach(element => {
        scorelist += element.id+'_'+element.fujiascore+'|'
      });
      console.log(scorelist)
      let promise = {
        'scorelist':scorelist,
        'changci':that.changci
      };
      that.axios.post('beigenepostfujiascore', qs.stringify(promise))
      .then(function (res) {
          console.log(res);
          if(res.status == 200 ){
              if(res.data && res.data.s){
                that.SubmitShow = true;
                sessionStorage.setItem('dafen',true);
              }else{
                  that.$message.error(res.data.msg);
              }
          }else{
              that.$message({
                message: '服务异常请稍后重试！',
                type: 'warning'
              });
          }
      });
    },
  }

}
</script>
<style scoped>
  .indexPage{
    width: 100%;
    min-height: 100%;
    background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/indexBg.png') center no-repeat;
    background-size: 100% 100%;
  }
  .indexPage .header-list{
        width: 100%;
        display: flex;
    }
  .indexPage  .header-list .left img{
        width: 146px;
        margin-top: 24px;
        margin-left: 40px;
    }
  .indexPage  .header-list div{
        flex: 1;
    }
  .indexPage .header-list .left{
        text-align: left;
    }
  .indexPage  .header-list .right{
        text-align: right;
    }
  .indexPage  .header-list .right img{
        width: 186px;
        margin-top: 40px;
        margin-right: 40px;
  }
  .indexPage .score-content{
    width: 83%;
    margin: 0 auto;
    border-radius: 27px;
    border: 0.1em solid #c71563;
    background: #fff;
    margin-top: 50px;
    padding: 0 33px;
    padding-bottom: 24px;
    box-sizing: border-box;
  }
  .indexPage  .text-login{
        width: 100%;
        text-align: center;
    }
  .indexPage  .text-login img{
        width: 488px;
        margin-top: 0px;
  }
  .indexPage  .score-content .title{
    width: 443px;
    height: 54px;
    line-height: 54px;
    margin: 0 auto;
    border-radius: 10px;
    background:linear-gradient(#e72876, #c01160);
    color: #fff;
    font-size: 28px;
    margin-top: -28px;
    position: relative;
    z-index: 100;
  }
  .indexPage  .score-content .title span:nth-of-type(1){
      width: 10px;
      height: 10px;
      background: #e72876;
      display: inline-block;
      border: 0.1em solid #e0e0e0;
      border-radius: 4px;
      position: absolute;
      left: -10px;
      top: 20px;
      z-index: 100;
    }
  .indexPage   .score-content .title span:nth-of-type(2){
      width: 10px;
      height: 10px;
      background: #e72876;
      display: inline-block;
      border: 0.1em solid #e0e0e0;
      border-radius: 4px;
      position: absolute;
      right: -10px;
      top: 20px;
      z-index: 100;
    }
  .indexPage  .score-content .list .list-title{
      font-size: 24px;
      color: #464645;
      text-align: left;
      margin-top: 30px;
    }
  .indexPage  .slide-bar-content{
      width: 98%;
      height: 100px;
      margin: 0 auto;
      background: #fce9f1;
      margin-top: 20px;
      border-radius: 10px;
      display: flex;
      padding: 0 8px;
      position: relative;
    }
  .indexPage  .valueNum{
      min-width: 28px;
      height: 28px;
      position: absolute;
      left: 30px;
      top: -10px;
      background: #ce2369;
      display: inline-block;
      color: #fff;
      border-radius: 5px;
      font-size: 20px;
      line-height: 28px;
      border: 0.1em solid #fff;
    }
  .indexPage  .slide-bar-content .small-num p:nth-of-type(1){
      margin-top: 20px;
    }
  .indexPage  .slide-bar-content .max-num p:nth-of-type(1){
      margin-top: 20px;
    }
  .indexPage  .slide-bar-content .small-num p{
      font-size: 24px;
      color: #464645;
    }
  .indexPage  .slide-bar-content .max-num p{
      font-size: 24px;
      color: #e3347b;
    }
  .indexPage  .slide-bar{
      flex: 2;
      height: 44px;
      line-height: 44px;
      border-radius: 40px;
      padding-top: 27px;
      margin: 0 14px;
      box-sizing: border-box;
    }
  .indexPage  .slide{
      box-shadow: #beafb5 5px 5px 5px;
    }
  .indexPage  .custom-button{
      width: 68px;
      height: 68px;
      border-radius: 100%;
      color: #000;
      font-size: 28px;
      line-height: 68px;
      text-align: center;
      background:url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/bthBg.png') center no-repeat;
      background-size: 100% 100%;
    }
  .indexPage  .van-slider{
      width: 90%;
      box-sizing: border-box;
      margin: 0 auto;
      height: 42px;
      background-image: linear-gradient(#e72876, #c01160);
      border: 0.5em solid #ececec;
  }
  .backBtn{
    width: 100%;
    margin-top: 96px;
    padding-bottom: 96px;
  }
  .backBtn button{
    width: 233px;
    height: 56px;
    background-image: linear-gradient(#e72876, #c01160);
    color: #fff;
    font-size: 24px;
    border-radius: 40px;
    border: 0.2em solid #e82877;
    box-shadow: #999 10px 10px 10px;
  }
    .indexPage  .tipText{
      width: 100%;
      text-align: center;
      margin-top: 180px;
    }
    .tipText p{
      font-size: 52px;
      font-weight: 900;
      color: #999;
    }
  .indexPage  .tipText img{
      width: 133px;
      vertical-align: middle;
      margin: 0 8px;
    } 
</style>