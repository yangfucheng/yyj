<template>
   <div class="contain">
      <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">详情</span>
        </div>
      </div>
      <mt-navbar v-model="selected" class="nav">
	      <mt-tab-item :id="1" ><span class="font">投票项目</span></mt-tab-item>
	      <mt-tab-item :id="2"><span class="font">市场预测项目</span></mt-tab-item>
	      <mt-tab-item :id="3"><span class="font">我发起的</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
	      <mt-tab-container-item v-for="n in 3" :id="n">
	      </mt-tab-container-item>
      </mt-tab-container>
      <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="n in 7" :id="n">
          <carousel  v-show="true"></carousel>
      </mt-tab-container-item>
    </mt-tab-container>

   </div>

</template>

<script>
import carousel from "../../components/carousel.vue";
export default {
  name: 'HelloWorld',
  data () {
    return {
    	selected:1,		
      	id:1
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  components:{
	  carousel,
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/mixin.scss";
@import  '../../common/style.scss';
.contain {
	position:relative;
	.nav{
      	border-bottom:1px solid #e0e0e0;
      	.font{
			font-size:.4rem;;
		}
	}
	
    .is-selected{
    	border-bottom: 3px solid $mainColor;
    	color:#000;
    }

}
</style>