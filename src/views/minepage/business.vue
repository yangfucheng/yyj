<template>
   <div class="contain">
     <div class="back-nav-bar">
        <div class="nav-container">
          <router-link to="/myself">
            <i class="iconfont icon-huitui"></i>
          </router-link>
          <span class="nav-title">流水记录</span>
        </div>
      </div>
      <div class="header">
        <div>
          <div style="font-size:.4rem;margin-bottom:.1rem;">结算货币</div>
          <div >
              <el-select v-model="value" style="width:2.5rem;">
                <el-option label="GXS" value="GXS"></el-option>
                <el-option label="FPS" value="FPS"></el-option>
              </el-select>
          </div>
        </div>
        <div style="font-size:.5rem;margin-top:.8rem;">
          <span>筛选</span>
          <span style="align-self:center"><i class="iconfont icon-shaixuan1"></i></span>
        </div>
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="content">
          <li v-for="x in items">
            <div>
              <div class="way">
                <div>下注支付</div>
                <div>{{x.createTime | changeTime}}</div>
              </div>
              <div class="price">
                <div>#比特币价格#</div>
                <div>{{x.amount}}</div>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
   </div>
</template>

<script>
import { record } from '../../api/api.js'
import {timestampToTime} from '../../untils/enums.js'
export default {
  data () {
    return {
      items:[
      ],
      value:'GXS',
      allLoaded:true,
      page:''

    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  filters: {
    changeTime(value){
      return timestampToTime(value);
    }
  },
  methods: {
    fetch(){
      var params={
          coin:"",
          page:this.page
       }
      record(params).then(response => {
        this.items = response.body.result;
      })
    },
    loadTop(){

    },
    loadBottom(){

    },
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
  @import "../../common/mixin.scss";
  @import "../../common/style.scss";
  .contain{
    position:relative;
    .header{
      border-bottom:1px solid #ccc;
      // padding:.5rem 0;
      padding:.2rem .5rem;
      display:flex;
      justify-content:space-between;
    }
    .content{
      width:100%;
      li{
        height:1.5rem;
        border-bottom:1px solid #ccc;
        line-height:1.3rem;
        font-size:.35rem;
        div{
           margin:0 .2rem;
          .way{
           display:flex;
           justify-content:space-between;
           height:1rem;
           div:nth-child(1){
              font-size:.5rem;
              font-weight:400;
           }
        }
        .price{
           display:flex;
           justify-content:space-between;
           height:1rem;
           div{
            margin-top:-.4rem;
           }
           div:nth-child(1){
              font-size:.39rem;
              font-weight:400;
           }
           div:nth-child(2){
              font-size:.4rem;
              font-weight:600;
           }
          }
        }
      }
    }
    
  } 

</style>
