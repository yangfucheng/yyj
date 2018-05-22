<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
      <ul class="content">
        <li>
          <div class="icon"><i class="iconfont icon-wode"></i></div>
          <div class="name">
            <label>用户名:<span style="color:#000;margin-left:.2rem">王力宏</span> </label>
            <span></span>
          </div>
          <div class="idcard">王力宏粉丝团的9998位居民</div>
        </li>
        <li v-for="item in common" @click="step(item.route)">
          <div class="icon"><i :class="item.icon"></i></div>
          <div class="text">{{item.text}}</div>
          <div class="into"><i class="iconfont icon-jiantou1"></i></div>
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
        icon:'iconfont icon-shouzhiliushui',
        text:'流水记录',
         route:'business'
      },
      {
        icon:'iconfont icon-wocanyude',
        text:'我参加的',
        route:'join'
      },
      // {
      //   icon:'../../static/icon/collect.png',
      //   text:'我收藏的'
      // },
      // {
      //   icon:'../../static/icon/tixian.png',
      //   text:'提现',
      //   route:'tixian'
      // },
      {
        icon:'iconfont icon-tixian',
        text:'我的钱包',
        route:'money'
      },
      {
        icon:'iconfont icon-shezhi',
        text:'设置',
        route:'set'
      },
      {
        icon:'iconfont icon-wode',
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
        li:nth-child(1) {
          position:relative;
          background-color:#FFF;
          margin-bottom:.3rem;
          height:2.2rem;
          .icon {
            position:absolute;
            left:.4rem;
            top:.3rem;
            width:1.6rem;
            height:1.6rem;
            border-radius:50%;
            border:1px solid #cccccc;
            background-color:#fff;
            line-height:2rem;
            text-align: center;
            i{
              font-size:1rem;
              color:rgb(151, 160, 166);
              text-align: center;
            }
          }
          .name {
            position:absolute;
            top:.6rem;
            left:2.5rem;
            font-size:.3rem;
            font-weight:200;
            color:rgb(151, 160, 166);
          }
          .idcard {
            position:absolute;
            top:1.2rem;
            left:2.5rem;
            font-size:.3rem;
            font-weight:200;
            color:rgb(151, 160, 166);
          }
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
        li:nth-child(n+2) {
          background-color:#fff; 
          position:relative;
          .icon{
            position:absolute;
            top:.4rem;
            left:.4rem;
            height:.45rem;
            width:.45rem;
            color:rgb(151, 160, 166);
          }
          .text{
            position:absolute;
            top:.4rem;
            left:1.2rem;
            font-size:.3rem;
             color:rgb(151, 160, 166);
          }
          .into {
             position:absolute;
             top:.4rem;
             right:.5rem;
             height:.5rem;
             width:.5rem;
             text-align: center;
             color:rgb(151, 160, 166);
          }
        }

    }

    
    
  }
  

</style>
