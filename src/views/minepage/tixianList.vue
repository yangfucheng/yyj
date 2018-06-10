<template>
	<div>
		<ul class="content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="item in list">
                <div class="wrap">
                  <div class="way">
                    <div>{{item.createTime|changeTime}}</div>
                    <div>
                    	币种：{{item.tradeCoin}}
                    </div>
                  </div>
                  <div class="price">
                    <div style="color:red">{{item.status|changeStatus}}</div>
                    <div>实际到帐：{{item.amount|formatNum}}</div>
                  </div>
                </div>
            </li>
        </ul>
        <div class='loading' v-show='loading'>正在加载中<i class='el-icon-loading'></i></div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import { getWithDrawList } from '../../api/api.js'
import {timestampToTime,numTampTofloat} from '../../untils/enums.js'
export default {
  data () {
        return {
        	list:[],
            loading:false,
    	}
    },
    created() {
        if(this.$store.state.tabHidden) {
            this.$store.dispatch('tabHidden')
        };
        this.getList(1);
    },
    filters: {
        changeTime(value){
            return timestampToTime(value);
        },
        changeStatus(value){
            if(value=='init'){
            	return '待审核';
            }else{
            	return '完成';
            }
        },
         formatNum(value){
            return numTampTofloat(value);
        }
    },
    methods:{
    	loadMore() {
            if(this.pageNo<this.totalPage){
                this.getList(this.pageNo+1);
            }
        },
        getList(pageNo){
            let projectId=this.projectId;
            this.loading=true;
            getWithDrawList({pageNo:pageNo}).then(res=>{
                if(this.loading){
                    let lastComment=this.list;
                    this.list=lastComment.concat(res.body.result);
                    this.loading=false;
                }else{
                    this.list=res.body.result;
                    this.loading=false;
                }
                this.totalPage=res.body.totalPage;
                this.pageNo=res.body.pageNo;
            });
        },
    }
}
</script>

<style lang='scss' scoped>
.loading{
    padding:0.3rem 0;
    text-align:center;
    width:100%;
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
        .price{
        	text-align: right;
        }
    }
}	
</style>