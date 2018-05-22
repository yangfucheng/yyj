<template>
	<div class="contain" >
		<div class="cell">
			<div class="title">
				<img src="../../../static/icon/hot.png" height="15" width="15" alt="">
				<span class="title-contont">{{dataArray.title}}</span>
			</div>
			<div class="content">
				<div class="hint">
					<div class="hint-time">已经结束</div>
					<div class="token">交易代币:&nbsp {{dataArray.tradeCoin}}</div>
				</div>
				<div class="option">
					<div class="option-font-two">
					    <div>结果: <span style="color:#000">选项{{dataArray.result}}:{{dataArray.resultMemo}}</span>	 </div>
					    <!-- <div>C:不会跌破</div> -->
					</div>
					<div class="average-cent-three flexed-two">
						<div>
							<div><i class="iconfont icon-renshutongji"></i>&nbsp{{dataArray.betNumber}}</div>
							<div>参与人数</div>
						</div>
						<div>
							<div>{{ratio * 100}}%</div>
							<div>选项比例</div>
						</div>
						<div>
							<div><i class="iconfont icon-29"></i>{{dataArray.capitalPool}}</div>
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
			dataProp: {
				type: Object
			}
		},
		data() {
			return {
				proValue:'',
				dataArray:[],
				ratio:0
			}
		},
		methods: {
			setp() {
		      this.$router.push({
		        name:'details',
		        params:{
		          dataArray:this.dataArray
		        }
		      })
		    }
  		},
  		watch: {
  			"dataProp"(){
  				this.dataArray =this.dataProp
  				if(this.dataArray.ratio){
  					let ratio = this.dataArray.ratio;
  					this.ratio = ratio.toFixed(2);
  				}
  			}
  		},
  		created() {
  			
  			
  		},
		mounted() {
			this.dataArray = this.dataProp;
			this.dataArray = this.dataProp;
  			this.endTime =this.dataProp.betEndTime;  			
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
					margin:.2rem 0;
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
						font-size:.4rem;
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