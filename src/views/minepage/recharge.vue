<template>
   <div class="contain">
      <div class="content">
        <div class="wrap">
           <label style="color:#000">充值金额</label>
            <input type="text" placeholder="请输入充值金额" v-model="moeny">
        </div>
        <div class="dec">
          <p style="margin-bottom: .1rem;">
            将布洛克城中的{{coin}}资产转移到您所在预言家的账户
          </p>
          <p>
            请确保账户余额充足，此次充值将不收取手续费
          </p>
        </div>
      </div>
      <div class="submit" ref="chongzhi" >
          <div @click="submit">充值</div>
      </div>
   </div>

</template>

<script>
import {GetQueryString} from '../../untils/enums.js';
import { recharge } from '../../api/api.js';
import { Toast } from 'mint-ui';
var qs=require("qs");
export default {
  name: 'HelloWorld',
  data () {
    return {
      moeny:'',
      coin:''
    }
  },
  watch:{
    'moeny'(){
      if(this.moeny){
        this.$refs.chongzhi.style.backgroundColor = 'red';
      }else{
        this.$refs.chongzhi.style.backgroundColor = '#e7e4e7'
      }
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.coin=this.$route.params.coin;
  },
  methods: {
    submit(){
       var moeny = parseFloat(this.moeny).toFixed(8);
       this.moeny  = moeny;
      if(!this.isNumber(this.moeny) || this.moeny <= 0){
         Toast({
            message: '请输入大于0数字',
            position: 'middle',
            duration: 3000
          });
         return;
      }
     
      var params ={
        amount:this.moeny,
        tradeCoin:this.coin,
      }
      if(this.moeny){
        recharge(params).then(response=>{
          window.location.href=response.body;
        })
      }
    },
    isNumber(val){
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(regPos.test(val) || regNeg.test(val)){
        return true;
      }else{
        return false;
      }
    }
  },
  components:{
    
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/mixin.scss";
@import  '../../common/style.scss';
.contain {
  position:absolute;
  width:100%;
  top:0;
  height:100%;
  left:0;
  background-color:rgb(246, 244, 246);
  .content{
    background-color:#fff;
    color:#e0e0e0;
    border-bottom:1px solid #ccc;
    padding-bottom:.1rem;
    .wrap{
      width:90%;
      margin:0 auto;
      border-bottom:1px solid #ccc;
      margin-bottom:.2rem;
      font-size:.4rem;
      padding:.3rem 0;
      color:#CCC;
      input::-webkit-input-placeholder{
        color:#CCC;
      }
      input{
        outline:none;
        border:none;
      }
    }
    .dec{
      margin-top:.4rem;
      width:90%;
      margin:0 auto;
      color:#c0c4cc;
    }
    
  }
  .submit{
    width:80%;
    height:1.1rem;
    line-height:1.1rem;
    border:1px solid #ccc;
    margin:.5rem auto;
    text-align: center;
    border-radius:25px;
    background-color:rgb(231, 228, 231);
    color:#fff;
  }

}
</style>