<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
      <ul class="content">
        <li v-for="item in common" @click="step()">
          <!-- <div class="icon"><img :src="item.icon" height="22" width="22" alt=""></div> -->
          <div class="text">{{item.text}}</div>
          <div class="textRight">{{item.textRight}}</div>
          <!-- <div class="into"><img src="../../../static/icon/jiantou.png" height="22" width="22" alt=""></div> -->
        </li>
      </ul>
      <div class="content-dec" >
        <div class="content">
          <span>简介</span>
          <div >
            <span>GXS是公信宝基金会在GXChain（公信链）上发行的Token，不仅具有流通价值，同时在公信链上开发、认证应⽤、使⽤链上服务（例如链上转账的矿⼯费）以及使⽤BaaS服务都需要⽀付或燃烧GXS，GXS是作为链上应⽤运⾏唯⼀使⽤到的Token。 在布洛克城中也可以很方便地利用GXS进行支付结算，如居民之间互相使用GXS进行结算，使用城市公共服务需要用GXS结算，商家提供的服务也需要用GXS来购买等等。</span>
          </div>
        </div>
         <div>
            <div @click="step" class="submit">充值</div>
            <div @click="submit" class="submit1">提现</div>
        </div>
      </div>

   </div>
</template>

<script>

import { wallet } from '../../api/api.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      common:[
      {
        // icon:'../../static/icon/yucec.png',
        text:'名称',
        textRight:'GXS',
      },
      {
        // icon:'../../static/icon/gxs.png',
        text:'数量',
        textRight:'0',
        route:'recharge'
      },
      ]
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
      wallet().then(response=>{
        Indicator.close();
        this.common[1].textRight = response.body.GXS;
      })
    },
    step() {
      this.$router.push({
        name:'recharge'
      })
    },
    submit() {
        Toast({
          message: '暂未开通',
          position: 'middle',
          duration: 3000
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
  }
  

</style>
