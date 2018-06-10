<template>
   <div class="contain">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottomAllLoaded="bottomAllLoaded" ref="loadmore" class="mt-wrap" :auto-fill="false" >
            <div class="header" >
            <div>
              <div class="wrap">
                <!-- <span style="font-size:.4rem;margin-bottom:.1rem;">结算货币</span> -->
                <span >
                    <el-select v-model="value1"  placeholder="请选择币种" style="margin-top:.3rem; width:4rem;">
                      <el-option label="全部币种" value=""></el-option>
                      <el-option label="GXS" value="GXS"></el-option>
                      <el-option label="PPS" value="PPS"></el-option>
                    </el-select>
                </span>

                <span >
                    <el-select v-model="tag"  placeholder="请选择分类" style="margin-top:.3rem; width:4rem;">
                      <el-option label="全部摘要" value=""></el-option>
                      <el-option label="获得奖励" value="award"></el-option>
                      <el-option label="买入支付" value="bet"></el-option>
                      <el-option label="空投奖励" value="air_drop"></el-option>
                      <el-option label="充值" value="recharge"></el-option>
                      <el-option label="提现" value="withdraw"></el-option>
                      <el-option label="邀请奖励" value="invite"></el-option>
                    </el-select>
                </span>
              </div>
            </div>
            <!-- <div style="font-size:.5rem;margin-top:.6rem;" @click="demo()">
              <span>筛选</span>
              <span style="align-self:center"><i class="iconfont icon-shaixuan1"></i></span>
            </div> -->
            </div>
            <ul class="content">
              <li v-for="x in items" @click="stepDetail(x)">
                <div class="wrap">
                  <div class="way">
                    <div>{{x.tag | changeRecode}}</div>
                    <div style="overflow:hidden; width: 3rem;white-space: nowrap;text-overflow: ellipsis;color:#888888">{{x.memo}}</div>
                  </div>
                  <div class="price">
                    <div>{{x.createTime | changeTime}}</div>
                    <div style="text-align:right;" :class="x.amount > 0?'green':'red'">{{x.amount | formatNum}}{{x.tradeCoin}}</div>
                  </div>
                </div>
              </li>
            </ul>
         </mt-loadmore>     
     </div>
</template>

<script>
import { record } from '../../api/api.js'
import {timestampToTime,recodeDec,getTextByName,numTampTofloat} from '../../untils/enums.js'
import { Indicator,Loadmore } from 'mint-ui';
export default {
  data () {
    return {
      items:[
      ],
      value1:'',
      bottomAllLoaded:false,
      page:1,
      totalPage:'',
      bottomDistance:200,
      tag:''
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  mounted() {
    // this.$refs.mtWrap.style.height = document.documentElement.clientHeight + 'px';
  },
  filters: {
    changeTime(value){
      return timestampToTime(value);
    },
    changeRecode(value){
      return getTextByName(recodeDec,value);
    },
    formatNum(value){
      return numTampTofloat(value);
    }
  },
  watch:{
    'value1'(){
      this.items =[];
      this.fetch();
    },
    'tag'(){
      this.items =[];
      this.fetch();
    }
  },
  methods: {

    fetch(){
      Indicator.open();
      var params={
          coin:this.value1,
          pageNo:this.page,
          tag:this.tag
       }
      record(params).then(response => {
        Indicator.close();
        // this.items = response.body.result;
        // for(var i = 0 ; i<this.items.length ; i++){
        //    this.items.push(this.items[i]);
        // }
         this.totalPage =response.body.totalPage;
          if(this.totalPage == 1){
              this.bottomAllLoaded =true;

          }
         var dataResult = response.body.result;
         for(var i = 0 ; i< dataResult.length; i++){
            this.items.push(dataResult[i]);
         }
          this.$refs.loadmore.onTopLoaded();
          this.$refs.loadmore.onBottomLoaded();
        })
    },
    demo(){
      this.fetch();
    },
    loadTop(){
      this.items =[];
      this.page=1;
      this.fetch();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
       if(this.totalPage > this.page){
          this.page++;
          this.fetch();
        }else{
          this.bottomAllLoaded =true;
          this.$refs.loadmore.onBottomLoaded();
        }
    },
    stepDetail(id) {
      this.$router.push({
        name:'recodeDetail',
        params:{
          id:id
        }
      })
    }
  }
}
</script>
<style>
 /* .mint-loadmore-text{
    display: none;
  } */
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../common/mixin.scss";
  @import "../../common/style.scss";
  @import "../../common/my-mint.scss";

  .contain{
    .mt-wrap{
      // position:absolute;
      // top:0;
      // left:0;
      // bottom:0;
      // height:100%;
      // width:100%;
      // overflow: auto;
    }
    .header{
      border-bottom:1px solid #ccc;
      // padding:.5rem 0;
      padding:.2rem .5rem;
      display:flex;
      justify-content:space-between;
    }
    .content{
      width:95%;
      margin:0 auto;
      height:100%;
      li{
        border-bottom:1px solid #ccc;
        .wrap{
           height:1.3rem;
           margin-top:.2rem;
           line-height:.65rem;
           display:flex;
           justify-content:space-between;
           .green{
             color:#1AC5BB;
             font-size:.4rem;
           }
           .red{
             color:red;
             font-size:.4rem;
           }
        }
      }
    }
  } 


</style>
