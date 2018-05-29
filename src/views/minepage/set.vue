<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
      <ul class="content">
        <li v-for="item in common" @click="step(item.type)">
          <!-- <div class="icon"><img :src="item.icon" height="22" width="22" alt=""></div> -->
          <div class="text">{{item.text}}</div>
          <div class="textRight">{{item.textRight}}</div>
          <!-- <div class="into"><img src="../../../static/icon/jiantou.png" height="22" width="22" alt=""></div> -->
        </li>
      </ul>
   </div>
</template>

<script>
import { info } from '../../api/api.js'
import { Indicator } from 'mint-ui';
export default {
  data () {
    return {
      common:[
      {
        icon:'../../static/icon/canyu.png',
        text:'昵称',
        textRight:''
      },
      {
        icon:'../../static/icon/collect.png',
        text:'当前账号',
        textRight:''
      },
      {
        icon:'../../static/icon/tixian.png',
        text:'关于我们',
        type:'wai'
      }
      ],
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  methods: {
    step(type) {
     if(type=="wai"){
        window.location.href ="https://www.ppset.io";
      }
    },
    fetch(){
      Indicator.open();
      info().then(response=>{
        Indicator.close();
        this.common[0].textRight =response.body.nickName;
        this.common[1].textRight =response.body.account;
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
        li:nth-child(2n){
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
            left:.3rem;
            font-size:.3rem;
            color:rgb(151, 160, 166);
          }
          .textRight{
             position:absolute;
             top:.4rem;
             right:.3rem;
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

    
    
  }
  

</style>
