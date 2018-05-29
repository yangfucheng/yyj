<template>
	<div class="footer">
    <mt-tabbar v-model="selected" fixed class="border-1px-top">
      <mt-tab-item id="预测市场" >
        <img :src="img1" slot="icon"><span>预测市场</span>
      </mt-tab-item>
      <mt-tab-item id="投票" >
        <img :src="img2" slot="icon"><span>投票</span>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img :src="img3" slot="icon" width="48" height="48"><span>我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      selected: "预测市场",
      img1: "static/icon/yucec.png",
      img2: "static/icon/index.png",
      img3: "static/icon/my2.png",
    }
  },
  computed: {
    otherSelect () {
      return this.$store.state.selectTab
    }
  },
  watch: {
    "otherSelect" () {
      this.selected = this.otherSelect
    },
    // this.$.router.push({name: ''})
    // 固定的书写 ""双引号里面是要监听的数据 handler是处理数据改变的函数 deep是否深度监听
    "selected": {
      handler (val,oldval) { //多看文档 handler
        if (this.selected == "投票") {
          this.$router.push('/vote')
          Toast({
            message: '暂未开放',
            position: 'middle',
            duration: 2000
          });
          this.img2="static/icon/indexchoose.png"
        } else {
          this.img2="static/icon/index.png"
        }
        if (this.selected == "预测市场") {
          this.$router.push('/')
          this.img1="static/icon/yucec.png"
        }else{
          this.img1="static/icon/yuce.png"
        }
        if (this.selected == "我的") {
          this.$router.push('/myself')
          this.img3="static/icon/mechoose.png"
        } else {
          this.img3="static/icon/my2.png"
        }
      }
      // deep:true//对象内部的属性监听，也叫深度监听
    },
    '$route'(){
      // alert(this.$route.path)
      var routeStr = this.$route.path;
      if(this.$route.path == '/myself'){
        this.selected = '我的';
      }else if(this.$route.path == '/'){
        this.selected = '预测市场';
      }else if(this.$route.path == '/vote'){
        this.selected = '投票';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/mixin.scss";
@import "../common/style.scss";

 // a:hover{text-decoration:none;}
 // .mint-tabbar > .mint-tab-item.is-selected{
 //  background:#FFF;
 //  background-color:#FFF;
 //  color:$mainColor;
 // }

 // .mint-tabbar{
 //  background:#FFF;
 //  @include border-1px-top;
 // }

 // .mint-tabbar.is-fixed{
 //  background: #FFF;
 // }


.mint-tabbar{
  border-top:1px solid #e0e0e0;
  background:#fff;
  // height: 1.5rem;
  align-items:center;
  .is-selected{
    background:#FFF;
    // border-top:1px solid #e0e0e0;
    text-decoration: none;
    color:#1AC6BC;
  }
}

</style>