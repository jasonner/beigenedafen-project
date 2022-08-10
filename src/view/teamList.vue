<template>
    <div class="teamListPage">
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
        <!-- 团队列表 -->
        <div class="team-list-content">
            <div class="team-list-box-bg"></div>
            <div class="team-list-box">
                <div class="team-box" v-for="(item,index) in teamList" :key="index">
                    <div class="list"  @click="teamChange('0',item)" v-if="item.openstatus ===0 && item.userdafen<=0">
                        <p class="number"><span>{{item.xuhao}}</span></p>
                        <p>{{item.daoshi}}&nbsp;&nbsp;{{item.userName}}</p>
                    </div>
                    <div class="list selectBg1"  @click="teamChange('1',item)" v-if="item.openstatus ===1 && item.userdafen<=0" >
                        <p class="number"><span style="color:#cb1666">{{item.xuhao}}</span></p>
                        <p style="color:#fff">{{item.daoshi}}&nbsp;&nbsp;{{item.userName}}</p>
                    </div>
                    <div class="list selectBg2"  @click="teamChange('2',item)" v-if="item.userdafen>0">
                        <p class="number"><span style="color:#b1cc3d">{{item.xuhao}}</span></p>
                        <p style="color:#fff">{{item.daoshi}}&nbsp;&nbsp;{{item.userName}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 历史评分 -->
        <div class="pingfenlishi">
          <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/h-left.png" alt="" srcset="">
          <button @click="historyFun()">评分历史</button>
          <img src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/h-right.png" alt="" srcset="">
        </div>

        <!-- 历史弹窗 -->
        <div v-if="historyShow" class="historyShowBG"></div>
        <div v-if="historyShow" class="historyShow">
          <div class="title">
            评分历史
            <img
              src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/text-icon.png"
              alt=""
              srcset=""
            />
          </div>
          <div class="tablist">
            <table border="0">
              <tr>
                <th>序号</th>
                <th>导师</th>
                <th>代表</th>
                <th>得分</th>
              </tr>
              <tr v-for="item in mydafenlog" :key="item.id">
                <td>{{ item.xuhao }}</td>
                <td>{{ item.daoshi }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.score }}分</td>
              </tr>
            </table>
            <div class="backBtn">
              <button @click="historyHide()">
                返&nbsp;&nbsp;&nbsp;&nbsp;回
              </button>
            </div>
          </div>
        </div>
    </div>  
</template>
<script>
import Vue from "vue";
import { Notify } from "vant";
Vue.use(Notify);

import { Dialog } from 'vant';
Vue.use(Dialog);
export default {
    data(){
        return{
            changci:'1',
            teamList:[],
            timer1:null,
            historyShow: false,
            mydafenlog: [],
        }
    },
    mounted(){
        var query = this.$route.query;
        console.log(query)
        if (this.changci && this.changci != "") {
            this.changci = query.changci;
        }
        this.getTeamList();
        this.timer1 = setInterval(() => {
            this.getTeamList();
        }, 3000);
    },
    methods:{
        //获取队伍列表
        getTeamList(){
            let that = this;
            console.log(that.changci+'changci');
            that.axios
                .get("beigeneqalistxuanshou?changci=" + that.changci)
                .then(function (res) {
                if (res.status == 200) {
                   if(res.data.xuanshou && res.data.xuanshou.length>0){
                      that.teamList = res.data.xuanshou;
                   }
                } else {
                    Dialog.alert({
                      message: '服务异常请稍后重试！',
                    }).then(() => {
                      // on close
                    });
                }
            });
        },
        //跳转到首页
        teamChange(index,ranks){
          if(index == '0'){
            window.alert = function (name) {
              var iframe = document.createElement("IFRAME");
              iframe.style.display = "none";
              iframe.setAttribute("src", "data:text/plain,");
              document.documentElement.appendChild(iframe);
              window.frames[0].window.alert(name);
              iframe.parentNode.removeChild(iframe);
            };
            Dialog.alert({
              message: '评分尚未开始',
            }).then(() => {
              // on close
            });
          }else{
            this.$router.push({path:'/index',query:{changci:this.changci,openstatus:index,daoshi:ranks.daoshi,id:ranks.id,userName:ranks.userName}});
          }
        },
        //历史记录
        historyHide() {
            this.historyShow = false;
        },
        //获取历史打分
        historyFun() {
            let that = this;
            console.log(that.changci);
            that.axios.get("beigeneqagetxuanshou?changci=" + that.changci).then(function (res) {
                console.log(res);
                if (res.status == 200) {
                    if (res.data &&res.data.mydafenlog &&res.data.mydafenlog.length > 0) {
                        that.mydafenlog = res.data.mydafenlog;
                        that.historyShow = true;
                    } else {
                        that.historyShow = false;
                        Notify({
                            message: "暂无打分记录",
                            color: "#fff",
                            background: "#e72876",
                        });
                    }
                } else {
                        that.$message({
                        message: "服务异常请稍后重试！",
                        type: "warning",
                        });
                }
            });
        },
    },

    destroyed() {
        if (this.timer1) {
        clearInterval(this.timer1);
        }
    },
}
</script>
<style scoped>
.teamListPage{
    width: 100%;
    min-height: 100%;
    background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/logoBackground.png") center no-repeat;
    background-size: 100% 100%;
}

