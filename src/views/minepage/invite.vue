<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
   <div class="bg"></div>
   <div class="header">
     <div class="invitation-title">我的邀请码</div>
     <div class="invitation-code">{{inviteCode}}</div>
     <div><span class="copy" :data-clipboard-text="inviteCode" @click="copy">复制</span></div>
   </div>
   <div class="middle">
     <div class="middle-wrap">
       <div class="title">我的战绩</div>
       <div class="wrap">
          <div class="num">
            <div>邀请好友数量：</div>
            <div>1</div>
          </div>
          <div class="moeny">
            <div>累计获得PPS：</div>
            <div>100</div>
          </div>
        </div>
         <div class="content">
           <p>奖励规则</p>
           <p>1、每邀请一个好友且该好友完成“预言家”应用授权登陆（授权登陆时，填写您的邀请码），您就可以获得100PPS奖励；</p>
           <p>2、预言家拥有法律范围内对活动的最终解释权，并将严查虚假邀请行为，一经发现将取消奖励资格。</p>
         </div>
     </div>
   </div>
   <div class="footer" @click="step()">
     <p>生 成 邀 请 卡</p>
     <p>截 图 发 给 好 友 并 叮 嘱 其 注 册 时 填 写 邀 请 码</p>
   </div>
   </div>
  
</template>

<script>

import { invite } from '../../api/api.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      dataObj:null,
      inviteCode:''
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  methods: {
    fetch(){
      Indicator.open();
      invite().then(response=>{
        Indicator.close();
        this.dataObj=response.body;
        this.inviteCode = this.dataObj.inviteCode;
      })
    },
    step() {
      this.$router.push({
        name:'inviteCode',
        params:{
          inviteCode:this.inviteCode
        }
      })
    },
    copy() {  
      var clipboard = new Clipboard('.copy')  
      clipboard.on('success', e => {  
        console.log('复制成功') 
        Toast({
          message: '复制成功',
          position: 'middle',
          duration: 2000
        }); 
        // 释放内存  
        clipboard.destroy()  
      })  
      clipboard.on('error', e => {  
        // 不支持复制  
        console.log('该浏览器不支持自动复制')  
        // 释放内存  
        clipboard.destroy()  
      })  
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // @import "../common/mixin.scss";
  // @import "../common/style.scss";
  .contain{
      position:fixed;
      top:0;
      left:0;
      height:100%;
      width:100%;
      background-image: url('https://ydb.anydd.com/images/app/yqbg2.jpg');
      background-size:100% 100%;
      background-repeat:no-repeat;
      z-index:-10;
    .header{
      height:20%;
      text-align: center;
      color:#FFF;
      z-index:1;
      opacity:1;
      
      border-bottom:8px solid #eeeeef;
      .invitation-title{
        padding-top:6%;
        font-size:.35rem;
      }
      .invitation-code{
        margin-top:.1rem;
        font-size:.6rem;
        margin-bottom:.4rem;
      }
      .copy{
        border:1px solid #FFF;
        border-radius:12px;
        padding:.1rem .65rem;
        // margin-top:.2rem ;
      }
    }
    .middle{  
      width:100%;
      background:#FFF;
      height:70%;
      .middle-wrap{
        width:90%;
        margin:0 auto;
        .title{
          padding:.5rem 0;
          text-align: center;
          color:#51C9D2;
          font-weight:400;
          border-bottom:1px solid #BBBBBB;
          font-size:.5rem;
        }
        .wrap{
          display:flex;
          text-align: center;
          justify-content:space-around;
          padding:.5rem 0;
          border-bottom:1px solid #BBBBBB;
          color:#6587DC;
          .num{
            font-size:.35rem;
            div:nth-child(2){
              margin-top:.1rem;
              font-size:.6rem;
            }
          }
          .moeny{
            font-size:.35rem;
            div:nth-child(2){
              margin-top:.1rem;
              font-size:.6rem;
            }
          }
        }
        .content{
          color:#6F6C6C;
          line-height:.8rem;
          margin:1.8rem 0;
          p:nth-child(1){

          }
        }
      }
    }
    .footer{
      color:#FFF;
      width:90%;
      margin:0 auto;
      text-align: center;
      padding:3% 0;
      p:nth-child(2){
        margin-top:.1rem; 
      }
    }
  }
  

</style>
