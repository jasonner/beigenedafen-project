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

    <!-- 评分标准 -->
    <div class="score-content score-content1">
        <div class="title">
          <span></span>
          学员知识问答（40分）
          <span></span>
        </div>
        <div v-for="(item,index) in coreList1" :key="index">
           <div class="list">
          <div class="list-title">
           {{item.title}}
          </div>
        </div>
        <!-- 滑杆 -->
        <div class="slide-bar-content">
            <span class="valueNum">{{item.value}}</span>
            <div class="small-num">
              <p>1</p>
              <p>最小值</p>
            </div>
            <div class="slide-bar">
                <van-slider @change="sliderChange1(item.value,index)" v-model="item.value" active-color="#efefef" style="border:0.1em solid #f4c0d6;" class="slide" :min="1" :max="10" >
                  <template #button>
                    <div class="custom-button">{{ item.value }}</div>
                  </template>
                </van-slider>
            </div>
            <div class="max-num">
              <p>10</p>
              <p>最大值</p>
            </div>
        </div>
      </div>
    </div>

    <!-- 评分标准 -->
    <div class="score-content">
        <div class="title">
          <span></span>
          导师幻灯演讲-表现力（20分）
          <span></span>
        </div>
        <div v-for="(item,index) in coreList2" :key="index">
           <div class="list">
          <div class="list-title">
           {{item.title}}
          </div>
        </div>
        <!-- 滑杆 -->
        <div class="slide-bar-content">
            <span class="valueNum">{{item.value}}</span>
            <div class="small-num">
              <p>1</p>
              <p>最小值</p>
            </div>
            <div class="slide-bar">
                <van-slider @change="sliderChange2(item.value,index)"  v-model="item.value" active-color="#efefef" style="border:0.1em solid #f4c0d6;" class="slide" :min="1" :max="10" >
                  <template #button>
                    <div class="custom-button">{{ item.value }}</div>
                  </template>
                </van-slider>
            </div>
            <div class="max-num">
              <p>10</p>
              <p>最大值</p>
            </div>
        </div>
      </div>
    </div>
    <!-- 得分总和 -->
    <div class="sum-of-scores">
      <div>得分总和: &nbsp;&nbsp;{{TotalScore}}分</div>
      <div @click="subMitBtn()">提交</div>
    </div>
    <!-- 评分历史 -->
    <div class="scoring-history">
      <img class="left-img" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/h-left.png" alt="" srcset="">
        <button @click="historyFun()">评分历史</button>
      <img class="right-img" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/h-right.png" alt="" srcset="">
    </div>

    <!-- 历史弹窗 -->
    <div v-if="historyShow" class="historyShowBG"></div>
    <div v-if="historyShow" class="historyShow">
      <div class="title">
        评分历史
        <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/text-icon.png" alt="" srcset="">
      </div>
      <div class="tablist">
        <table border="0">
          <tr>
            <th>序号</th>
            <th>导师</th>
            <th>代表</th>
            <th>得分</th>
          </tr>
          <tr v-for="(item,index) in mydafenlog" :key="item.id">
            <td>{{index+1}}</td>
            <td>{{daoshi}}</td>
            <td>{{item.username}}</td>
            <td>{{item.score}}分</td>
          </tr>
        </table>
        <div class="backBtn" ><button  @click="historyHide()">返&nbsp;&nbsp;&nbsp;&nbsp;回</button></div>
      </div>
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
      coreList0:[],
      coreList1:[{
        title:'5.演讲表达的流畅及生动性（10分）',
        value: 1,
      },{
        title:'6.演讲的精神面貌及感染力（10分）',
        value: 1,
      }],

      coreList2:[{
        title:'7.回答正确率与专业性（10分）',
        value: 1,
      },{
        title:'8.回答与病例有较好的结合（10分）',
        value: 1,
      },{
        title:'9.回答思路是否条理清晰（10分）',
        value: 1,
      },{
        title:'10.回答问题的敏捷程度（10分）',
        value: 1,
      }],
      historyShow:false,
      TotalScore:10,
      TotalScoreList:{
        a1:1,
        a2:1,
        a3:1,
        a4:1,
        a5:1,
        a6:1,
        a7:1,
        a8:1,
        a9:1,
        a10:1,
        changci:'1',
        userid:'',
      },
      mydafenlog:[],
      daoshi:''
    }
  },
  mounted(){
    this.getTotalScoreList(this.$route.query);
  },
  methods:{
    historyFun(){
      let that = this;
      that.axios.get('beigeneqagetxuanshou?changci='+that.TotalScoreList.changci)
      .then(function (res) {
          console.log(res);
          if(res.status == 200 ){
              if(res.data  && res.data.mydafenlog && res.data.mydafenlog.length>0){
                that.mydafenlog =  res.data.mydafenlog;
                that.daoshi =  res.data.user.userName
                that.historyShow = true;
              }else{
                that.historyShow = false;
                alert('暂无打分记录');
              }
          }else{
              that.$message({
              message: '服务异常请稍后重试！',
              type: 'warning'
              });
          }
      });
     
    },

    historyHide(){
      this.historyShow = false;
    },

    sliderChange1(val,index){
      switch (index) {
        case 0:
          this.TotalScoreList.a5=val;
          break;
        case 1:
          this.TotalScoreList.a6=val;
          break;
        default:
          break;
      }
      this.getScore();
    },

    sliderChange2(val,index){
       switch (index) {
        case 0:
          this.TotalScoreList.a7=val;
          break;
        case 1:
          this.TotalScoreList.a8=val;
          break;
        case 2:
          this.TotalScoreList.a9=val;
          break;
        case 3:
          this.TotalScoreList.a10=val;
          break;
        default:
          break;
      }
      this.getScore();
    },

    //获取前四道题分数
    getTotalScoreList(query){
      this.TotalScoreList.a1=query.a1;
      this.TotalScoreList.a2=query.a2;
      this.TotalScoreList.a3=query.a3;
      this.TotalScoreList.a4=query.a4;
      this.TotalScoreList.userid=query.userid;
      this.TotalScoreList.changci = query.changci;
      console.log(this.TotalScoreList);
      this.getScore();
    },

    //获取得分总和
    getScore(){
      let a1 = Number(this.TotalScoreList.a1);
      let a2 = Number(this.TotalScoreList.a2);
      let a3 = Number(this.TotalScoreList.a3);
      let a4 = Number(this.TotalScoreList.a4);
      let a5 = Number(this.TotalScoreList.a5);
      let a6 = Number(this.TotalScoreList.a6);
      let a7 = Number(this.TotalScoreList.a7);
      let a8 = Number(this.TotalScoreList.a8);
      let a9 = Number(this.TotalScoreList.a9);
      let a10 = Number(this.TotalScoreList.a10);
      this.TotalScore = a1+a2+a3+a4+a5+a6+a7+a8+a9+a10;
    },

    //提交
    subMitBtn(){
      let promise = this.TotalScoreList;
      let that = this;
      that.axios.post('beigeneqapostdafen', qs.stringify(promise))
      .then(function (res) {
          console.log(res);
          if(res.status == 200 ){
              if(res.data && res.data.s){
                that.$router.push({path:'/index'});
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
    }
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
    border: 0.1em solid #ac2264;
    background: #fff;
    margin-top: 50px;
    padding: 0 33px;
    padding-bottom: 24px;
    box-sizing: border-box;
  }
  .indexPage  .score-content .title{
    width: 443px;
    height: 36px;
    line-height: 36px;
    margin: 0 auto;
    border-radius: 10px;
    background:linear-gradient(#e72876, #c01160);
    color: #fff;
    font-size: 22px;
    margin-top: -18px;
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
      top: 10px;
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
      top: 10px;
      z-index: 100;
    }
  .indexPage  .score-content .list .list-title{
      font-size: 20px;
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
      width: 28px;
      height: 28px;
      position: absolute;
      left: 30px;
      top: -10px;
      background: #ce2369;
      display: inline-block;
      color: #fff;
      border-radius: 5px;
      font-size: 16px;
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
      font-size: 20px;
      color: #464645;
    }
  .indexPage  .slide-bar-content .max-num p{
      font-size: 20px;
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
  .indexPage .sum-of-scores{
    width: 58%;
    margin: 0 auto;
    height: 100px;
    line-height: 100px;
    background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/submitBg.png') center no-repeat;
    background-size: 100% 100%;
    display: flex;
    margin-top: 36px;
  }
  .indexPage .sum-of-scores div{
    flex: 1;
    height: 100px;
    line-height: 90px;
    padding-left: 42px;
    box-sizing: border-box;
  }
  .indexPage .sum-of-scores div:nth-of-type(1){
    color: #fff;
    font-size: 30px;
    flex: 3;
    text-align: left;
  }
  .indexPage .sum-of-scores div:nth-of-type(2){
    flex: 1;
    color: #e12773;
    font-size: 24px;
    line-height: 90px;
    text-align: center;
    padding-right: 30px;
    box-sizing: border-box;
  }
  .scoring-history{
    width: 100%;
    margin-top: 37px;
  }
  .scoring-history img{
    width: 214px;
    vertical-align: middle;
  }
 .scoring-history button{
    width: 170px;
    height: 45px;
    margin: 0 7px;
    margin-bottom: 84px;
    font-size: 24px;
    color: #FFF;
    line-height: 45px;
    border-radius: 20px;
    border: 0.1em solid #e8e8e8;
    box-shadow: #999 10px 10px 10px;
    background-image: linear-gradient(#e72876, #c01160);
 }
 .historyShowBG{
   width: 100%;
   height: 100%;
   background: #000;
   opacity: 0.3;
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   z-index: 1000;
 }
 .historyShow{
   position: fixed;
   top:240px;
   left: 53px;
   bottom: 0;
   right: 0;
   z-index: 1008;
   width: 85%;
   height: 840px;
   background: #fff;
   border-radius: 20px;
   border: 0.1em solid #e3347b;
 }
 .historyShow .title{
   width: 100%;
   height: 94px;
   line-height: 94px;
   font-size: 40px;
   background-image: linear-gradient(#e72876, #c01160);
   position: relative;
   color: #fff;
   border-radius: 20px;
 }
 .historyShow .title img{
   width: 60px;
   position: absolute;
   bottom: -30px;
   right: 56px;
 }
 .tablist{
    width: 100%;
    margin-top: 90px;
    padding: 0 50px;
    box-sizing: border-box;
  }
  .tablist table{
    width: 100%;
    height: 480px;
    overflow: scroll;
  }
 .tablist table tr{
   display: flex;
 }
 .tablist table th{
  flex: 1;
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  border: none;
  border-right: 0.1em solid #e65a94;
  background: #e3347b;
  color: #fff;
 }
  .tablist table th:nth-of-type(1){
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .tablist table th:nth-last-of-type(1){
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
 .tablist table td{
   height: 54px;
   line-height: 54px;
   font-size: 20px;
   flex: 1;
   border-top: 0.1em solid #e3347b;
 }
  .tablist table td{
    margin-top: 28px;
  }
  .backBtn{
    width: 100%;
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
</style>