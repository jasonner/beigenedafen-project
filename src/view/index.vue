<template>
  <div class="indexPage">
    <div class="noStart" v-if="NotStartedShow">
      <div class="header-list">
        <div class="left">
          <img
            src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/logo-left.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="right">
          <img
            src="https://oss.sxyweb.com.cn/2021/q/beigene/logo2.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div class="text-login">
        <img
          src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/text-logo.png"
          alt=""
          srcset=""
        />
      </div>

      <!-- 评分暂未开始 -->
      <div class="tipText">
        <!-- <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/left-img.png" alt="" srcset="" class="left"> -->
        <p>{{ tipTextTitle }}</p>
        <p>{{ tipText }}</p>
        <!-- <img class="right" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/right-img.png" alt="" srcset=""> -->
      </div>
      <!-- 退出登录 -->
      <div class="outLogin" v-if="loginOutShow">
        <button @click="outLogin()">退出登录</button>
      </div>
    </div>

    <div class="startPage" v-if="!NotStartedShow">
      <div class="page1">
        <div class="header-list">
          <div class="left">
            <img
              src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/logo-left.png"
              alt=""
              srcset=""
            />
          </div>
          <div class="right">
            <img
              src="https://oss.sxyweb.com.cn/2021/q/beigene/logo2.png"
              alt=""
              srcset=""
            />
          </div>
        </div>

        <div class="text-login">
          <img
            src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/text-logo.png"
            alt=""
            srcset=""
          />
        </div>

        <!--评分表-->
        <div class="score-title">
          <img
            src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/left-img.png"
            alt=""
            srcset=""
            class="left"
          />
          总决赛评分表
          <img
            class="right"
            src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/right-img.png"
            alt=""
            srcset=""
          />
        </div>

        <!-- 参赛队伍 -->
        <div class="participating-team-box">
          <div class="participating-team">
            当前参赛队伍:<span>{{ ranks.daoshi }}</span
            >&nbsp;<span>{{ ranks.userName }}</span>
          </div>
        </div>

        <!-- 评分标准 -->
        <div class="score-content">
          <div class="title" style="background: #ab0353">
            <span></span>
            病例专业度（20分）
            <span></span>
          </div>
          <div v-for="(item, index) in coreList1" :key="index">
            <div class="list">
              <div class="list-title">
                {{ item.title }}
              </div>
            </div>

            <!-- 滑杆 -->
            <div class="slide-bar-content">
              <span class="valueNum">{{ item.value }}</span>
              <div class="small-num">
                <p>0</p>
                <p>最小值</p>
              </div>
              <div class="slide-bar">
                <van-slider
                  @change="sliderChange1(item.value, index)"
                  v-model="item.value"
                  active-color="#ececec"
                  style="border: 0.1em solid #f4c0d6; background: #ab0353"
                  class="slide"
                  :min="0"
                  :max="10"
                >
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
      </div>

      <div class="page2">
        <!-- 评分标准 -->
        <div class="score-content score-content1">
          <div class="title" style="background: #ab0353">
            <span></span>
            导师演讲（30分）
            <span></span>
          </div>
          <div v-for="(item, index) in coreList2" :key="index">
            <div class="list">
              <div class="list-title">
                {{ item.title }}
              </div>
            </div>
            <!-- 滑杆 -->
            <div class="slide-bar-content">
              <span class="valueNum">{{ item.value }}</span>
              <div class="small-num">
                <p>0</p>
                <p>最小值</p>
              </div>
              <div class="slide-bar">
                <van-slider
                  @change="sliderChange2(item.value, index)"
                  v-model="item.value"
                  active-color="#ececec"
                  style="border: 0.1em solid #f4c0d6; background: #ab0353"
                  class="slide"
                  :min="0"
                  :max="10"
                >
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
        <div class="score-content score-content1">
          <div class="title" style="background: #ab0353">
            <span></span>
            学员演讲（30分）
            <span></span>
          </div>
          <div v-for="(item, index) in coreList3" :key="index">
            <div class="list">
              <div class="list-title">
                {{ item.title }}
              </div>
            </div>
            <!-- 滑杆 -->
            <div class="slide-bar-content">
              <span class="valueNum">{{ item.value }}</span>
              <div class="small-num">
                <p>0</p>
                <p>最小值</p>
              </div>
              <div class="slide-bar">
                <van-slider
                  @change="sliderChange3(item.value, index)"
                  v-model="item.value"
                  active-color="#ececec"
                  style="border: 0.1em solid #f4c0d6; background: #bd0e5e"
                  class="slide"
                  :min="0"
                  :max="10"
                >
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
          <div class="score-content score-content1">
          <div class="title" style="background: #ab0353">
            <span></span>
            团队协作（20分）
            <span></span>
          </div>
          <div v-for="(item, index) in coreList4" :key="index">
            <div class="list">
              <div class="list-title">
                {{ item.title }}
              </div>
            </div>
            <!-- 滑杆 -->
            <div class="slide-bar-content">
              <span class="valueNum">{{ item.value }}</span>
              <div class="small-num">
                <p>0</p>
                <p>最小值</p>
              </div>
              <div class="slide-bar">
                <van-slider
                  @change="sliderChange4(item.value, index)"
                  v-model="item.value"
                  active-color="#ececec"
                  style="border: 0.1em solid #f4c0d6; background: #bd0e5e"
                  class="slide"
                  :min="0"
                  :max="10"
                >
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
        <div class="sum-of-scores-box">
          <div class="sum-of-scores">
            <div>得分总和: &nbsp;&nbsp;{{ TotalScore }}分</div>
            <div @click="subMitBtn()">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import { Slider } from "vant";
