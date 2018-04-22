<template>
   <div class="contain">
      <div class="nav-bar">个人中心</div>
      <ul class="content">
        <li>
          <div class="icon"><img src="../../static/icon/touxiang.png" height="30" width="30" alt=""></div>
          <div class="name">王力宏</div>
          <div class="idcard">452725**************2188</div>
        </li>
        <li v-for="item in common" @click="step(item.route)">
          <div class="icon"><img :src="item.icon" height="22" width="22" alt=""></div>
          <div class="text">{{item.text}}</div>
          <div class="into"><img src="../../static/icon/jiantou.png" height="22" width="22" alt=""></div>
        </li>
      </ul>
   </div>
</template>

<script>
export default {
  data () {
    return {
      common:[
      {
        icon:'../../static/icon/liushui.png',
        text:'流水记录',
         route:'business'
      },
      {
        icon:'../../static/icon/canyu.png',
        text:'我参加的',
        route:'join'
      },
      {
        icon:'../../static/icon/collect.png',
        text:'我收藏的'
      },
      {
        icon:'../../static/icon/tixian.png',
        text:'提现',
        route:'tixian'
      },
      {
        icon:'../../static/icon/set.png',
        text:'设置'
      },
      {
        icon:'../../static/icon/my.png',
        text:'联系客服',
        route:'connect'
      },
      ]
    }
  },
  methods: {
    step(route) {
      this.$router.push({
        name:route,
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../common/mixin.scss";
  @import "../common/style.scss";

  .contain{
    position:relative;
    .content{
      margin-top:1.2rem;
        li{
          border:1px solid #ccc;
          height:1.2rem;
        }
        li:nth-child(1) {
          position:relative;
          background-color:rgb(26,198,188);
          height:2rem;
          .icon {
            position:absolute;
            left:.4rem;
            top:.2rem;
            width:1.6rem;
            height:1.6rem;
            border-radius:50%;
            border:1px solid rgb(26,198,188);
            background-color:#fff;
            line-height:2rem;
            text-align: center;
          }
          .name {
            position:absolute;
            top:.4rem;
            left:2.5rem;
            font-size:.5rem;
            font-weight:400;
            color:#fff;
          }
          .idcard {
            position:absolute;
            top:1.2rem;
            left:2.3rem;
            font-size:.4rem;
            font-weight:400;
            color:#fff;
          }
        }
        li:nth-child(n+2) {
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
            top:.3rem;
            left:1.2rem;
            font-size:.45rem;
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
