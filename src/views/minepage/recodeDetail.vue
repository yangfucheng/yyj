<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
      <ul class="content">
        <li v-for="item in common" @click="step(item.route)">
          <!-- <div class="icon"><img :src="item.icon" height="22" width="22" alt=""></div> -->
          <div class="text">{{item.text}}</div>
          <div class="textRight">{{item.textRight}}</div>
          <!-- <div class="into"><img src="../../../static/icon/jiantou.png" height="22" width="22" alt=""></div> -->
        </li>
      </ul>
   </div>
</template>

<script>
import timestampToTime from '../../untils/enums.js'
export default {
  data () {
    return {
      common:[
      {
        text:'类型',
        textRight:'下注支付',
      },
      {

        text:'支出',
        textRight:''
      },
      {

        text:'时间',
        textRight:''
      },
       {
        text:'余额',
        textRight:'283GXS'
      },
       {

        text:'备注',
        textRight:'283GXS'
      },
      ],
    }
  },
  methods: {
    step(route) {
      this.$router.push({
        name:route,
      })
    },
    changeTime(timestamp){
      if(timestamp){
        let date = new Date(timestamp);  
        let y = date.getFullYear();  
        let MM = date.getMonth() + 1;  
        MM = MM < 10 ? ('0' + MM) : MM;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        let h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        let m = date.getMinutes();  
        m = m < 10 ? ('0' + m) : m;  
        let s = date.getSeconds();  
        s = s < 10 ? ('0' + s) : s;  
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s; 
      }else{
        return ''
      }
    }
  },
  filters: {
   
  },
  mounted(){
    var dataArray = this.$route.params.id;
    this.common[1].textRight = dataArray.amount;
    this.common[2].textRight = this.changeTime(dataArray.createTime);
    this.common[3].textRight = dataArray.lastAmount;
    this.common[4].textRight = dataArray.memo;
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // @import "../common/mixin.scss";
  // @import "../common/style.scss";
  .contain{
    // position:absolute;
    // background-color:rgb(239, 239, 244);
    // height:100%;
    // width:100%;
    // top:0;
    // left:0;
    .content{
      // margin-top:1.2rem;
        li{
          // @include border-1px();
          height:1.2rem;
        }
        li:nth-child(n){
          // @include border-1px();
          // border-top:1px solid #e0e0e0;
          // border-bottom:1px solid #e0e0e0;
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
            left:.5rem;
            font-size:.3rem;
            color:rgb(151, 160, 166);
          }
          .textRight{
             position:absolute;
             top:.4rem;
             right:.5rem;
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
