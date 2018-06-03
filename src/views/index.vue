<template>
  <div class="contain">
  <!--   <div class="nav-bar">首页</div> -->
   <!--  <div class="search">
      <span class="text"><i class="iconfont icon-sousuo"></i>搜索商品 分类 功效 用户</span>
    </div> -->
     <div class="clicle" @click="stepRank()">
    
     </div>
     <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore1" :bottom-method='loadBottom'   :bottomAllLoaded='bottomAllLoaded'>

      <div class="wrapper"  ref="viewBox" >
        <div class="swiper"  v-show="isSwiper" ref="swiper">
          <mt-swipe  :auto="5000"> 
            <mt-swipe-item >
              <img src="https://ydb.anydd.com/images/app/banner5.jpg" width="100%" height="100%" @click='stepRank()'>
              <!-- <router-link to="/error"></router-link> -->
            </mt-swipe-item>
            <mt-swipe-item >
              <img src="https://ydb.anydd.com/images/app/banner1.jpg" width="100%" height="100%" >
              <!-- <router-link to="/error"></router-link> -->
            </mt-swipe-item>
            <mt-swipe-item >
              <img src="http://ydb.anydd.com/images/app/banner4.jpg" width="100%" height="100%" >
              <!-- <router-link to="/error"></router-link> -->
            </mt-swipe-item>
             <mt-swipe-item><img src="https://ydb.anydd.com/images/app/banner3.jpg" width="100%" height="100%" @click="step"></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="nav" ref="navbar" :class="{fix:isFix}">
          <mt-navbar v-model="selected" >
            <mt-tab-item v-for="x in navNameArray" :id="x.id" :key='x.id'>{{x.name}}</mt-tab-item>
            </mt-navbar>
        </div>
        <mt-tab-container v-model="selected"  >
              <mt-tab-container-item :id="1" :class="isSwiper==false?'Hidden':'content'">
                   <ul><li> <carousel  v-for="item in dataArray" :dataProp='item' :key='item.index'></carousel></li> </ul>
              </mt-tab-container-item>

              <mt-tab-container-item :id="2"  :class="isSwiper==false?'Hidden':'content'">
                   <ul>
                    <li>
                      <carousel v-for="item in dataArray" :dataProp='item' :key='item.index'></carousel>
                    </li> 
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item :id="3"  :class="isSwiper==false?'Hidden':'content'">
                   <ul>
                    <li>
                      <carousel v-for="item in dataArray" :dataProp='item' :key='item.index'></carousel>
                    </li> 
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item :id="4"  :class="isSwiper==false?'Hidden':'content'">
                   <ul>
                    <li>
                      <carousel v-for="item in dataArray" :dataProp='item' :key='item.index'></carousel>
                    </li> 
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item :id="5"  :class="isSwiper==false?'Hidden':'content'">
                   <ul>
                    <li>
                      <carousel v-for="item in dataArray" :dataProp='item' :key='item.index'></carousel>
                    </li> 
                  </ul>
              </mt-tab-container-item>

              <mt-tab-container-item :id="7"  :class="isSwiper==false?'Hidden':'content'">
                   <ul>
                    <li>
                      <end v-for="item in dataArray" :dataProp='item' :key='item.index'></end>
                    </li> 
                  </ul>
              </mt-tab-container-item>

               <mt-tab-container-item :id="6"  :class="isSwiper==false?'Hidden':'content'">
                     <ul><li>
                        <my v-for="item in dataArray" :dataProp='item' v-show="item.result" :key='item.index'></my>
                      <alend v-for="item in dataArray" :dataProp='item' v-show="!item.result" :key='item.index'></alend>
                    </li> </ul>
                </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </mt-loadmore>
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
      pageArray:[true,false,false,false,false,false,false],
      bottomDistance:0,
      navNameArray:[
        {
          id:1,
          name:"热门"
        },
        {
          id:4,
          name:"区块链"
        },
        {
          id:2,
          name:"金融"
        },
        {
          id:3,
          name:"体育"
        },
        
        {
          id:5,
          name:"其他"
        },
        {
          id:6,
          name:"我的"
        },
        {
          id:7,
          name:"已结束"
        },
        ],
      dataArray:[],
      topStatus:'',
      allLoaded:false,
      tag:'',
      type:'tag',
      totalPage:'',
      // bottomDistance:'70',
      isSwiper:true,
      LoadTopDom:null,
      loadBottomDom:null,
      startTop:0,
      isFix:false,
    }
  },  
  mounted() {
    if(this.isSwiper==true){
      window.addEventListener('scroll', this.handleScroll,true)
    }
    // this.box = this.$refs.viewBox;

    // // this.$refs.viewBox.scrollTop = -100;
    // this.box.addEventListener('scroll', () => {
    //   // console.log(" scroll " + this.$refs.viewBox.scrollTop)
    //   // this.$refs.viewBox.scrollTop ;
      
    //   //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
    //   this.handleScroll(this.$refs.viewBox.scrollTop);
    // }, false)
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch(){
      Indicator.open('Loading...');
      this.dataArray = null;
      var params ={}
       params={
          type:this.type,
          pageNo:this.page,
          tag:this.tag
       }
       
       getList(params).then(response => {
           var dataResult = response.body.result;
           var dataArray =[];
           // alert(resultArray.length);
           for(var i = 0 ; i< dataResult.length; i++){
              dataArray.push(dataResult[i])
           }
           this.dataArray = dataArray;
           this.totalPage = response.body.totalPage;
            if(this.totalPage == 1){
              // this.bottomAllLoaded =true;
            }
           this.$refs.loadmore1.onTopLoaded();
           this.$refs.loadmore1.onBottomLoaded();
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    step(){
      this.$router.push({
        name:'banner1'
      })
    },
    stepRank(){
      this.$router.push({
        name:'ranking'
      })
    },
    handleScroll (scrollTop) {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
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
          this.isFix=true;
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
      this.dataArray=[];
      this.page=1;
      this.fetch();
    },
    loadBottom(){
      if(this.totalPage > this.page){
        this.page++;
        this.fetch();
      }else{
        // this.bottomAllLoaded =true;
        this.$refs.loadmore1.onBottomLoaded();
      }
    }
  },
  watch: {
    "selected"() {
        this.dataArray=[];
        var num =this.selected-1;
        var tagArray =['','finance','pe','entertainment','other'];
        var typeArray =['tag','end','mine'];
        if(num < 5){
          this.pageArray[num] = true;
          this.type=typeArray[0];
          this.tag = tagArray[num]
          this.fetch();
        }else if(num > 4){
          this.tag ="";
          this.type = typeArray[7-num];
          this.fetch();
        }else{
          this.pageArray[i] =false;
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
<style lang='scss'>
.mint-tabbar>.mint-tab-item.is-selected{
  background-color: #FFF;
  color: red;
}
</style>  
<style lang="scss" scoped>
@import "../common/mixin.scss";
@import "../common/style.scss";
  
  .contain {
    .clicle{
      border-radius:50%;
      width:1rem;
      height:1rem;
      // background:$mainColor;
      color:#fff;
      line-height:1rem;
      position:fixed;
      bottom:1.8rem;;
      z-index:9999;
      right:.2rem;
      // border:1px solid $mainColor;
      background-image: url('https://ydb.anydd.com/images/app/rankicon.png');
      background-repeat:no-repeat;
      background-size:cover;
      width:1.3rem;
      height:1.3rem;
    }
    // margin-bottom:1.5rem;
    // margin-top:1.3rem;
    // position:absolute;
    // width: 100%;
    // height:100%;
    // top: 0;
    // bottom: 1.5rem;
    // overflow: auto;

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
          // position:absolute;
          // width: 100%;
          // top: 0;
          // height:10rem;
          // bottom: 1.5rem;
          // overflow: auto;
          // z-index: 0;
          margin-bottom:1.7rem;
          .swiper{
            // .swiper-img{
            //    background-image: url('https://ydb.anydd.com/images/app/banner1.jpg');
            //    background-size:100%;
            //    background-repeat:no-repeat;
            //    width:100%;
            //    height:6rem;
            // }
              background-color:#FFF;
              height:5.3rem;
              width:100%;
              margin:0 auto;
              // margin-top:1.5rem;
              margin-bottom:0;
              .mint-swipe-item {
                backgorund-color:red;
              }
            }
          }
      
      .Hidden{
        margin-top:1.3rem;
      }
      // .content{

      // }
      .nav{
        // border-top:1px solid #ccc;
        @include border-1px;
        li{
          font-size:.4rem;
        }
      }
      .fix{
        position: fixed;
        width: 100%;
        z-index:2;
        background:#fff;
      }
      .mint-tab-item{
          text-decoration: none;
      }
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom:3px solid red;
    color:red;
  }

  .mint-tab-item-label{
    color: inherit;
    font-size: 12px;
    line-height: .3;
  }
  
</style>