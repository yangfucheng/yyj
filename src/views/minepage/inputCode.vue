<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
   <router-link to="/" class="skip">跳过</router-link>
    <div class="wrap">
      <form action="#">
        <input type="text" placeholder="请输入邀请码" @change="search()" v-model="inviteCode">
      </form>
    </div>
    <div class="button" @click="search()">确定</div>
    
  </div>
</template>

<script>

import { inviteCode } from '../../api/api.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';



 var qs=require("qs");
export default {
  data () {
    return {
      value:'',
      inviteCode:''
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // this.fetch();
    
  },
  mounted () {  
    
  },  
  methods: {
   step(){
     this.$router.push({
      name:'index',
    })
   },
   search(){
      if(!this.inviteCode){
        Toast({
          message: '邀请码不能为空',
          position: 'middle',
          duration: 2000
        });
        return;
      }
      var params={
        inviteCode:this.inviteCode
      }
      inviteCode(params).then(res=>{
       this.$router.push({
          name:'index',
        })
      })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // @import "../common/mixin.scss";
  // @import "../common/style.scss";
  .contain{
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-image: url('https://ydb.anydd.com/images/app/yqbg1.jpg');
    background-size:100% 100%;
    background-repeat:no-repeat;
    z-index:-10;
    .skip{
      position:fixed;
      top:.5rem;
      right:.5rem;
      color:#fff;
      font-size:.4rem;
    }
    .wrap{
      width:50%;
      margin:60% auto 0 auto;
      border-bottom:1px solid #FFF;
      padding-bottom:.3rem;
      input::-webkit-input-placeholder{
        color:#FFF;
        font-size:.45rem;
      }
      input{
        width:80%;
        margin-left:30%;
        height:1rem;
        outline:none;
        border:none;
        background-color: transparent;
        color:#FFF;
        font-size:.5rem;
      }
    }
    .button{
        width:15%;
        margin:.8rem auto;
        padding:.15rem;
        text-align: center;
        border:1px solid #FFF;
        background-color: transparent;
        border-radius:12px;
        color:#fff;
        font-size:.35rem;



    }
  }
  

</style>
