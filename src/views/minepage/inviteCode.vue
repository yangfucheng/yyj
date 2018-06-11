<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
   <div class="header">
     <div class="invitation-title">预  言  家</div>
     <div class="invitation-tcode">p r o p h e t</div>
     <div class="copy">首 款 区 块 链 移 动 社 交 属 性 预 测 平 台</div>
   </div>
   <div class="content">
     <div class="wrap1">
       <p>我的邀请码</p>
       <p>{{inviteCode}}</p>
       <p>“你愿意跟我在预言家一起预测我们的未来吗”</p>
     </div>
     <div class="wrap2">
        <p>我是“{{infoObj.nickName}}”，预言家的第{{infoObj.userId}}号居民</p>
        <p>我在预言家等你，不见不散～</p>
        <p id="qrcode"></p>
        <p>扫码下载公信宝布洛克城app</p>
        <p>在应用区进入预言家应用参与预测</p>
      </div>
   </div>
  </div>
</template>

<script>

import { info } from '../../api/api.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import QRCode from 'qrcodejs2'



export default {
  data () {
    return {
      inviteCode:'',
      infoObj:''
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
    
  },
  mounted () {  
    this.qrcode();
    // alert(this.$router.params.inviteCode)
    this.inviteCode =this.$route.params.inviteCode;

  },  
  methods: {
    fetch(){
      Indicator.open();
      info().then(response=>{
        Indicator.close();
        this.infoObj=response.body;
      })
    },
    qrcode () {  
      let qrcode = new QRCode('qrcode', {  
        width: 110,  
        height: 110, // 高度  
        text: 'https://blockcity.gxb.io/download/' // 二维码内容  
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        // background: '#f0f'  
        // foreground: '#ff0'  
      })  
      console.log(qrcode)  
    }, 
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
    background-image: url('https://ydb.anydd.com/images/app/yqbg1.jpg');
    background-size:100% 100%;
    background-repeat:no-repeat;
    z-index:-10;
    .header{
      height:20%;
      text-align: center;
      color:#FFF;
      z-index:1;
      opacity:1;
      .invitation-title{
        padding-top:6%;
        font-size:.6rem;
      }
      .invitation-tcode{
        // margin-top:.1rem;
        font-size:.45rem;
        margin-bottom:.2rem;
      }
      .copy{
        // border:1px solid #FFF;
        // border-radius:12px;
        // padding:.1rem .65rem;
        // margin-top:.2rem ;
      }
    }
    .content{
      width:90%;
      margin:0 auto;
      height:75%;
      background:#FFF;
      border:1px solid #FFF;
      border-radius:10px;
      text-align: center;
      .wrap1{
        border-bottom:1px dashed #BBB;
        p:nth-child(1){
          padding-top:.6rem;
          font-size:.45rem;
          letter-spacing:1.5px;
        }
        p:nth-child(2){
          margin:.3rem 0;
          font-size:.8rem;
          letter-spacing:1.5px;
          color:#6587DC;
        }
        p:nth-child(3){
          margin:.5rem 0;
          font-size:.35rem;
          letter-spacing:1.5px;
          color:#6587DC;
        }
      }
      .wrap2{
        margin-top:.6rem;
        text-align: center;
        p:nth-child(1){
          margin:1px 0;
        }
        p:nth-child(3){
          margin:.8rem auto;
          width:110px;
        }
        p:nth-child(4){
          // padding-top:5%;
        }

      }
    }
  }
  

</style>
