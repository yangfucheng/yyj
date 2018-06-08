<template>
	<div>
		<!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="item in list">{{ item }}</li>
		</ul> -->
        <div class='comment_list' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <img src='../../common/images/logo.png' class='logo'/>
            <div class='comment_container'>
                <div>
                    <p class='user'>{{maincontent.userName}}</p>
                    <p class='createTime'>{{maincontent.createTime|changeTime}}</p>
                    <p class="comment_first">{{maincontent.content}}</p> 
                </div>
            </div>
        </div>
        <ul>
            <li class="comment_list comment_item" v-for='item in commentList' @click='showReply(item.commentId,item.userId,item.userName)'>
                <img src='../../common/images/logo.png' class='logo'/>
                <div class='comment_container'> 
                    <div>
                        <p class='user'>{{item.userName}}</p>
                        <p class='createTime'>{{item.createTime|changeTime}}</p>
                        <p class="comment_first">{{item.content}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class='loading' v-show='loading'>正在加载中<i class='el-icon-loading'></i></div>
        <div class='comment_foot'>
            <input type="text" v-model="reply" placeholder="回复评论" @focus='showComment'/>
        </div>
        <div class='comment_send' v-show='isComment'>
            <textarea v-model='comment' class='comment' rows="3" maxlength="100" @blur='isComment=false' ref="content" ></textarea><mt-button size="small" class='comment_btn' @click='subComment'>发送</mt-button>
        </div>
        <div class="background" v-show='isComment'></div>
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
            maincontent:'',
            commentId:'',
            toWhomUserId:'',
            toWhomUserName:'',
            replyWho:'',
            focusStatus:false,
            loading:false,
        }
    },
    created(){
        if(this.$store.state.tabHidden) {
            this.$store.dispatch('tabHidden')
        };
        // let maincontent=localStorage.getItem("comment");
        // this.maincontent=JSON.parse(maincontent);
        // localStorage.clear("comment");
        // this.projectId=this.$route.params.id;
        // this.getComment(1);
    },
    filters: {
        changeTime(value){
            return timestampToTime(value);
        },
    },
    methods:{
        loadMore() {
            this.loading=false;
            if(this.pageNo<this.totalPage){
                this.loading=true;
                this.getComment(this.pageNo+1);
            }
        },
        showComment(){
            this.commentId='';
            this.isComment=true;
            this.$refs.content.focus();
        },
        getComment(pageNo){
            let projectId=this.projectId;
            getCommentDetailList(projectId,{pageNo:pageNo}).then(res=>{
                if(this.loading){
                    let lastComment=this.commentList;
                    this.commentList=lastComment.concat(res.body.result);
                    this.loading=false;
                }else{
                    this.commentList=res.body.result;
                }
                this.totalPage=res.body.totalPage;
                this.pageNo=res.body.pageNo;
            });
        },
        subComment(){
            let projectId=this.projectId;
            let comment=this.comment;
            if(comment.trim()==''){
                return false;
            }
            this.isComment=false;
            if(this.commentId==''){
                newComment({projectId:projectId,content:comment}).then(response=>{
        /*this.$message({
          message: '买入成功',
          type: 'success'
        });*/   
                this.comment='';
                this.commentList=[];
                this.getComment(1);
                });
            }else{
                let commentId=this.commentId;
                let toWhomUserName=this.toWhomUserName;
                let toWhomUserId=this.toWhomUserId;
                let params={commentId:commentId,toWhomUserId:toWhomUserId,toWhomUserName:toWhomUserName,content:comment};
                newReply(params).then(response=>{
                    this.comment='';
                    this.commentList=[];
                    this.getComment(1);
                });
            }
        },
        showReply(commentId,toWhomUserId,toWhomUserName){
            this.commentId=commentId;
            this.toWhomUserId=toWhomUserId;
            this.toWhomUserName=toWhomUserName;
            this.replyWho='回复@'+toWhomUserName;
            this.isComment=true;
        },
    }, 
}
</script>

<style lang='scss' scoped>
@import '../../common/loading.scss';
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
    z-index:5;
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