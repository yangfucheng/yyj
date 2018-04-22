<template>
   <div class="contain">
     <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">流水记录</span>
        </div>
      </div>
      <ul class="content">
        <li v-for="x in items">
          <div>
            <div class="way">
              <div>{{x.label}}</div>
              <div>{{x.text}}</div>
            </div>
            <div class="price">
              <div>#{{x.label}}#</div>
              <div>{{x.text}}</div>
            </div>
          </div>
        </li>
      </ul>
   </div>
</template>

<script>
export default {
  data () {
    return {
      items:[
        {
          label:'官方邮箱',
          text:'yuyanjia_prophet@163.com'
        },
        {
          label:'客服QQ',
          text:'2139258026'
        },
        {
          label:'客服电话',
          text:'123'
        },
        {
          label:'微信公众号',
          text:'预言家Prophet'
        },
      ]
    }
  },
  methods: {
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
