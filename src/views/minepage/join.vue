<template>
   <div class="contain">
     <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore" :bottom-method='loadBottom'   :bottomAllLoaded='bottomAllLoaded' >
        <mt-navbar v-model="selected" class="nav">
  	      <mt-tab-item :id="1" ><span class="font">进行中</span></mt-tab-item>
  	      <mt-tab-item :id="2"><span class="font">停止下注</span></mt-tab-item>
          <mt-tab-item :id="3"><span class="font">已结束</span></mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
  	      <mt-tab-container-item  :id="1">
               <alend v-for="item in dataArray" :dataProp='item' ></alend>
  	      </mt-tab-container-item>
        </mt-tab-container>
        <mt-tab-container v-model="selected">
        <mt-tab-container-item  :id="2">
            <alend v-for="item in dataArray" :dataProp='item' ></alend>
        </mt-tab-container-item>
         <mt-tab-container-item :id="3">
            <my v-for="item in dataArray" :dataProp='item' ></my>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
   </div>

</template>


<script>
import my from "../../views/indexpage/my.vue";
import alend from "../../views/indexpage/alreadEnd.vue";
import { getList } from '../../api/api.js';
import { Loadmore,Indicator } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
    	selected:1,		
      id:1,
      page:0,
      bottomAllLoaded:false,
      dataArray:[],
      status:'online'
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  methods: {
    fetch(){
      Indicator.open('Loading...');
      this.dataArray = null;
      var params ={}
       params={
          type:'mine',
          page:this.page,
          status:this.status
       }
       getList(params).then(response => {
           this.dataArray = response.body.result;
           this.totalPage = response.body.totalPage;
            if(this.totalPage == 1){
              this.bottomAllLoaded =true;
            }
           this.$refs.loadmore.onTopLoaded();
           this.$refs.loadmore.onBottomLoaded();
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    loadTop(){
      this.page=1;
      this.fetch();
    },
    loadBottom(){
      if(this.totalPage < this.page){
        this.page++;
        this.fetch();
      }else{
        this.bottomAllLoaded =true;
        this.$refs.loadmore1.onBottomLoaded();
      }
    },
    handleTopChange(status) {
        this.topStatus = status;
    },
  },
  watch: {
      "selected"() {
          var num =this.selected-1;
          var statusArray =["online","wait_result",'complete'];
          this.status =statusArray[num];
          this.fetch();
      }
  },
  components:{
	  alend,
    my
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