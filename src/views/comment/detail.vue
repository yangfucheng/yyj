<template>
	<div>
		<!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="item in list">{{ item }}</li>
		</ul> -->
        <div class='comment_list'>
            <img src='../../common/images/logo.png' class='logo'/>
            <div class='comment_container'>
                <div>{{item}}
                    <!-- <p class='user'>{{maincontent}}</p>
                    <p class='createTime'>{{maincontent.createTime|changeTime}}</p>
                    <p class="comment_first">{{maincontent.content}}</p> -->
                </div>
            </div>
        </div>
        <ul>
            <!-- <li class="comment_list comment_item" v-for='item in commentList'>
                <img src='../../common/images/logo.png' class='logo'/>
                <div class='comment_container'>
                    <div>
                        <p class='user'>口水代扣</p>
                        <p class='createTime'>2018-4-19</p>
                        <p class="comment_first">杨过也不亏啊，最好吧膺值平和小龙女的女儿给搞了。连本代理一起回来了。</p>
                    </div>
                </div>
            </li> -->
        </ul>
        <div class='comment_foot'>
            <input type="text" v-model="reply" placeholder="回复评论" @focus='showComment'/>
        </div>
        <div class='comment_send' v-show='isComment'>
            <textarea v-model='comment' class='comment' rows="3" maxlength="100" @blur='isComment=false'></textarea><mt-button size="small" class='comment_btn' @click='subComment'>发送</mt-button>
        </div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import {getCommentDetailList,newReply} from '../../api/api.js'
import {timestampToTime} from '../../untils/enums.js'
export default {
    data () {
        return {
            commentList:[],  
            isComment:false,
            comment:'',
            projectId:'',
            reply:'',
            item:'',
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
            let id=this.projectId;
            getCommentDetailList(id,{pageNo:pageNo}).then(res=>{
                this.commentList=res.body.result;
            });
        },
        subComment(){
            let projectId=this.projectId;
            let comment=this.comment;
            if(comment.trim()==''){
               return  false;
            }
           newReply({projectId:projectId,content:comment}).then(response=>{
        /*this.$message({
          message: '买入成功',
          type: 'success'
        });*/
                this.comment='';
                this.getComment(1);
            });
        },
        showComment(){
            this.commentId='';
            this.isComment=true;
        },
    }, 
}
</script>

<style lang='scss' scoped>
.comment_list{
        line-height:1.6;
        display:flex;
        width:100%;
        padding:0.3rem 0.5rem;
        box-sizing:border-box;
        .comment_first{
          font-size: 0.38rem;
          color:#444;
          padding:0.15rem 0;
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
          line-height: 1;
        }
}
.comment_item{
    line-height:1.2;
    background:#fafafa;
    padding:0.2rem 0.5rem;
    .comment_first{
        font-size:0.34rem;
        border-bottom:1px solid #eee;
    }
}
.comment_foot,.comment_send{
    color:#888;
    display: flex;
    text-align: center;
    width:100%;
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    padding: 0.15rem;
    border-top: 1px solid #eee;
    box-sizing:border-box;
    align-items:center;
    input{
        width:100%;
        padding:2px;
        border:none;
    }
    textarea{
        flex:1;
        border-color:#eee;
        padding:0.1rem;
    }
    .comment_btn{
        border:none;
        box-shadow:none;
    }
}
</style>