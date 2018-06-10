<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
    <div class="wrap">
       大苏打绿的骄傲恐龙当家奥斯卡来得及撒恐龙当家萨克大三了
    </div>

  </div>
</template>

<script>

// import { wallet } from '../../api/api.js'
// import { Indicator } from 'mint-ui';
// import { Toast } from 'mint-ui';
// import QRCode from 'qrcodejs2'



export default {
  data () {
    return {
      common:[]
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // this.fetch();
  },
  mounted () {  

  },  
  methods: {

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
    .wrap{
      margin-top:40%;
      height:2rem;
      width:100%;
      background:#FFF;
    }
  }
  

</style>
