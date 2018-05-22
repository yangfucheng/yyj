<template>
  <div class="contain">
  <!--   <div class="nav-bar">首页</div> -->
   <!--  <div class="search">
      <span class="text"><i class="iconfont icon-sousuo"></i>搜索商品 分类 功效 用户</span>
    </div> -->
    <div class="wrapper"  ref="viewBox" >
      <div class="swiper"  v-show="isSwiper" ref="swiper">
        <mt-swipe   :show-indicators="false" :auto="200000"> 
          <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
           <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
           <mt-swipe-item><img src="http://img3.imgtn.bdimg.com/it/u=1396157838,559404900&fm=214&gp=0.jpg" width="100%" height="100%"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="nav" ref="navbar">
        <mt-navbar v-model="selected" >
          <mt-tab-item v-for="x in navNameArray" :id="x.id">{{x.name}}</mt-tab-item>
         <!--  <mt-tab-item :id="2">推荐</mt-tab-item>
          <mt-tab-item :id="3">金融</mt-tab-item>
          <mt-tab-item :id="4">体育</mt-tab-item>
          <mt-tab-item :id="5">游戏</mt-tab-item>
          <mt-tab-item :id="6">我的</mt-tab-item>
          <mt-tab-item :id="end">已结束</mt-tab-item> -->
        </mt-navbar>
      </div>
      <div >
        <mt-tab-container v-model="selected"  >
              <mt-tab-container-item :id="1" :class="isSwiper==false?'Hidden':'content'">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore1" :bottom-method='loadBottom'  :bottom-all-loaded="allLoaded" :bottomAllLoaded='bottomAllLoaded'>
                   <ul><li> <carousel  v-for="item in dataArray" :dataProp='item' ></carousel></li> </ul>
                </mt-loadmore>
              </mt-tab-container-item>
              
              <mt-tab-container-item :id="2"  :class="isSwiper==false?'Hidden':'content'">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded"         :auto-fill="false" ref="loadmore2"  :bottom-method='loadBottom'>
                   <ul>
                    <li>
                      <end v-for="item in dataArray" :dataProp='item'></end>
                    </li> 
                  </ul>
                </mt-loadmore>
              </mt-tab-container-item>
              
               <mt-tab-container-item :id="3"  :class="isSwiper==false?'Hidden':'content'">
                  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-all-loaded="allLoaded"         :auto-fill="false" ref="loadmore3"  :bottom-method='loadBottom'>
                     <ul><li>
                      <my v-for="item in dataArray" :dataProp='item' v-show="item.result"></my>
                      <alend v-for="item in dataArray" :dataProp='item' v-show="!item.result"></alend>
                    </li> </ul>
                  </mt-loadmore>
                </mt-tab-container-item>
               <router-view></router-view>
          </mt-tab-container>
        </div>
      
    </div>
  </div>
</template>

<script>
import carousel from "../components/carousel.vue";
import my from "../views/indexpage/my.vue";
import end from "../views/indexpage/end.vue";
import alend from "../views/indexpage/alreadEnd.vue";
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
      bottomAllLoaded:false,
      pageArray:[true,false,false],
      //   "体育","游戏","我的","已结束"
      navNameArray:[
        {
          id:1,
          name:"推荐"
        },
        {
          id:2,
          name:"体育"
        },
        {
          id:3,
          name:"游戏"
        },
        {
          id:4,
          name:"我的"
        },
        {
          id:5,
          name:"已结束"
        },
        {
          id:6,
          name:"金融"
        },
        {
          id:7,
          name:"哈哈"
        },
        ],
      dataArray:[],
      topStatus:'',
      allLoaded:false,
      tag:'eq',
      type:'tag',
      totalPage:'',
      // bottomDistance:'70',
      isSwiper:true,
      LoadTopDom:null,
      loadBottomDom:null,
      startTop:0
    }
  },  
  mounted() {
    // if(this.isSwiper==true){
    //   window.addEventListener('scroll', this.handleScroll,true)
    // }
    this.box = this.$refs.viewBox;

    // this.$refs.viewBox.scrollTop = -100;
    this.box.addEventListener('scroll', () => {
      // console.log(" scroll " + this.$refs.viewBox.scrollTop)
      // this.$refs.viewBox.scrollTop ;
      
      //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
      this.handleScroll(this.$refs.viewBox.scrollTop);
    }, false)
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
           this.totalPage = response.body.totalPage;
            if(this.totalPage == 1){
              this.bottomAllLoaded =true;
            }
           this.$refs.loadmore1.onTopLoaded();
           this.$refs.loadmore1.onBottomLoaded();
           this.$refs.loadmore2.onTopLoaded();
           this.$refs.loadmore2.onBottomLoaded();
           this.$refs.loadmore3.onTopLoaded();
           this.$refs.loadmore3.onBottomLoaded();
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    handleScroll (scrollTop) {
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop)
      var swiperDom = this.$refs.swiper;
      var navDom = this.$refs.navbar;
      var swiperH = 0;
      if(swiperDom){
        swiperH = swiperDom.clientHeight;
      }
      if(scrollTop > swiperH){
        this.isSwiper =false;
        if(navDom){
            navDom.style.width='100%';
            navDom.style.position = 'fixed';
            navDom.style.zIndex  = '1';
            navDom.style.backgroundColor = '#FFF'
        }
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
      
    },
    loadBottom(){
      if(this.totalPage < this.page){
        this.page++;
        this.fetch();
      }else{
        this.bottomAllLoaded =true;
        this.$refs.loadmore1.onBottomLoaded();
      }
    }
  },
  watch: {
    
    "selected"() {
      // this.startTop = 0;
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
      end,
      alend
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
    // margin-top:1.3rem;

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
          position:absolute;
          width: 100%;
          height:100%;
          top: 0;
          // bottom: 2rem;
          // overflow: auto;
          // z-index: 0;
          .swiper{
            background-color:#FFF;
            height:5rem;
            width:98%;
            margin:0 auto;
            // margin-top:1.5rem;
            margin-bottom:.1rem;
            .mint-swipe-item {
              backgorund-color:red;
            }
          }
        }
      
      .Hidden{
        margin-top:1.5rem;
      }
      // .content{

      // }
      .nav{
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
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
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom:3px solid red;
    color:red;
  }
  
</style>