<template>
	<div class="contain">
		<div class="border">
			<div class="logo"></div>
		</div>
		<div class="title">
			<p>预言家</p>
			<p>一 小智慧,大收益 一</p>
		</div>
		<form>
			<div class="user">
				<i class="iconfont icon-icon_account"></i>
				<input type="text" placeholder="请输入手机号码" v-model="tel">
			</div>
			<div class="wrap">
				<div class="pwd">
					<i class="iconfont icon-icon2"></i>
					<input type="text" placeholder="请输入验证码" v-model="smsCode">
				</div>
				<div class="button"><button @click="getCode()">{{msg}}</button></div>
			</div>
			<div class="submit"><button @click="login()">登  陆</button></div>
		</form>
	</div>
</template>

<script>
import {getMsgCode,login} from '../../api/api.js'
var qs=require("qs");
export default {
   data () {
	    return {
	    	msg:'获取验证码',
	        delay:60,
	        tel:'',
	        smsCode:''
	    }
	},
	created() {
		if(this.$store.state.tabHidden) {
	      this.$store.dispatch('tabHidden')
	    }
	 },
	methods:{
		getCode(){
			var params= {
				telphone:this.tel
			}
			var self=this;
			getMsgCode(params).then(response=>{
				self.msg='还剩60s';
	            var init=setInterval(function(){clock()},1000);
	            function clock(){
	              if(self.delay>1){
	                self.delay--;
	                self.msg='还剩'+self.delay+'s';
	              }else{
	                window.clearInterval(init);
	                self.able=false;
	                self.msg="重新获取验证码";
	                self.delay=60;
	              };
	            };
			})
		},
		login(){
			var params ={
				telphone:this.tel,
				smsCode:this.smsCode
			}
			var self =this;
			login(params).then(response=>{
				let token = response.body;
				alert(token)
				localStorage.setItem('yyj', token);
				self.$router.push({ name: 'index'})
			})
		}
	}
}
	
</script>
<style lang="scss" scoped>
@import "../../common/mixin.scss";
	.contain{
		.border{
			height:2.3rem;	
			width:2.3rem;
			border:1px solid;
			border-radius:50%;
			text-align: center;
			margin:1rem auto .8rem auto;
			// box-sizing:border-box;
			.logo{
				background-image:url('../../common/images/logo.png');
				background-size:1.5rem 1.5rem;
				background-position:center;
				border-radius:50%;
				background-color:#eee;
				border:1px solid #eee;
				background-repeat:no-repeat;
				height:2rem;
				width:2rem;
				margin:.15rem .12rem 0 auto;
			}
		}
		.title{
			text-align: center;
			p:nth-child(1){
				margin-top:-.6rem;
				font-size:.5rem;
			}
			p:nth-child(2){
				margin-top:.2rem;
				font-size:.4rem;
			}
		}
		form{
			margin-top:2rem;
			width:100%;
			.user{
				margin-top:1rem;
				border-bottom:1px solid;
				width:80%;
				margin:1rem auto;
				.iconfont{
					font-size:.6rem;
				}
				input{
					border:none;
					padding:0 0 .1rem .5rem;
					width:80%;
					font-size:.4rem;
				}
			}
			.wrap{
				display:flex;
				.pwd{
					margin-top:1rem;
					border-bottom:1px solid;
					width:50%;
					margin:0 1rem;
					.iconfont{
						font-size:.6rem;
					}
					input{
						border:none;
						padding:0 0 .1rem .4rem;
						font-size:.4rem;
						width:60%;
					}
				}
				.button{
					width:2rem;
					height:.7rem;
					line-height:.7rem;
					text-align: center;
					border:1px solid #ccc;
					align-self:center;
					border-radius:.2rem;
					button{
						color:$mainColor;
					}
				}
			}
			.submit{
				margin:0 auto;
				margin-top:1rem;
				height:.7rem;
				width:3rem;
				background-color:$mainColor;
				border:1px solid $mainColor;
				border-radius:.4rem;
				text-align: center;
				line-height:.7rem;
				button{
					font-size:.4rem;
					color:#fff;
				}

			}	
			
		}
		
	}
</style>
