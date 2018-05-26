<template>
	<div class="contain" @click="setp(dataArray)" >
		<div class="cell">
			<div class="title">
				<img src="../../static/icon/hot.png" height="15" width="15" alt="">
				<span class="title-contont">{{dataArray.title}}</span>
			</div>
			<div class="content">
				<div class="hint">
					 <zk-time-down @time-end="message = '倒计时结束'" :endTime='endTime' :type="false" class="hint-time"></zk-time-down style="width:40%;text-align:center">
					<!-- <div class="hint-time">剩余时间 &nbsp  0天15时</div> -->
					<div class="per-num" style="width:30%;text-align:center;"><i class="iconfont icon-wode" style="font-size:.3rem;margin-right:.1rem"></i>{{dataArray.betNumber}}</div>
					<div class="token" style="width:30%;text-align:center">交易代币:&nbsp {{dataArray.tradeCoin}}</div>
				</div>
			<!-- 	<div class="option">
					
				</div> -->
				<div class="progress" ref="progress">
					<div></div>
					<div :class="(!dataArray.optionC)?'noC':'isC'"></div>
					<div v-show="dataArray.optionC"></div>
				</div>
				<div class="option">
					<div :class="(!dataArray.optionC)?'option-font-three flexed-two':'option-font-three flexed-three'">
					    <div><span v-if="!dataArray.optionC">选项</span>A:{{dataArray.optionA}}</div>
					    <div><span v-if="!dataArray.optionC">选项</span>B:{{dataArray.optionB}}</div>
					    <div v-show="dataArray.optionC">C:{{dataArray.optionC}}</div>
					</div>
					<div :class="(!dataArray.optionC)?'now-cent-two flexed-two':'now-cent-three flexed-three'" >
						<div style="color:#FA3E55">
							<span>{{dataArray.optionAOdds}}</span>/
							<span style="font-size:.35rem;">{{scaleA}}</span>
						</div>
						<div style="color:#1AC5BB">
							<span>{{dataArray.optionBOdds}}</span>/
							<span style="font-size:.35rem;">{{scaleB}}</span>
						</div>
						<div v-show="dataArray.optionC" style="color:#6CA6CD">
							<span>{{dataArray.optionCOdds}}</span>/
							<span style="font-size:.35rem;">{{scaleC}}</span>
						</div>
					</div>
					<div :class="(!dataArray.optionC)?'flexed-two':'flexed-three'" >
						<div  style="color:#CCC">获胜倍数/概率</div>
						<div  style="color:#CCC">获胜倍数/概率</div>
						<div v-show="dataArray.optionC"  style="color:#CCC">获胜倍数/概率</div>
					</div>
					<!-- <div class="average-cent-three flexed-two" v-show="true">
						<div>3.6 &nbsp<i class="iconfont icon-tubiaoshangshengqushi"></i></div>
						<div>3.6&nbsp<i class="iconfont icon-tubiaoxiajiangqushi" ></i></div>
						<div>3.6&nbsp<i class="iconfont icon-tubiaoshangshengqushi" style="color:red"></i></div>
					</div> -->
					<!-- <div class="average-three flexed-two" v-show="true">
						<div>当前获胜倍数:<span style="color:#FA3E55"></span></div>
						<div>当前获胜倍数:<span style="color:#1AC5BB">{{dataArray.optionBOdds}}</span></div>
						<div v-show="dataArray.optionC" style="color:#6CA6CD">当前获胜倍数:<span>{{dataArray.optionCOdds}}</span>
					</div> -->
				</div>
				<div class="describe"></div>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript">
