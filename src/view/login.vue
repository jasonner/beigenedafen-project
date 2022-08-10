<template>
    <div class="loginPage">
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
        <div class="score-title">
            <div class="score-text">
                <img class="pen" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/pen-text.png" alt="" srcset="">
                评分系统
                <img class="set-up" src="https://oss.sxyweb.com.cn/2021/wj/BeiGene/set-up-icon.png" alt="" srcset="">
            </div>  
        </div>
        <div class="login-content-box">
            <div class="login-content-bg"></div>
            <div class="login-content">
                <form action="https://apicore.forhoo.cn/beigene/beigeneqalogin" method="post" ref="form" @submit.prevent="login">
                    <div>
                        <label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label>
                        <input type="text" name="username"  v-model="user.name" :maxlength='12'>
                    </div>
                    <div>
                        <label>手&nbsp;&nbsp;机&nbsp;&nbsp;号:</label>
                        <input type="text" name="mobile" v-model="user.tel" :maxlength='11'>
                    </div>
                    <div>
                        <label>短信验证:</label>
                        <input type="text"  v-model="Code" :maxlength='4'>
                        <input  name="changci" v-model="changci" type="hidden">
                    </div>
                    <div class="getCode">
                        <p onsubmit="return false" @click="getCodeChange()">{{getCode}}</p>
                    </div>
                    <div class="login-btn">
                        <button type="submit" @click="login()">登录</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>
</template>
<script>
import qs from 'qs'
import { Notify } from 'vant';
export default {
    name:'login',
    data(){
        return{
            user:{
                name:'',
                tel:'',
            },
            Code:'',
            codeNum:'', 
            getCode:'获取验证码',
            tim1Flag:true,
            timer1:null,
            changci:''
        }
    },
    mounted(){
        var query=this.$route.query;
        this.changci = query.changci;
    },
    methods:{
         //发送短信验证码
        getCodeChange(){
            let that = this;
            if(that.tim1Flag){
                if(that.user.tel == ''){
                    Notify({ type: 'warning', message: '请输入手机号' });
                    return
                }else if(!that.PhoneVerify(that.user.tel)){
                    Notify({ type: 'warning', message: '请输入正确的手机号' });
                    return
                }else{
                    var num = 60;
                    var timer1 = setInterval(() => {
                        num --;
                        if(num <= 0){
                            clearInterval(timer1);
                            that.getCode = '重新获取验证码';
                            that.tim1Flag = true;
                        }else{
                            that.tim1Flag = false;
                            that.getCode = num+'s';
                        }
                    }, 1000);
                    that.codeNum = Math.floor(Math.random()*(9999-0))+0;
                    let promise = {
                        mobile: that.user.tel,
                        code:that.codeNum
                    };
                    that.axios.post('beigeneqasendsms', qs.stringify(promise))
                    .then(function (res) {
                        console.log(res);
                        if(res.status == 200 ){
                            if(res.data && res.data.s){
                                console.log('短信验证码已发送');
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
                };
            };
        },

        //登录
        login(){
            let that  = this;
            if(that.user.name == ''){
                Notify({ type: 'warning', message: '请输入用户名' });
            }else if(that.user.tel == ''){
                Notify({ type: 'warning', message: '请输入手机号' });
            }else if(!that.PhoneVerify(that.user.tel)){
                Notify({ type: 'warning', message: '请输正确的入手机号' });
            }else if(that.Code == ''){
                Notify({ type: 'warning', message: '请输入短信验证码' });
            }else if(that.Code == that.codeNum){
                that.$refs.form.submit();
            }else{
                Notify({ type: 'warning', message: '请输入正确的短信验证码' });
            }
        },

        //手机号检验
        PhoneVerify(str){
            var reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },
    },
}
</script>
<style scoped>
    .loginPage{
        width: 100%;
        min-height: 100%;
        background: url('https://oss.sxyweb.com.cn/2021/wj/BeiGene/logoBackground.png') center no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
    }
    .header-list{
        width: 100%;
        display: flex;
    }
    .header-list .left img{
        width: 146px;
        margin-top: 24px;
        margin-left: 40px;
    }
    .header-list div{
        flex: 1;
    }
    .header-list .left{
        text-align: left;
    }
    .header-list .right{
        text-align: right;
    }
    .header-list .right img{
        width: 186px;
        margin-top: 40px;
        margin-right: 40px;
    }
    .text-login{
        width: 100%;
        text-align: center;
    }
    .text-login img{
        width: 488px;
        margin-top: 48px;
    }
    .score-title{
        width: 100%;
    }
    .score-title .score-text{
        width: 70%;
        height: 94px;
        background: #df2472;
        font-size: 40px;
        position: relative;
        line-height: 94px;
        margin: 0 auto;
        color: #fff;
        border-radius: 20px;
    }   
     .score-title .score-text .pen{
        width: 50px;
        vertical-align: middle;
    }
    .score-title .score-text .set-up{
        width: 96px;
        position: absolute;
        bottom: -24px;
        right: 22px;
        z-index: 1000;
    }
    .login-content-bg{
        width: 100%;
        margin: 0 auto;
        min-height: 570px;
        background: #fff;
        opacity: 0.3;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        z-index: 10;
    }
    .login-content-box{
        width: 67%;
        margin: 0 auto;
        height: auto;
        position: relative;
    }
    .login-content{
        width: 100%;
        margin: 0 auto;
        min-height: 570px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding-top: 100px;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;

    }
    .login-content div{
        display: flex;
        padding: 0 62px;
        box-sizing: border-box;
        margin-top: 30px;
    }
    .login-content div label{
        font-size: 25px;
        text-align: right;
        flex: 1;
        font-size: 24px;
        color: #9f004c;
        font-weight: 600;
        margin-right: 10px;
        opacity: 1;
        z-index: 1000;
    }
    .login-content div input{
        width: 243px;
        height: 40px;
        border-radius: 20px;
        border: 0.1em solid #df2472;
        padding-left: 40px;
        box-sizing: border-box;
        font-size: 20px;
        background: transparent;
    }
    .login-content .getCode{
        display: block;
        width: 100%;
        text-align: right;
    }
    .getCode p{
        display: inline-block;
        min-width: 2rem;
        padding: 6px 18px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        border: none;
        background: #da216f;
        border-radius: 40px;
    }
    .login-content .login-btn{
        width: 100%;
        display: block;
        margin-top: 52px;
    }
    .login-btn button{
        width: 236px;
        font-size: 26px;
        color: #fff;
        text-align: center;
        background: #db226f;
        border: none;
        border-radius: 40px;
        padding: 14px 82px;
        box-sizing: border-box;
    }
</style>