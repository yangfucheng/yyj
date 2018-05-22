<template>
   <div class="contain">
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
          <li v-for="x in items" @click="step(x)">
            <div class="wrap">
              <div class="way">
                <div>下注支付</div>
                <div style="overflow:hidden; width: 3rem;white-space: nowrap;text-overflow: ellipsis;color:#888888">{{x.memo}}</div>
              </div>
              <div class="price">
                <div>{{x.createTime | changeTime}}</div>
                <div style="text-align:right;">{{x.amount}}</div>
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
        this.$refs.loadmore.onTopLoaded();
      })
    },
    loadTop(){
      this.fetch();
    },
    loadBottom(){

    },
    step(id) {
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
      width:95%;
      margin:0 auto;

      li{
        border-bottom:1px solid #ccc;
        .wrap{
           height:1.3rem;
           line-height:.65rem;
           display:flex;
           justify-content:space-between;
        }
      }
    }
  } 

</style>