import zkTimeDown from '../components/Countdown.vue'
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
      			scaleA:0,
      			scaleB:0,
      			scaleC:0
			}
		},
		 methods: {
    		setp() {
		      this.$router.push({
		        // name:'details',
		        path:'index/details/'+this.dataArray.id,
		        params:{
		          dataArray:this.dataArray
		        }
		      })
		    }
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
			// let scaleA = 0.95 / this.dataArray.optionAOdds;
		 //    let scaleB = 0.95 / this.dataArray.optionBOdds;
		 //    let scaleC = 0.95 / (this.dataArray.optionCOdds);
		 //    if(scaleC==Infinity){
		 //      scaleC=0;
		 //    }
		 //    // alert(scaleC)
		 	let optionAQuantity = this.dataArray.optionAQuantity || 0;
		    let optionBQuantity = this.dataArray.optionBQuantity || 0;
		    let optionCQuantity = this.dataArray.optionCQuantity || 0;
		    let optionAll = optionAQuantity + optionBQuantity +optionCQuantity || 0;
		    let scaleA = optionAQuantity/optionAll;
		    let scaleB = optionBQuantity/optionAll;
		    let scaleC = optionCQuantity/optionAll;
		    if(scaleC == NaN){
		    	scaleC = 0;
		    }
		    this.scaleA = toPercent(scaleA);
		    this.scaleB = toPercent(scaleB);
		    this.scaleC = toPercent(scaleC);
		    console.log(scaleC)
		    divArray[0].style.width =toPercent(scaleA);
		    divArray[1].style.width =toPercent(fomat(scaleA,scaleB,scaleC,1));
		    divArray[2].style.width =toPercent(fomat(scaleA,scaleB,scaleC,2));
		    // divArray[0].style.width ="90%"
		    // divArray[1].style.width ="5%"
		    // divArray[2].style.width ="5%"
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
		// height:6rem;
		margin:0 auto;
		// margin-top:.15rem;
		border:1px solid #CCC;
		border-radius:5px;
		// box-shadow: -2px -2px 1px 10px #F0F0F0;
		padding-bottom:.7rem;
		margin-top:.2rem;
		padding:.5rem 0;
		.cell {
			width:90%;
			margin:0 auto;
			// margin-top:.3rem 0;
			.content {
				.hint {
					display:flex;
					// justify-content:space-between;
					margin:.4rem .2rem;
					.hint-time{
						width:40%;
					}
				}
				.progress {
					margin:0 auto;
					margin-top:.3rem;
					margin-bottom:.3rem;
					width:90%;
					height:.25rem;
					border-radius:5px;
					background-color:#fff;
					display:flex;
					div:nth-child(1) {
						border-radius:5px 0px 0px 5px;
						background-color:#FA3E55;
						height:.25rem;
					}
					.noC {
						border-radius:0px 5px 5px 0px;
						background-color:#1AC5BB;
						height:.25rem;
					}
					.isC {
						// border-radius:0px 0px 0px 5px;
						background-color:#1AC5BB;
						height:.25rem;
					}
					div:nth-child(3) {
						border-radius:0px 5px 5px 0px;
						background-color:#6CA6CD;
						height:.25rem;
					}
				}
				.option {
					.flexed {
						display:flex;
						justify-content:space-between;
						text-align: center;
						align-items: center;
						div:nth-child(1){
							border-right:1px solid #ccc;
						}
						div:nth-child(2){
							border-right:1px solid #ccc;
						}
						& > div{
							width:33%;
						}
					}
					.flexed-two{
						justify-content:space-between;
						display:flex;
						text-align: center;
						align-items: center;
						// div:nth-child(1){
						// 	border-right:1px solid #ccc;
						// }
						& > div{
							width:50%;
						}
					}
					.flexed-three{
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
						letter-spacing: .1rem;
						font-size:.4rem;
						margin:.1rem 0;
					}
					.option-font-two{
						font-weight:700;
						font-size:.5rem;
					}

					.now-cent-three{
						font-weight:700;
						font-size:.45rem;
						margin:.2rem 0;
					}
					.now-cent-two{
						font-weight:700;
						font-size:.55rem;
						margin:.2rem 0;
					}
					.now-title-three{
						font-size:.4rem;
					}
					.average-cent-three{
						color:#ccc;
						font-size:.5rem;
						font-wight:700;
					}
					.average-three{
						margin:.1rem 0;
						font-size:.3rem;
						color:#000;
					}
				}
			}
			.title{
				// margin-top:.3rem;
				.title-contont{
					font-size:15px;
					font-weight:900;
				}
			}
			
		}
	}
	progress::-webkit-progress-bar { background: transparent; }
</style>