import Score from "@/view/score.vue";
import { Swipe, SwipeItem } from "vant";
import { Notify } from "vant";
import { Dialog } from 'vant';
Vue.use(Slider);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Notify);
Vue.use(Dialog);
export default {
  data() {
    return {
      coreList1: [
        {
          title: "1.主题明确，结构清晰，内容规范，制作美观，图文并茂（10分）",
          value: 0,
        },
        {
          title: "2.资料完整，鉴别诊断准确清晰，准确提出治疗方案，依据充分（10分）",
          value: 0,
        },
      ],
      coreList2: [
        {
          title: "3.语言表达的流畅及生动性（10分）",
          value: 0,
        },
        {
          title: "4.病例讲解的专业及严谨性（10分）",
          value: 0,
        },
        {
          title: "5.演讲的精神面貌及感染力（10分）",
          value: 0,
        },
      ],

      coreList3: [
        {
          title: "6.语言表达的流畅及生动性（10分）",
          value: 0,
        },
        {
          title: "7.病例讲解的专业及严谨性（10分）",
          value: 0,
        },
        {
          title: "8.演讲的精神面貌及感染力（10分）",
          value: 0,
        }
      ],
      coreList4: [
        {
          title: "9.导师、学员演讲内容比例适中（10分）",
          value: 0,
        },
        {
          title: "10.导师、学员演讲过程配合默契（10分）",
          value: 0,
        }
      ],
      tipTextTitle: "",
      tipText: "",
      timer1: null,
      NotStartedShow: true,
      loginOutShow: false,
      changci: "1",
      TotalScore: 0,
      historyShow: false,
      TotalScoreList: {
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0,
        a5: 0,
        a6: 0,
        a7: 0,
        a8: 0,
        a9: 0,
        a10: 0,
        changci: "1",
        userid: "",
      },
      ranks: {
        id:'',
        daoshi:'',
        userName:''
      }, //代表队伍
    };
  },
  components: {
    Score,
  },
  mounted() {
    var query = this.$route.query;
    if (this.changci && this.changci != "") {
      this.changci = query.changci;
    };
    if(query.openstatus && query.openstatus =='1'){
      this.ranks.id = query.id;
      this.ranks.daoshi = query.daoshi;
      this.ranks.userName = query.userName;
      this.NotStartedShow = false;
      this.NotStartedShow = false;
      this.loginOutShow = false;
    }else{
      this.getUserXuanshou();
    };
    
  },
  methods: {
    //获取选手信息
    getUserXuanshou() {
      let that = this;
      that.axios
        .get("beigeneqagetxuanshou?changci=" + that.changci)
        .then(function (res) {
          //console.log(res.data);
          if (res.status == 200) {
            if (res.data && res.data.user) {
              if (res.data.user.status === 0) {
                //表示待审核
                that.tipText = "您的信息正在审核";
                that.NotStartedShow = true;
                if (that.timer1) {
                  clearInterval(that.timer1);
                }
                that.timer1 = setInterval(() => {
                  that.getUserXuanshou();
                }, 3000);
                that.loginOutShow = false;
              } else if (res.data.user.status === 2) {
                //表示审核失败
                that.tipText = "您的信息审核失败";
                that.NotStartedShow = true;
                if (that.timer1) {
                  clearInterval(that.timer1);
                }
                that.loginOutShow = true;
              } else if (res.data.user.status === 1) {
                //审核成功进行下一步
                if (res.data.xuanshou) {
                  //显示打分页面
                  //TODO
                  if (res.data.xuanshou.userdafen > 0) {
                    //表示已打过分数
                    that.tipTextTitle = "打分成功";
                    that.tipText = "请等待主持人提示";
                    that.NotStartedShow = true;
                    if (that.timer1) {
                      clearInterval(that.timer1);
                    };
                    // that.timer1 = setInterval(() => {
                    //   that.getUserXuanshou();
                    // }, 3000);
                    setTimeout(() => {
                      that.$router.push({path:'/teamList',query:{changci:that.changci}});
                    }, 3000);
                  } else {
                    if (that.timer1) {
                      clearInterval(that.timer1);
                    };
                    that.ranks = res.data.xuanshou;
                    that.$router.push({path:'/teamList',query:{changci:that.changci}});
                  }
                } else if (!res.data.xuanshou) {
                  //轮训当前接口
                  //TODO
                  that.tipTextTitle = "评分尚未开始";
                  that.tipText = "请您耐心等待"
                  that.NotStartedShow = true;
                  if (that.timer1) {
                    clearInterval(that.timer1);
                  };
                  that.timer1 = setInterval(() => {
                    that.getUserXuanshou();
                  }, 3000);
                }
              }
            }else {
              //console.log("暂无数据");
              that.tipTextTitle = "评分暂未开始";
              that.tipText = "请您耐心等待";
              that.NotStartedShow = false;//TODO
              if (that.timer1) {
                clearInterval(that.timer1);
              };
              that.timer1 = setInterval(() => {
                that.getUserXuanshou();
              }, 3000);
            }
          } else {
            that.$message({
              message: "服务异常请稍后重试！",
              type: "warning",
            });
          }
        });
    },
    //滑杆取值1-2
    sliderChange1(val, index) {
      console.log(index);
      console.log(val);
      switch (index) {
        case 0:
          this.TotalScoreList.a1 = val;
          break;
        case 1:
          this.TotalScoreList.a2 = val;
          break;
        default:
          break;
      }
      this.getScore();
    },
    //滑杆取值3-5
    sliderChange2(val, index) {
      console.log(index);
      console.log(val);
      switch (index) {
        case 0:
          this.TotalScoreList.a3 = val;
          break;
        case 1:
          this.TotalScoreList.a4 = val;
          break;
        case 2:
          this.TotalScoreList.a5 = val;
          break;
        default:
          break;
      }
      this.getScore();
    },

    //滑杆取值6-8
    sliderChange3(val, index) {
      console.log(index);
      console.log(val);
      switch (index) {
        case 0:
          this.TotalScoreList.a6 = val;
          break;
        case 1:
          this.TotalScoreList.a7 = val;
          break;
        case 2:
          this.TotalScoreList.a8 = val;
          break;
        default:
          break;
      }
      this.getScore();
    },
    // 滑杆取值9-10
    sliderChange4(val,index) {
      console.log(index);
      console.log(val);
      switch (index) {
          case 0:
            this.TotalScoreList.a9 = val;
            break;
          case 1:
            this.TotalScoreList.a10 = val;
            break;
          default:
            break;
        }
        this.getScore();
    },
    //获取得分总和
    getScore() {
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
      this.TotalScore = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    },

    //提交
    subMitBtn() {
      this.TotalScoreList.changci = this.changci;
      this.TotalScoreList.userid = this.ranks.id;
      let promise = this.TotalScoreList;
      let that = this;
      that.axios.post("beigeneqapostdafen", qs.stringify(promise))
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            if (res.data && res.data.s) {
              Dialog.alert({
                message: '提交成功',
              }).then(() => {
                // on close
                that.$router.push({path:'/teamList',query:{changci:that.changci}});
              });
            } else {
              that.$message.error(res.data.msg);
            }
          } else {
            that.$message({
              message: "服务异常请稍后重试！",
              type: "warning",
            });
          }
        });
    },

    //退出登录
    outLogin() {
      let changci = sessionStorage.getItem("changci");
      window.location.href = "beigeneqalogoff?changci=" + changci;
    },
  },

  destroyed() {
    if (this.timer1) {
      clearInterval(this.timer1);
    }
  },
};
</script>
<style scoped>
.indexPage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.noStart {
  width: 100%;
  min-height: 100%;
  background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/logoBackground.png")
    center no-repeat;
  background-size: 100% 100%;
}
.startPage{
  width: 100%;
  min-height: 100%;
  background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/indexPage-bg.png")
  center no-repeat;
  background-size: 100% 100%;
}
.indexPage .page1 {
  width: 100%;
  /* background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/indexBg.png")
    center no-repeat; */
  min-height: 100%;
  background-size: 100% 100%;
}
.indexPage .page2 {
  width: 100%;
  /* background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/indexBg.png")
    center no-repeat; */
  min-height: 100%;
  background-size: 100% 100%;
}
.indexPage .header-list {
  width: 100%;
  display: flex;
}
.indexPage .header-list .left img {
  width: 146px;
  margin-top: 24px;
  margin-left: 40px;
}
.indexPage .header-list div {
  flex: 1;
}
.indexPage .header-list .left {
  text-align: left;
}
.indexPage .header-list .right {
  text-align: right;
}
.indexPage .header-list .right img {
  width: 186px;
  margin-top: 40px;
  margin-right: 40px;
}
.indexPage .text-login {
  width: 100%;
  text-align: center;
}
.indexPage .text-login img {
  width: 488px;
  margin-top: 0px;
}
.indexPage .score-title {
  width: 100%;
  text-align: center;
  font-size: 52px;
  font-weight: 900;
  color: #9f004c;
  font-style: oblique;
}
.indexPage .score-title img {
  width: 133px;
  vertical-align: middle;
  margin: 0 8px;
}
.indexPage .tipText {
  width: 100%;
  text-align: center;
  margin-top: 80px;
}
.indexPage .tipText p {
  font-size: 52px;
  font-weight: 900;
  color: #999;
}
.indexPage .tipText img {
  width: 133px;
  vertical-align: middle;
  margin: 0 8px;
}
.indexPage .participating-team-box {
  width: 100%;
  margin-top: 30px;
}
.indexPage .participating-team {
  width: 73%;
  font-size: 28px;
  margin: 0 auto;
  background: #fff;
  border-radius: 40px;
  border: 0.1em solid #9f004c;
  font-style: oblique;
  padding: 10px 30px;
  color: #ac2264;
}
.indexPage .participating-team span {
  color: #000;
}
.indexPage .participating-team span {
  margin: 0 10px;
}
.indexPage .score-content {
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
.indexPage .score-content .title {
  width: 443px;
  height: 54px;
  line-height: 54px;
  margin: 0 auto;
  border-radius: 10px;
  background: linear-gradient(#e72876, #c01160);
  color: #fff;
  font-size: 28px;
  margin-top: -28px;
  position: relative;
  z-index: 1000;
}
.indexPage .score-content .title span:nth-of-type(1) {
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
.indexPage .score-content .title span:nth-of-type(2) {
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
.indexPage .score-content .list .list-title {
  font-size: 24px;
  color: #464645;
  text-align: left;
  margin-top: 30px;
}
.indexPage .slide-bar-content {
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
.indexPage .valueNum {
  min-width: 28px;
  box-sizing: border-box;
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
.indexPage .slide-bar-content .small-num p:nth-of-type(1) {
  margin-top: 20px;
}
.indexPage .slide-bar-content .max-num p:nth-of-type(1) {
  margin-top: 20px;
}
.indexPage .slide-bar-content .small-num p {
  font-size: 20px;
  color: #464645;
}
.indexPage .slide-bar-content .max-num p {
  font-size: 20px;
  color: #464645;
}
.indexPage .slide-bar {
  flex: 2;
  height: 44px;
  line-height: 44px;
  border-radius: 40px;
  padding-top: 27px;
  margin: 0 14px;
  box-sizing: border-box;
}
.indexPage .slide {
  box-shadow: #beafb5 5px 5px 5px;
}
.indexPage .custom-button {
  width: 68px;
  height: 68px;
  border-radius: 100%;
  color: #000;
  font-size: 28px;
  line-height: 68px;
  text-align: center;
  background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/bthBg.png") center
    no-repeat;
  background-size: 100% 100%;
}
.indexPage .van-slider {
  width: 90%;
  box-sizing: border-box;
  margin: 0 auto;
  height: 42px;
  background-image: linear-gradient(#e72876, #c01160);
  border: 0.5em solid #ececec;
}

.indexPage .footer {
  width: 100%;
}
.indexPage .footer img {
  width: 60px;
  margin-top: 40px;
  margin-bottom: 58px;
  animation: bounce-down 1s linear infinite;
  animation: bounce-down 1s linear infinite;
}
@keyframes bounce-down {
  25% {
    transform: translateY(-28px);
    opacity: 0.1;
  }
  50% {
    transform: translateY(0);
    opacity: 0.3;
  }
  75% {
    transform: translateY(28px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.indexPage .outLogin {
  width: 100%;
  margin-top: 204px;
}
.indexPage .outLogin button {
  width: 170px;
  height: 45px;
  margin: 0 7px;
  margin-bottom: 84px;
  font-size: 24px;
  color: #fff;
  border-radius: 20px;
  border: 0.1em solid #e8e8e8;
  box-shadow: #999 10px 10px 10px;
  background-image: linear-gradient(#e72876, #c01160);
}
.indexPage .sum-of-scores-box {
  display: flex;
  width: 100%;
  margin-top: 36px;
  padding-bottom: 100px;
  box-sizing: border-box;

}
.indexPage .sum-of-scores {
  width: 58%;
  margin: 0 auto;
  height: 100px;
  line-height: 100px;
  background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/submitBg.png")
    center no-repeat;
  background-size: 100% 100%;
  display: flex;
}
.indexPage  .pingfenlishi {
 width: 100%;
 margin-top: 20px;
 padding-bottom: 80px;
 box-sizing: border-box;
}
.indexPage  .pingfenlishi img{
  width:213px
}
.indexPage .pingfenlishi button {
  width: 162px;
  height: 44px;
  border: none;
  /* background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/pingfBtn.png")
    center no-repeat;
  background-size: 100% 100%; */
  background-image: linear-gradient(#e42775, #b40958);
  border: 0.1em solid #fff;
  box-shadow: #999 10px 10px 10px;
  border-radius: 40px;
  color: #fff;
  font-size: 24px;
  margin: 0 10px;
}
.indexPage .sum-of-scores div {
  flex: 1;
  height: 100px;
  line-height: 90px;
  padding-left: 42px;
  box-sizing: border-box;
}
.indexPage .sum-of-scores div:nth-of-type(1) {
  color: #fff;
  font-size: 30px;
  flex: 3;
  text-align: left;
}
.indexPage .sum-of-scores div:nth-of-type(2) {
  flex: 1;
  color: #e12773;
  font-size: 24px;
  line-height: 90px;
  text-align: center;
  padding-right: 30px;
  box-sizing: border-box;
}

</style>