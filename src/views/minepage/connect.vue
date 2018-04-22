<template>
   <div class="contain">
     <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">联系客服</span>
        </div>
      </div>
      <ul class="content">
        <li v-for="x in items">
          <div>{{x.label}}</div>
          <div>{{x.text}}</div>
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
        height:1.3rem;
        border-bottom:1px solid #ccc;
        line-height:1.3rem;
        font-size:.35rem;
        display:flex;
        justify-content:space-between;
        div{
          margin:0 .4rem;
          font-size:.4rem;
        }
      }
    }
    
  }
  

</style>
