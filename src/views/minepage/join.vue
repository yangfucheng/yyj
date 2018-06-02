<template>
   <div class="contain" >
     <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange"  :auto-fill="false" ref="loadmore" :bottom-method='loadBottom'   :bottomAllLoaded='bottomAllLoaded' class="mt-wrap">
        <mt-navbar v-model="selected" class="nav">
  	      <mt-tab-item :id="1" ><span class="font">进行中</span></mt-tab-item>
  	      <mt-tab-item :id="2"><span class="font">停止下注</span></mt-tab-item>
          <mt-tab-item :id="3"><span class="font">已结束</span></mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
  	      <mt-tab-container-item  :id="1">
               <alend v-for="item in dataArray" :dataProp='item' :key='item.index'></alend>
  	      </mt-tab-container-item>
        </mt-tab-container>
        <mt-tab-container v-model="selected">
        <mt-tab-container-item  :id="2">
            <alend v-for="item in dataArray" :dataProp='item' :key='item.index'></alend>
        </mt-tab-container-item>
        <mt-tab-container-item :id="3">
            <my v-for="item in dataArray" :dataProp='item' :key='item.index'></my>
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
      page:1,
      bottomAllLoaded:false,
      dataArray:[],
      status:'online',
    }
  },
  mounted() {
    // this.$refs.mtWrap.style.height = document.documentElement.clientHeight + 'px';
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
          pageNo:this.page,
          status:this.status
       }
       getList(params).then(response => {
           this.totalPage = response.body.totalPage;
            if(this.totalPage == 1){
              this.bottomAllLoaded =true;
            }
            var dataArray =[];
          var dataResult = response.body.result;
           for(var i = 0 ; i< dataResult.length; i++){
              dataArray.push(dataResult[i]);
           }
           this.dataArray =dataArray;
           this.$refs.loadmore.onTopLoaded();
           Indicator.close();
      }).catch(function(e){
        console.log(e);
        Indicator.close();
      })
    },
    loadTop(){
      this.dataArray= [];
      this.page=1;
      this.fetch();
    },
    loadBottom(){
      if(this.totalPage > this.page){
        this.page++;
        this.fetch();
        this.$refs.loadmore.onBottomLoaded();
      }else{
        this.bottomAllLoaded =true;
        this.$refs.loadmore.onBottomLoaded();
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
<style>
/* .mint-loadmore-text{
    display: none;
  } */
</style>
<style lang="scss" scoped>
@import "../../common/mixin.scss";
@import  '../../common/style.scss';
.contain {
	.mt-wrap{
    // position:absolute;
    // top:0;
    // left:0;
    // bottom:0;
    // height:100%;
    // width:100%;
    // overflow: auto;
	.nav{
    border-bottom:1px solid #e0e0e0;
    .font{
		  font-size:.4rem;;
	   }
	}
}
	
    .is-selected{
    	border-bottom: 3px solid red;
    	color:#000;
    }

}
</style>