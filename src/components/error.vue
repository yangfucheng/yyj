<template>
   <div class="contain">
      
   </div>
</template>

<script>

import { Indicator,Loadmore } from 'mint-ui';
export default {
  data () {
    return {
      items:[
      ],
      value:'',
      allLoaded:false,
      page:1,
      totalPage:'',
      bottomDistance:200
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  filters: {

  },
  watch:{
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../common/mixin.scss";
  @import "../../common/style.scss";
   div.mint-loadmore-bottom{
      display:none;
      background:red;
    }
  .contain{
    .mt-wrap{
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      height:100%;
      width:100%;
      overflow: scroll;
      .mint-loadmore-content{
        height:100%;
      }
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
