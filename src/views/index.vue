<template>
  <div class="contain">
    <div class="nav-bar">首页</div>
    <!-- <div class="search">
      <span class="text"><i class="iconfont icon-sousuo"></i>搜索商品 分类 功效 用户</span>
    </div> -->
    <div class="swiper">
      <mt-swipe   :show-indicators="false" :auto="5000"> 
        <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
         <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
         <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
      </mt-swipe>
    </div>
    <mt-navbar v-model="selected" class="nav">
      <mt-tab-item :id="1">专家</mt-tab-item>
      <mt-tab-item :id="2">推荐</mt-tab-item>
      <mt-tab-item :id="3">金融</mt-tab-item>
      <mt-tab-item :id="4">体育</mt-tab-item>
      <mt-tab-item :id="5">游戏</mt-tab-item>
      <mt-tab-item :id="6">我的</mt-tab-item>
      <mt-tab-item :id="7">已结束</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="n in 7" :id="n">
          <carousel  v-show="pageArray[0]"></carousel>
          <end v-show="pageArray[1]"></end>
          <my v-show="pageArray[2]"></my>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import carousel from "../components/carousel.vue";
import my from "../views/indexpage/my.vue";
import end from "../views/indexpage/end.vue";
export default {
  data () {
    return {
      value:'',
      cell:'',
      selected:1,
      pageArray:[true,false,false]
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
  watch: {
    "selected"() {
        var num =this.selected-1;
        for(var i=0;i<3;i++){
          if(num == i){
            this.pageArray[num] = true;
          }else{
            this.pageArray[i] =false;
          }
        }
     }
  },
  components:{
      carousel,
      my,
      end
  }
}

</script>
<style>
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #FFF;
    color: #26a2ff;
  }
</style>
<style lang="scss" scoped>
@import "../common/mixin.scss";
@import "../common/style.scss";
  
  .contain {
    margin-bottom:1.5rem;
    // .search{
    //   width:95%;
    //   margin:0 auto;
    //   border:1px solid #ccc;
    //   height:.8rem;
    //   margin-top:.1rem;
    //   margin-bottom:.1rem;
    //   text-align: center;
    //   line-height:.8rem;
    //   .icon-sousuo:before{
    //     margin-right:.3rem;
    //     font-weight:700;
    //   }
    // }
    .swiper{
      background-color:red;
      height:5rem;
      width:98%;
      margin:0 auto;
      margin-bottom:.1rem;
      margin-top:1.5rem;

      .mint-swipe-item {
        backgorund-color:red;
      }
    }
    .nav{
      // @include border-1px;
      border-top:1px solid #e0e0e0;
      border-bottom:1px solid #e0e0e0;
      .is-selected{
      }
      li{
        font-size:.4rem;
      }
    }

    .mint-tab-item{
        text-decoration: none;
      }
  }
    

</style>