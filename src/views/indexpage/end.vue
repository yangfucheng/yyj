<template>
	<div class="contain" @click="setp()">
		<div class="cell">
			<div class="title">
				<img src="../../../static/icon/hot.png" height="15" width="15" alt="">
				<span class="title-contont">预测BTC 2018年3月7号24点的价格,是否会跌破7000人民币,以币安网的价格为准</span>
			</div>
			<div class="content">
				<div class="hint">
					<div class="hint-time">已经结束</div>
					<div class="token">交易代币:&nbsp GXS</div>
				</div>
				<div class="option">
					<div class="option-font-two">
					    <div>结果:选项A:不会跌破</div>
					    <!-- <div>C:不会跌破</div> -->
					</div>
					<div class="average-cent-three flexed-two">
						<div>
							<div><i class="iconfont icon-renshutongji"></i>12.321</div>
							<div>参与人数</div>
						</div>
						<div>
							<div>27%</div>
							<div>选项比例</div>
						</div>
						<div>
							<div><i class="iconfont icon-29"></i>17.322</div>
							<div>奖金池</div>
						</div>
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
		},
	}
</script>
<style lang="scss" scoped>
	
	.contain{
		width:96%;
		height:4.5rem;
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
					margin-top:.1rem;
					color:#6E6E6E;
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
							width:60%;
						}
					}
					.option-font-two{
						font-weight:700;
						font-size:.5rem;
						margin-bottom:.3rem;
						color:#6E6E6E;
					}

					.now-cent-three{
						font-weight:700;
						font-size:.7rem;
					}
					.now-title-three{
						font-size:.4rem;
					}
					.average-cent-three{
						color:#000;
						font-size:.45rem;
						.iconfont{
							font-size:.6rem;
						}
						& > div{
							font-weight:400;
						}
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
				color:#6E6E6E;
				}
			}
			
		}
	}
	progress::-webkit-progress-bar { background: transparent; }
</style>