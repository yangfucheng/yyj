<template>
  <div class="contain">
    <div class="nav-bar">首页</div>
    <!-- <div class="search">
      <span class="text"><i class="iconfont icon-sousuo"></i>搜索商品 分类 功效 用户</span>
    </div> -->
    <div class="wrapper" >
      <div class="swiper"  v-show="isSwiper" ref="swiper">
        <mt-swipe   :show-indicators="false" :auto="5000"> 
          <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
           <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
           <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="nav" ref="navbar">
        <mt-navbar v-model="selected" >
          <mt-tab-item :id="1">专家</mt-tab-item>
          <mt-tab-item :id="2">推荐</mt-tab-item>
          <mt-tab-item :id="3">金融</mt-tab-item>
          <mt-tab-item :id="4">体育</mt-tab-item>
          <mt-tab-item :id="5">游戏</mt-tab-item>
          <mt-tab-item :id="6">我的</mt-tab-item>
          <mt-tab-item :id="7">已结束</mt-tab-item>
        </mt-navbar>
      </div>
      <div >
        <mt-tab-container v-model="selected"  ref="wrapper"  >
              <mt-tab-container-item :id="1" :class="isSwiper==false?'Hidden':'content'">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore1" :bottom-method='loadBottom'  :bottom-all-loaded="allLoaded"  >
                   <ul><li> <carousel  v-for="item in dataArray" :dataProp='item' ></carousel></li> </ul>
                </mt-loadmore>
              </mt-tab-container-item>
            
              <mt-tab-container-item :id="2"  :class="isSwiper==false?'Hidden':'content'">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded"         :auto-fill="false" ref="loadmore2"  :bottom-method='loadBottom'>
                   <ul><li><end v-for="item in dataArray" :dataProp='item'></end></li> </ul>
                </mt-loadmore>
              </mt-tab-container-item>
               <mt-tab-container-item :id="3"  :class="isSwiper==false?'Hidden':'content'">
                  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded"         :auto-fill="false" ref="loadmore3"  :bottom-method='loadBottom'>
                     <ul><li><my v-for="item in dataArray" :dataProp='item'></my></li> </ul>
                  </mt-loadmore>
                </mt-tab-container-item>
          
          </mt-tab-container>
        </div>
      
    </div>
  </div>
</template>

<script>
import carousel from "../components/carousel.vue";
import my from "../views/indexpage/my.vue";
import end from "../views/indexpage/end.vue";
import { getList,getImage } from '../api/api.js'
import { Loadmore } from 'mint-ui';
import { Indicator } from 'mint-ui';
import BScroll from "better-scroll";

export default {
  data () {
    return {
      value:'',
      dataProp:'',
      selected:1,
      topStatus:'',
      page:1,
      pageArray:[true,false,false],
      dataArray:[],
      topStatus:'',
      allLoaded:false,
      tag:'eq',
      type:'tag',
      // bottomDistance:'70',
      isSwiper:true
    }
  },
  mounted() {
    if(this.isSwiper==true){
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  created() {
    
    this.fetch();
  },
  methods: {
    fetch(){
      Indicator.open('Loading...');
      var params ={}
       params={
          type:this.type,
          page:this.page,
          tag:'ty'
       }
       getList(params).then(response => {
           this.dataArray = response.body.result;
            this.$nextTick(() => {
              this._initScroll();
            })
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop)
      var swiperDom = this.$refs.swiper;
      var navDom = this.$refs.navbar;
      var swiperH = swiperDom.clientHeight;
      if(scrollTop > swiperH){
        this.isSwiper =false;
        navDom.style.width='100%';
        navDom.style.position = 'fixed';
        navDom.style.zIndex  = '1';
        navDom.style.backgroundColor = '#FFF'
        // this.$refs.content.style.color  = '1.5rem'
      }
    },
    _initScroll(){
        this.scroll = new BScroll(this.$refs.wrapper, {})
    },
    handleTopChange(status) {
        this.topStatus = status;
    },
    loadTop(){
      this.page=1;
      this.fetch();
      // console.log(this.$refs.loadmore)
      this.$refs.loadmore1.onTopLoaded();
        // this.$refs.loadmore2.onTopLoaded();
        //   this.$refs.loadmore3.onTopLoaded();
    },
    loadBottom(){
      this.page++;
      // self = this;
      this.fetch();
      this.$refs.loadmore1.onBottomLoaded();
    }

  },
  watch: {
    "selected"() {
        var num =this.selected-1;
        var tagArray =['eq','code','code'];
        var typeArray =['tag','end','mine']
        for(var i=0;i<3;i++){
          if(num == i){
            this.pageArray[num] = true;
            this.type=typeArray[num];
            if(num==1){
              this.tag = 'eq'
            }else{
              this.tag =''
            }   
            this.fetch();
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
    margin-top:1.3rem;
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
    // 
      .wrapper{
          // width: 100%;
          // position:absolute;
          // // top: 3rem;
          // bottom: 50px;
          // // overflow: hidden;
          // z-index: 0;
        }
        // .content{
        //   height:100%;
        // }
      .swiper{
        background-color:red;
        height:5rem;
        width:98%;
        margin:0 auto;
        margin-bottom:.1rem;
        .mint-swipe-item {
          backgorund-color:red;
        }
      }
      .Hidden{
        margin-top:1.5rem;
      }
      .nav{
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