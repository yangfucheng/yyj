<template>
  <div class="contain">
      <ul class="content">
        <li>
          <label>提现金额</label><input type='num' v-model='count' :placeholder='holder'/><a href='javascript:void(0)' @click='all' class='all'>全部</a>
        </li>
        <li>
          <label>验证码</label><input type='text' v-model='code' placeholder='请输入验证码'><button @click='getCode' :disabled='isWait' class='getcode'>{{msg}}</button>
        </li>
      </ul>
        <div class="tip">
          <span class='warn'><i class='el-icon-warning'></i>&nbsp;重要提示</span>
          <div class='intro'>
            <p>1. 提现无须转账手续费。</p>
            <p>2. 提现金额将到该手机号对应的布洛克城钱包，请注意查验。</p>
            <p>3. 提现请求需等待人工审核，最长审核时间24h，请耐心等待。</p>
          </div>
        </div>
        <div>
            <el-button @click="submit" class="submit" :disabled="disabled">确认提现</el-button>
        </div>
    </div>
</template>

<script>
import {withdraw,info,getMsgCode} from '../../api/api.js'
var qs=require("qs");
export default {
  name: 'HelloWorld',
  data () {
    return {
      num:'',
      count:"",
      disabled:true,
      code:'',
      tel:'',
      isWait:false,
      msg:'获取验证码',
      coin:'',
      holder:'',
      delay:60,
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.num=this.$route.params.num;
    this.coin=this.$route.params.coin;
    this.holder='最多可提取'+this.num+'个'+this.coin;
    this.getUserInfo();
  },
  watch:{
    'count'(){
      if(parseFloat(this.count)<= parseFloat(this.num)&&parseFloat(this.count)>0){
        if(this.count.indexOf(".")>=0){
          let arr=this.count.split(".");
          if(arr[1].length>5){
            this.disabled=true;
          }else{
            this.disabled=false;
          }
        }else{
          this.disabled=false;
        }
      }else{
        this.disabled = true;
      }
    }
  },
  methods:{
    getUserInfo(){
      info().then(response=>{
        this.tel=response.body.account;
      })
    },
    all(){
      this.count =this.num.toString() ;
    },
    submit(){

      if(this.code.trim()==''){
        this.$message.error('请填写完整');
      }else{
        let tradeCoin=this.coin;
        let amount=this.count;
        let smsCode=this.code;
        let params={tradeCoin:tradeCoin,amount:amount,smsCode:smsCode};
        withdraw(params).then(response=>{
          this.$router.push({
            name:'money',
          });
          this.$message({
            message: '提现成功,待管理员审核',
            type: 'success'
          });
        });
      }
    },
    getCode(){
      this.isWait=true;
      var self=this;
      getMsgCode({telphone:this.tel}).then(response=>{
        this.delay= 60;
        var auth_timetimer =  setInterval(()=>{
          this.delay--;
          if(this.delay<=0){
            this.isWait= false;
            this.msg='重新获取验证码';
            clearInterval(auth_timetimer);
          }else{
            this.msg='还剩'+this.delay+'s';
          }
        }, 1000);
      }).catch(err=>{
        this.isWait= false;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.contain{
    position:absolute;
    background-color:rgb(239, 239, 244);
    height:100%;
    width:100%;
    top:0;
    left:0;
    .content{
      li{
        background-color:#fff;
        padding:0.3rem;
        border-bottom:1px solid #eee;
        display: flex;
        input{
          border:none;
          flex:1;
          padding:0.1rem;
        }
        .all,.getcode,label,input{
          font-size: .36rem;
        }
        .all,.getcode{
          color:rgba(63, 152, 181, 1);
        }
        .getcode{
          background-color:#fff;
          border: none;
        }
        .getcode:disabled{
          color:#ccc;
        }
      }
    }
    label{
      width:60px;
      display: inline-block;
      color:#545454;
    }
    .tip{
      padding:0.3rem;
      line-height:1.8;
      .warn{
        color:#ff9500;
      }
      .intro{
        font-size:0.34rem;
        color:#888;
      }
    }
    .submit{
      position:absolute;
      bottom:20%;
      width:80%;
      left:10%;
      margin:.3rem auto;
      text-align: center;
      border-radius:25px;;
      background-color:red;
      color:#fff;
    }
    button:disabled{
      background-color:#ccc;
    }
}
</style>