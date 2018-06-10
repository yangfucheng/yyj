<template>
	<div class='container'>
        <div v-show='nocomment' class="noComment">还没有评论，快来评论吧~</div>
        <ul class='comment_list' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for='item in commentList' :key='item.index'>
                <img src='../../common/images/logo.png' class='logo'/>
                <div class='comment_container'>
                    <div  @click='showReply(item.commentId,item.userId,item.userName)'>
                        <p class='user'>{{item.userName}}</p>
                        <p class='createTime'>{{item.createTime | changeTime}}</p>
                        <p class="comment_first">{{item.content}}</p>
                    </div>
                    <ul v-if='item.replyTimes>0'>
                        <li v-for='reply in item.repliesContent' :key='item.repliesContent.index' @click='showReply(reply.commentId,reply.userId,reply.userName)'>
                            <span>{{reply.userName}}<span v-if='reply.toWhomUserName!=item.userName'><span style='color:#888'>回复</span>{{reply.toWhomUserName}}</span></span>：{{reply.content}}
                        </li>
                        <a href='javascript:void(0)' class='moreReply' v-if='item.replyTimes>3' @click='goDetail(item.commentId,item)'>查看更多回复&nbsp;></a>
                    </ul>
                </div>
            </li>
        </ul>
        <div class='loading' v-show='loading'>正在加载中<i class='el-icon-loading'></i></div>
        <div class='comment_foot'  @click='showComment'>
            <span><img src='../../common/images/pinglun.png' class='icon-comment'/>&nbsp;评论</span>
            <!-- <span><i class='icon-icon2 icon iconfont'></i>收藏</span><span><i class='icon-icon2 icon iconfont' @click='showComment'></i>评论</span><span><i class='icon-icon2 icon iconfont'></i>收藏</span> -->
        </div>
        <mt-popup v-model="isComment" position="bottom">
        <div class='comment_send'>
            <textarea v-model='comment' class='comment' rows="3" maxlength="100" :placeholder='replyWho' ref='content'></textarea><mt-button size="small" class='comment_btn' @click='subComment'>发送</mt-button>
        </div>
        </mt-popup>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import {getCommentList,newComment,newReply} from '../../api/api.js'
import {timestampToTime} from '../../untils/enums.js'
export default {
    data () {
        return {
            commentList:[],  
            isComment:false,
            comment:'',
            projectId:'',
            loading:false,
            commentId:'',
            toWhomUserId:'',
            toWhomUserName:'',
            replyWho:'',
            nocomment:false,
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
            if(this.pageNo<this.totalPage){
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
            this.loading=true;
            getCommentList(projectId,{pageNo:pageNo}).then(res=>{
                if(this.loading){
                    let lastComment=this.commentList;
                    this.commentList=lastComment.concat(res.body.result);
                    this.loading=false;
                }else{
                    this.commentList=res.body.result;
                }
                if(res.body.totalCount==0){
                    this.nocomment=true;
                }else{
                    this.nocomment=false;
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
                    this.commentId='';
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
            this.$refs.content.focus();
        },
        goDetail(id,item){
            let comment=item;
            localStorage.setItem("comment",JSON.stringify(comment));
            this.$router.push({
                path:'/comment/detail/'+id,
                params:{
                    id:id,
                }
            })
        },  
    }, 
}
</script>

<style lang='scss' scoped>
.noComment{
    padding:1rem 0;
    width:100%;
    text-align:center;
}
.icon-comment{
    width:20px;
    vertical-align: middle;
}
.loading{
    padding:0.3rem 0;
    text-align:center;
    width:100%;
}
.container{
    padding-bottom: 1rem;
}
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
          line-height: 1;
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
            .moreReply{
                color: #9a9e9d;
            }
        }
    }
}
.mint-popup-bottom{
    width:100%;
}
.comment_foot,.comment_send{
    color:#888;
    display: flex;
    text-align: center;
    width:100%;
    position: fixed;
    bottom: 0;
    background: #f5f5f5;
    height: 1.2rem;
    border-top: 1px solid #eee;
    align-items:center;
    box-sizing:border-box;
    z-index：5；
    span{
        flex:1;
    }
    textarea{
        flex:1;
        border-color:#eee;
        padding: 0.1rem;
    }
    .comment_btn{
        border:none;
        box-shadow:none;
    }
}
.comment_foot{
    display: block;
    line-height: 1rem;
}
.comment_send{
    height: auto;
    padding: 0.15rem;
}
</style>