.teamListPage .header-list {
    width: 100%;
    display: flex;
}
.teamListPage .header-list .left img {
  width: 146px;
  margin-top: 24px;
  margin-left: 40px;
}
.teamListPage .header-list div {
  flex: 1;
}
.teamListPage .header-list .left {
  text-align: left;
}
.teamListPage .header-list .right {
  text-align: right;
}
.teamListPage .header-list .right img {
  width: 186px;
  margin-top: 40px;
  margin-right: 40px;
}
.teamListPage .text-login {
  width: 100%;
  text-align: center;
}
.teamListPage .text-login img {
  width: 488px;
  margin-top: 0px;
}
/* 团队列表 */
.team-list-content{
    width: 100%;
    position: relative;
}
.team-list-box-bg{
    position: absolute;
    top: 0;
    left: 15.5%;
    width: 69%;
    height: 740px;
    background: #fff;
    opacity: 0.5;
    border-radius: 40px;
    margin: 0 auto;
    padding-bottom: 195px;
    box-sizing: border-box;
}
.teamListPage  .team-list-box{
    width: 69%;
    height: 740px;
    opacity: 1;
    border-radius: 40px;
    margin: 0 auto;
    padding-bottom: 195px;
    box-sizing: border-box;
    overflow: scroll;
}
.team-box{
    width: 100%;
    height: auto;
}
.teamListPage .team-list-box .list{
    width: 90%;
    height: 80px;
    margin: 0 auto;
    position: relative;
    text-align: center;
    background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/teamList-bg1.png') center no-repeat;
    background-size: 100% 100%;
    opacity: 1;
    margin-top: 12px;
    line-height: 112px;
    box-sizing: border-box;
}
.teamListPage .team-list-box .selectBg1{
    width: 90%;
    height: 80px;
    margin: 0 auto;
    position: relative;
    text-align: center;
    background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/teamList-bg2.png') center no-repeat;
    background-size: 100% 100%;
    opacity: 1;
    margin-top: 12px;
}
.teamListPage .team-list-box .selectBg2{
    width: 90%;
    height: 80px;
    margin: 0 auto;
    position: relative;
    text-align: center;
    background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/teamList-bg3.png') center no-repeat;
    background-size: 100% 100%;
    opacity: 1;
    margin-top: 12px;
}
.teamListPage  .team-list-box .list .number{
    width: 58px;
    height: 58px;
    line-height: 1px;
    border-radius: 100%;
    position: absolute;
    left: 6px;
    top: 30px;
    opacity: 1;
}
.teamListPage  .team-list-box .list .number span{
    font-size: 22px;
    color: #000;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
}
.teamListPage  .team-list-box .list p{
    font-size: 28px;
    color: #000;
    opacity: 1;
}
.teamListPage  .pingfenlishi {
 width: 100%;
 margin-top: 30px;
 padding-bottom: 80px;
 box-sizing: border-box;
}
.teamListPage  .pingfenlishi img{
  width:213px
}
.teamListPage .pingfenlishi button {
  width: 182px;
  height: 60px;
  line-height: 60px;
  border: none;
  /* background: url("https://oss.sxyweb.com.cn/2021/wj/BeiGene/pingfBtn.png")
    center no-repeat;
  background-size: 100% 100%; */
  background-image: linear-gradient(#e42775, #b40958);
  border: 0.1em solid #fff;
  box-shadow: #999 10px 10px 10px;
  border-radius: 40px;
  color: #fff;
  font-size: 28px;
  margin: 0 10px;
}
.historyShowBG {
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
.historyShow {
  position: fixed;
  top: 240px;
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
.historyShow .title {
  width: 100%;
  height: 94px;
  line-height: 94px;
  font-size: 40px;
  background-image: linear-gradient(#e72876, #c01160);
  position: relative;
  color: #fff;
  border-radius: 20px;
}
.historyShow .title img {
  width: 60px;
  position: absolute;
  bottom: -30px;
  right: 56px;
}
.tablist {
  width: 100%;
  margin-top: 90px;
  padding: 0 50px;
  box-sizing: border-box;
}
.tablist table {
  width: 100%;
  height: 480px;
  overflow: scroll;
}
.tablist table tr {
  display: flex;
}
.tablist table th {
  flex: 1;
  height: 36px;
  line-height: 36px;
  font-size: 28px;
  border: none;
  border-right: 0.1em solid #e65a94;
  background: #e3347b;
  color: #fff;
}
.tablist table th:nth-of-type(1) {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.tablist table th:nth-last-of-type(1) {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.tablist table td {
  height: 54px;
  line-height: 54px;
  font-size: 24px;
  flex: 1;
  border-top: 0.1em solid #e3347b;
}
.tablist table td {
  margin-top: 28px;
}
.backBtn {
  width: 100%;
}
.backBtn button {
  width: 233px;
  height: 60px;
  background-image: linear-gradient(#e72876, #c01160);
  color: #fff;
  font-size: 28px;
  border-radius: 40px;
  border: 0.2em solid #e82877;
  box-shadow: #999 10px 10px 10px;
}
</style>