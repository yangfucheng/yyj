<template>
	<div class="footer">
    <mt-tabbar v-model="selected" fixed class="border-1px-top">
      <mt-tab-item id="首页" >
        <img :src="img1" slot="icon">首页
      </mt-tab-item>
      <mt-tab-item id="市场预测" >
        <img :src="img2" slot="icon">市场预测
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img :src="img3" slot="icon">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: "首页",
      img1: "static/icon/indexchoose.png",
      img2: "static/icon/toupiao.png",
      img3: "static/icon/me.png",
    }
  },
  computed: {
    otherSelect () {
      alert(this.$store.state.selectTab)
      return this.$store.state.selectTab
    }
  },
  watch: {
    // 监听 是否从其他的页面跳转过来的数据
    "otherSelect" () {
      this.selected = this.otherSelect
    },
    // this.$.router.push({name: ''})
    // 固定的书写 ""双引号里面是要监听的数据 handler是处理数据改变的函数 deep是否深度监听
    "selected": {
      handler (val,oldval) { //多看文档 handler
        if (this.selected == "首页") {
          this.$router.push('/')
          this.img1="static/icon/indexchoose.png"
        } else {
          this.img1="static/icon/index.png"
        }
        if (this.selected == "市场预测") {
          this.$router.push('/brandsale')
          this.img2="static/icon/toupiao.png"
        } else {
          this.img2="static/icon/toupiao.png"
        }
        if (this.selected == "我的") {
          this.$router.push('/myself')
          this.img3="static/icon/mechoose.png"
        } else {
          this.img3="static/icon/me.png"
        }
      }
      // deep:true//对象内部的属性监听，也叫深度监听
    }
  }
}
</script>

<style lang="scss" scoped>

.mint-tabbar{
  border-top:1px solid #ccc;
  background:#fff;
  height: 1.3rem;
  padding-top:-.4rem;
}
.is-selected{
    color :#FE4070;
    background :#fff;
    text-decoration: none;
  }
</style>