<template>
	<div class="contain" @click="setp()">
		<div class="cell">
			<div class="title">
				<img src="../../../static/icon/hot.png" height="15" width="15" alt="">
				<span class="title-contont">预测BTC 2018年3月7号24点的价格,是否会跌破7000人民币,以币安网的价格为准</span>
			</div>
			<div class="content">
				<div class="hint">
					<div class="hint-time">剩余时间 &nbsp  0天15时</div>
					<div class="per-num"><i class="iconfont icon-wode"></i>15678</div>
					<div class="token">交易代币:&nbsp GXS</div>
				</div>
				<div class="progress" ref="progress">
					<div></div>
					<div></div>
					<div></div>
				</div>
				
				<div class="option">
					<!-- <div class="now-cent-three flexed-two" >
						<div>3</div>
						<div>3.6</div>
						<div>3.6</div>
					</div> -->
					<div class="option-font-two flexed-two">
					    <div>选项A:不会跌破</div>
					    <div>选项B:不会跌破</div>
					    <!-- <div>C:不会跌破</div> -->
					</div>
					<div class="now-title-two flexed-two">
						<div v-for="x in 2">可能收益(GXS)</div>
					</div>
					<div class="average-cent-three flexed-two">
						<div>0 </i></div>
						<div>234</i></div>
						<!-- <div>3.6&nbsp<i class="iconfont icon-tubiaoshangshengqushi" style="color:red"></i></div> -->
					</div>
				</div>
				<div class="describe"></div>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript">
	export default {
		props: {
			cell: {
				type: Number
			}
		},
		data() {
			return {
				proValue:'',
				item:[]
			}
		},
		 methods: {
    		setp() {
		      this.$router.push({
		        name:'details',
		        params:{
		          id:5
		        }
		      })
		    }
  		},
		mounted() {
			// alert(this.cell);
			var proDom =this.$refs.progress;
			var divArray =proDom.getElementsByTagName('div');
			divArray[0].style.width ="33%";
			divArray[1].style.width ="33%";
			divArray[2].style.width ="35%";
		},
	}
</script>
<style lang="scss" scoped>
	
	.contain{
		width:96%;
		height:5rem;
		margin:0 auto;
		margin-top:.15rem;
		border:1px solid #CCC;
		border-radius:5px;
		box-shadow: -2px -2px 1px 10px #F0F0F0;
		.cell {
			width:90%;
			margin:0 auto;
			margin-top:.3rem;
			.content {
				.hint {
					display:flex;
					justify-content:space-between;
					margin-top:.5rem;
					img {
						vertical-align:text-bottom ;
					}
				}
				.progress {
					margin:0 auto;
					margin-top:.1rem;
					margin-bottom:.2rem;
					width:90%;
					height:.25rem;
					border-radius:5px;
					background-color:red;
					display:flex;
					div:nth-child(1) {
						border-radius:5px;
						background-color:red;
						height:.25rem;
					}
					div:nth-child(2) {
						background-color:yellow;
						height:.25rem;
					}
					div:nth-child(3) {
						border-radius:5px;
						background-color:green;
						height:.25rem;
					}
				}
				.option {
					.flexed {
						display:flex;
						justify-content:space-between;
						text-align: center;
						align-items: center;
						& > div{
							width:33%;
						}
					}
					.flexed-two{
						justify-content:space-between;
						display:flex;
						text-align: center;
						align-items: center;
						& > div{
							width:50%;
						}
					}
					.option-font-three{
						font-weight:700;
						font-size:.4rem;
					}
					.option-font-two{
						font-weight:700;
						font-size:.5rem;
					}

					.now-cent-three{
						font-weight:700;
						font-size:.7rem;
					}
					.now-title-three{
						font-size:.4rem;
					}
					.average-cent-three{
						color:#1AC6BC;
						font-size:.5rem;
						font-wight:700;
					}
					.average-three{
						font-size:.4rem;
						color:#1AC6BC;
					}
				}
			}
			.title{
				.title-contont{
				font-size:15px;
				font-weight:900;
				}
			}
			
		}
	}
	progress::-webkit-progress-bar { background: transparent; }
</style>