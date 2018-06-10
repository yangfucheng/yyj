<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
      <ul class="content">
        <li @click="step">
          <div class="text">{{coinData.coin}}</div>
          <div class="textRight">{{coinData.amount}}</div>
          <!-- <div class="into"><img src="../../../static/icon/jiantou.png" height="22" width="22" alt=""></div> -->
        </li>
      </ul>
      <div class="content-dec" >
        <div class="content">
          <span>简介</span>
          <div >
            <span>{{coinData.intro}}</span>
          </div>
        </div>
         <div>
            <div @click="step" class="submit">充值</div>
            <div @click="submit" class="submit1" :class='{withdraw:isActive}'>提现</div>
            <p v-if='coinData.coin=="GXS"' @click='goWithdraw' class='root submit'>提现记录</p>
        </div>
      </div>
   </div>
</template>

<script>

import { walletDetail } from '../../api/api.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      coinData:{},
      isActive:false,
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    let coin=this.$route.params.tradeCoin; 
    if(coin=='GXS')this.isActive=true;
    this.fetch(coin);
  },
  methods: {
    fetch(coin){
      Indicator.open();
      walletDetail({tradeCoin:coin}).then(response=>{
        Indicator.close();
        this.coinData= response.body;
      })
    },
    step() {
      this.$router.push({
          name:'recharge',
          params:{coin:this.coinData.coin},
        });
    },
    submit() {
      if(this.coinData.coin=='GXS'){
        this.$router.push({
          name:'tixian',
          params:{coin:this.coinData.coin,num:this.coinData.amount},
        });
      }else{
        Toast({
          message: '暂未开通',
          position: 'middle',
          duration: 3000
        });
      }      
    },
    goWithdraw(){
      this.$router.push({
        name:'tixianList',
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // @import "../common/mixin.scss";
  // @import "../common/style.scss";
  .contain{
    position:absolute;
    background-color:rgb(239, 239, 244);
    height:100%;
    width:100%;
    top:0;
    left:0;
    .content{
      // margin-top:1.2rem;
        li{
          // @include border-1px();
          height:1.2rem;
        }
        li:nth-child(2){
          // @include border-1px();
          border-top:1px solid #e0e0e0;
          border-bottom:1px solid #e0e0e0;
          // @include border-1px-top
        }
        li:nth-child(5){
          margin-top:.3rem;
        }
        li:nth-child(n) {
          background-color:#fff; 
          position:relative;
          .icon{
            position:absolute;
            top:.32rem;
            left:.4rem;
            height:.45rem;
            width:.45rem;
          }
          .text{
            position:absolute;
            top:.4rem;
            left:.4rem;
            font-size:.3rem;
            color:rgb(151, 160, 166);
          }
          .textRight{
             position:absolute;
             top:.4rem;
             right:.4rem;
             height:.5rem;
             width:5rem;
             text-align: right;
             color:rgb(151, 160, 166);
          }
          .into {
             position:absolute;
             top:.3rem;
             right:.5rem;
             height:.5rem;
             width:.5rem;
             text-align: center;
          }
        }

    }
    .content-dec{
      width:100%;
      margin:1px auto;
      line-height:.6rem;
      // letter-spacing:.5px;
      background:#FFF;
      padding:.1rem 0;
      .content{
         width:92%;
         margin:0 auto;
      }
    }
    .submit{
      position:absolute;
      // top:0;
      // left:0;
      bottom:20%;
      width:80%;
      left:10%;
      height:1.1rem;
      line-height:1.1rem;
      border:1px solid #ccc;
      margin:.3rem auto;
      text-align: center;
      border-radius:25px;;
      background-color:red;
      color:#fff;
    }
    .submit1{
     position:absolute;
      // top:0;
      // left:0;
      bottom:10%;
      width:80%;
      left:10%;
      height:1.1rem;
      line-height:1.1rem;
      border:1px solid #ccc;
      margin:.3rem auto;
      text-align: center;
      border-radius:25px;;
      background-color:#CCCCCC;
      color:#fff;
    }
    .root{
      bottom:2%;
      background-color:#efeff4;
      border:none;
      color:#ff9500;
    }
    .withdraw{
      background-color:#7298e9;
      border-color:#7298e9;
    }
  }
  

</style>
