<template>
	<div>
		<!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="item in list">{{ item }}</li>
		</ul> -->
        <ul class='comment_list'>
            <li v-for='item in commentList' :key='item.index'>
                <img src='../../common/images/logo.png' class='logo'/>
                <div class='comment_container'>
                    <div>
                        <p class='user'>{{item.userName}}</p>
                        <p class='createTime'>{{item.createTime | changeTime}}</p>
                        <p class="comment_first">{{item.content}}杨过也不亏啊，最好吧膺值平和小龙女的女儿给搞了。连本代理一起回来了。</p>
                    </div>
                    <ul>
                        <li><span>钩子</span>：这从哪儿说起啊？</li>
                        <li><span>钩子</span>：小龙女死了生了女儿然后编下去OK</li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class='comment_foot'>
            <span><i class='icon-icon2 icon iconfont'></i>收藏</span><span><i class='icon-icon2 icon iconfont'></i>评论</span><span><i class='icon-icon2 icon iconfont'></i>收藏</span>
        </div>
        <div class='comment_send' v-show='isComment'>
            <textarea v-model='comment' class='comment'></textarea><mt-button size="small" class='comment_btn' @click='subComment'>发送</mt-button>
        </div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import {getCommentList,newComment} from '../../api/api.js'
import {timestampToTime} from '../../untils/enums.js'
export default {
    data () {
        return {
            commentList:[],  
            isComment:false,
            comment:'',
            projectId:'',
        }
    },
    created(){
        if(this.$store.state.tabHidden) {
            this.$store.dispatch('tabHidden')
        };
        this.projectId=this.$route.params.id;
        this.getComment(1);
    },
    filters: {
        changeTime(value){
            return timestampToTime(value)
        },
    },
    methods:{
        loadMore() {
            /*this.loading = true;
            setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
            }
            this.loading = false;
            }, 2500);*/
        },
        getComment(pageNo){
            let projectId=this.projectId;
            getCommentList(projectId,{pageNo:pageNo}).then(res=>{
                this.commentList=res.body.result;
            });
        },
        subComment(){
           let projectId=this.projectId;
           let comment=this.comment;
           newComment({projectId:projectId,content:comment}).then(response=>{
        /*this.$message({
          message: '买入成功',
          type: 'success'
        });*/
                this.comment='';
                this.getComment(1);
            });
        }
    }, 
}
</script>

<style lang='scss' scoped>
.comment_list{
      line-height:1.8;
      >li{
        display:flex;
        width:100%;
        padding:0.3rem 0.5rem;
        box-sizing:border-box;
        .comment_first{
          font-size: 0.4rem;
          color:#444;
          padding:0.2rem 0;
        }
        .comment_container{
            flex:1;
        }
        .logo{
        width:0.6rem;
        height:0.6rem;
        border:1px solid #ccc;
        border-radius:50%;
        margin-right:0.2rem;
        }
        .user{
          color:#888888;
        }
        .createTime{
          color: #9a9e9d;
          font-size: 0.2rem;
        }
        ul{
            margin-top:0.2rem;
            background:#f4f8fb;
            color:#666a69;
            padding:0.3rem;
            font-size: 0.36rem;
            span{
              color:#5d7ea1;
            }
        }
    }
}
.comment_foot{
    color:#888;
    display: flex;
    text-align: center;
    width:100%;
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    padding: 0.3rem 0;
    border-top: 1px solid #eee;
    span{
        flex:1;
    }
}
</style>