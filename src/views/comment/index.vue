<template>
	<div>
		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="item in list">{{ item }}</li>
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
li{
	height:100px;
}
</style>