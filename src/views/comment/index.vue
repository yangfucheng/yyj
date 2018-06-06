<template>
	<div>
		<!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="item in list">{{ item }}</li>
		</ul> -->
        <ul class='comment_list'>
            <li>
                <img src='../../common/images/logo.png' class='logo'/>
                <div class='comment_container'>
                    <div>
                        <p class='user'>用户1314</p>
                        <p class="comment_first">听说我们可以</p>
                    </div>
                    <ul>
                        <li><span>钩子</span>：就是看到好看</li>
                        <li><span>钩子</span>：就是看到好看</li>
                    </ul>
                </div>
            </li>
            <li>
                <img src='../../common/images/logo.png' class='logo'/>
                <div><p class="user">用户1314</p><p>听说我们可以</p></div>
            </li><li>
                <img src='../../common/images/logo.png' class='logo'/>
                <div><p class="user">用户1314</p><p>听说我们可以</p></div>
            </li>
        </ul>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
export default {
    data () {
        return {
            list:[1,2,3,4,5,6,7,8,9,10], 
        }
    },
    created(){
        if(this.$store.state.tabHidden) {
            this.$store.dispatch('tabHidden')
        };
    },
    methods:{
        loadMore() {
            this.loading = true;
            setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
                this.list.push(last + i);
            }
            this.loading = false;
            }, 2500);
        }
    },
    
}
</script>

<style lang='scss' scoped>
.comment_list{
    line-height:1.5;
    >li{
        display:flex;
        width:100%;
        padding:0.3rem 0.5rem;
        box-sizing:border-box;
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
            color:#999;
        }
        ul{
            margin-top:0.2rem;
            background:#eef1ec;
            color:#888;
            padding:0.2rem;
            span{
                color:#7c91bd;
            }
        }
    }
}
</style>