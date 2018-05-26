<template>
   <div class="contain">
      <div class="content">
        <div class="wrap">
           <label >充值金额:</label>
            <input type="text" placeholder="请输入充值金额" v-model="moeny">
        </div>
        <div class="dec">
          <p style="margin-bottom: .1rem;">
            将布洛克城中的GXS资产转移到您所在预言家的账户
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
import { recharge } from '../../api/api.js'
var qs=require("qs");
export default {
  name: 'HelloWorld',
  data () {
    return {
      moeny:''
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
  },
  methods: {
    submit(){
      var params ={
        amount:this.moeny
      }
      if(this.moeny){
        recharge(params).then(response=>{
          window.location.href=response.body;
        })
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
    }
    .dec{
      margin-top:.4rem;
      width:90%;
      margin:0 auto;
    }
    
  }
  .submit{
    width:50%;
    height:.9rem;
    line-height:.9rem;
    border:1px solid #ccc;
    margin:.5rem auto;
    text-align: center;
    border-radius:10px;
    background-color:rgb(231, 228, 231);
    color:#fff;
  }

}
</style>