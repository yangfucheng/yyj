<template>
	<div class="contain">
		<div class="cell">
			<div class="title">
				<img src="../../../static/icon/hot.png" height="15" width="15" alt="">
				<span class="title-contont">{{dataArray.title}}</span>
			</div>
			<div class="content">
				<div class="hint">
					 <zk-time-down @time-end="message = '倒计时结束'" :endTime='endTime' :type="false" class="hint-time"></zk-time-down>
					<div class="per-num"><i class="iconfont icon-wode"></i>{{dataArray.betNumber}}</div>
					<div class="token">交易代币:&nbsp {{dataArray.tradeCoin}}</div>
				</div>
				<div class="progress" ref="progress">
					<div></div>
					<div></div>
					<div v-show="dataArray.optionC"></div>
				</div>
				<div class="option">
					<div :class="(!dataArray.optionC)?'option-font-two flexed-two':'option-font-three flexed-two'">
					    <div><span v-if="!dataArray.optionC">选项</span>A:{{dataArray.optionA}}</div>
					    <div><span v-if="!dataArray.optionC">选项</span>B:{{dataArray.optionB}}</div>
					    <div v-show="dataArray.optionC">C:{{dataArray.optionC}}</div>
					</div>
					<div :class="(!dataArray.optionC)?'now-title-two flexed-two':'now-title-three flexed-two'" style="color:#CCCCC">
						<div>可能收益({{dataArray.tradeCoin}})</div>
						<div>可能收益({{dataArray.tradeCoin}})</div>
						<div v-show="dataArray.optionC">可能收益({{dataArray.tradeCoin}})</div>
					</div>
					<div class="average-cent-three flexed-two">
						<div>{{dataArray.mayEarnedA}}</i></div>
						<div>{{dataArray.mayEarnedB}}</i></div>
						<div v-show="dataArray.optionC">{{dataArray.mayEarnedC}}</div>
					</div>
				</div>
				<div class="describe"></div>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript">
import zkTimeDown from '../../components/Countdown.vue'
	export default {
		components : {
      		zkTimeDown
  		},
		props: {
			dataProp: {
				type: Object
			}
		},
		data() {
			return {
				proValue:'',
				dataArray:[],
				message : '正在倒计时',
      			endTime : 0,
			}
		},
		 methods: {
    		
  		},
  		created() {
  			 this.dataArray = this.dataProp;
  			 this.endTime =this.dataProp.betEndTime;
  		},
  		watch: {
  			"dataProp"(){
  				// alert(JSON.stringify(this.dataProp))
  				this.dataArray =this.dataProp
  			}
  		},
		mounted() {
			
			var proDom =this.$refs.progress;
			var divArray =proDom.getElementsByTagName('div');
		 	let optionAQuantity = this.dataArray.optionAQuantity || 0;
		    let optionBQuantity = this.dataArray.optionBQuantity || 0;
		    let optionCQuantity = this.dataArray.optionCQuantity || 0;
		    let optionAll = optionAQuantity + optionBQuantity +optionCQuantity || 0;
		    let scaleA = optionAQuantity/optionAll;
		    let scaleB = optionBQuantity/optionAll;
		    let scaleC = optionCQuantity/optionAll;
		    divArray[0].style.width =toPercent(scaleA);
		    divArray[1].style.width =toPercent(fomat(scaleA,scaleB,scaleC,1));
		    divArray[2].style.width =toPercent(fomat(scaleA,scaleB,scaleC,2));
		    function toPercent(point){  
		      var str=Number(point*100).toFixed(1);
		        str+="%";
		        return str;
		    }

		    function fomat(scaleA,scaleB,scaleC,num){

		      if(!scaleC&&num==1){

		        if(scaleA+scaleB!=1){
		          return 1-scaleA;
		        }else{
		          return scaleB;
		        }
		      }
		      else if(scaleC&&num==2){ 
		        if(scaleA+scaleB+scaleC!=1){
		          return 1-(scaleA+scaleB)
		        }else{
		          return scaleC;
		        }
		      }else if(!scaleC&&num==2){
		        return 0;
		      }
		      else{
		        return scaleB;
		      }
		    }
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