<template>
  <div class="contain" >
  <!--   <div class="nav-bar">首页</div> -->
   <!--  <div class="search">
      <span class="text"><i class="iconfont icon-sousuo"></i>搜索商品 分类 功效 用户</span>
    </div> -->
     <div class="clicle" @click="stepRank()">
       排行榜
     </div>
    
     
      <div class="all-wraper" ref="allWraper" >
        <div class="swiper"  v-show="true" ref="swiper">
          <mt-swipe  :auto="5000"> 
            <mt-swipe-item >
              <img src="https://ydb.anydd.com/images/app/banner1.jpg" width="100%" height="100%" >
            
            </mt-swipe-item>
            <mt-swipe-item >
              <img src="http://ydb.anydd.com/images/app/banner4.jpg" width="100%" height="100%" >
            
            </mt-swipe-item>
             <mt-swipe-item><img src="https://ydb.anydd.com/images/app/banner3.jpg" width="100%" height="100%" @click="step"></mt-swipe-item>
          </mt-swipe>
        </div>
        <div ref="navs" class="nav" >
          <navbar :navs="navs" :chooseItem="chooseItem" class="navbar" ></navbar>
        </div>
        <v-touch @swipeleft="onSwipeleft" @swiperight="onSwipeRight" :priority="1">
          <transition :name="transitionName">
            <div class="wrapper" ref="wrapper">
              <ul>
                <div class="refresh" v-show="refresh">{{refreshMsg}}</div>
                <li>
                  <carousel v-for="item in dataArray" :dataProp='item'  :key="item.index"   class="Route"></carousel>
                </li> 
              </ul>
            </div>
          </transition>
        </v-touch>
       

              <!-- </mt-tab-container-item> -->

             <!--   <mt-tab-container-item :id="6"  :class="isSwiper==false?'Hidden':'content'" >
                     <ul ><li>
                        <my v-for="item in dataArray" :dataProp='item' v-show="item.result"></my>
                      <alend v-for="item in dataArray" :dataProp='item' v-show="!item.result"></alend>
                    </li> </ul>
                </mt-tab-container-item> -->
          <!-- </mt-tab-container> -->
       
   
      </div>
   
  </div>
</template>

<script>
import carousel from "../components/carousel.vue";
import my from "../views/indexpage/my.vue";
import end from "../views/indexpage/end.vue";
import alend from "../views/indexpage/alreadEnd.vue";
import navbar from "../components/navBar.vue";
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
      navs: ['热门','区块链','金融','体育','其他','我的','已结束'],
      transitionName: 'slide-right',
      chooseItem: 0,
      refresh:false,
      pullup:{  
        type:Boolean,  
        default:false  
      },  
       pulldown:{  
        type:Boolean,  
        default:true  
      },  
      refreshMsg:'下拉刷新',
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
      startTop:0
    }
  },  
  mounted() {
    // if(this.isSwiper==true){
    //   window.addEventListener('scroll', this.handleScroll,true)
    // }
    this.box = this.$refs.wrapper;

    // this.$refs.viewBox.scrollTop = -100;
    // this.box.addEventListener('scroll', () => {
      // console.log(" scroll " + this.$refs.viewBox.scrollTop)
      // this.$refs.viewBox.scrollTop ;
      
      //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
      // this.handleScroll(this.$refs.wrapper.scrollTop);
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
          type:'tag',
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
          this.$nextTick(() => { 
            
            if (!this.scroll) {
              this._initScroll();
              // this._initAllScroll();
              }
          })
           // this.$refs.loadmore1.onTopLoaded();
           // this.$refs.loadmore1.onBottomLoaded();
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    onSwipeleft(){
       this.chooseItem++
       console.log(1111)
    },
    onSwipeRight(){
        // console.log(1111)
        let index = 1
        let back = ""
        index =  +this.chooseItem
        index > 1  ?  (back = "page" + (index - 1)) &&(this.chooseItem = index - 1) && (this.chooseItem = +index - 1)
       : (back="page1") && (this.chooseItem = 1)
       // this.$router.push('/index/' + back)
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
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click:true,
          probeType: 3
        });
        var count = 0;
        this.scroll.on('scroll', (pos) => {
              //scrollY接收变量
             
              this.scrollY = Math.abs(Math.round(pos.y));
              
              count++;
              if(Math.round(pos.y) > -220 && Math.round(pos.y) < 200  && count < 170){
                count = this.scrollY
                let wrapperDom = this.$refs.wrapper;
                wrapperDom.style.top = (250 - this.scrollY) +'px';
                wrapperDom.style.paddingTop  = (this.scrollY) +'px';
                if(Math.round(pos.y) < -10){
                    this.$refs.swiper.style.top=-(this.scrollY) +'px';
                    this.$refs.swiper.style.opacity =1-(this.scrollY/200);  
                    this.$refs.navs.style.top=(95 - this.scrollY) +'px';           
                }
              }else{
                this.$refs.swiper.style.opacity =0;//让
                this.$refs.navs.style.opacity=1;
                this.$refs.navs.style.top=-2.8 +'rem';
                this.$refs.wrapper.style.top = 1.2 +'rem'
                this.$refs.wrapper.style.paddingTop = 0 +'px'  
              }
              // console.log(pos.y);
              if(pos.y > 20){
                console.log('yfch');
                this.refresh = true;
                this.refreshMsg ='释放刷新'
                this.scroll.on('touchEnd',()=>{
                  this.fetch();
                  this.refresh = false;
                })
              }
        })

        // this.scroll.on('pullingUp',()=>{

        // })

         

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
      alend,
      navbar
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
      background:$mainColor;
      color:#fff;
      line-height:1rem;
      position:fixed;
      bottom:3rem;;
      z-index:9999;
      right:1rem;
      border:1px solid $mainColor;
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
        .swiper{
            // .swiper-img{
            //    background-image: url('https://ydb.anydd.com/images/app/banner1.jpg');
            //    background-size:100%;
            //    background-repeat:no-repeat;
            //    width:100%;
            //    height:6rem;
            // }
          position:absolute;
          top:0;
          left:0;
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

        .nav{
          position:absolute;
          top:2.5rem;
          left:0;
          background-color:#FFF;
          // height:1.3rem;
          width:100%;
          margin:0 auto;
          z-index:1111;
        }

        .wrapper{
          .refresh{
            width:100%;
            text-align: center;
          }
          width: 100%;
          position:absolute;
          top: 6.5rem;;
          bottom: 2rem  ;
          overflow: hidden;
          z-index: 1;
          .Router{
            width:100%;
            transition: all .4s ease;
            // slide-right-leave-active 右滑动 左路由 
            //在过渡的结束状态 跳向下一个的页面的透明度要设置为0  过渡结束的时候都是不显示的
            // slide-right-enter中的透明度为0 代表过渡刚进入也是不显示的
            &.slide-left-enter, &.slide-right-leave-active{ 
              opacity: 0;
              // 向左滑动 其实路由向右走 然后
              transform: translateX(100%);
            }
            &.slide-left-leave-active, &.slide-right-enter{
              opacity:0;
              transform: translateX(-100%);
            }
          }
        }
      
      .Hidden{
        margin-top:1.3rem;
      }
      // .content{

      // }
      // .nav{
      //   // border-top:1px solid #ccc;
      //   @include border-1px;
      //   li{
      //     font-size:.4rem;
      //   }
      // }
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