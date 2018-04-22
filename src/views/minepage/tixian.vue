<template>
   <div class="contain">
      <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">详情</span>
        </div>
      </div>
      <div class="wrap">
        <div class="label">请选择你要的币种:</div>
        <el-select v-model="value" placeholder="请选择" class="select" size="mini">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="num">
          <span class="label text">可用数量:</span>
          <span class="label" v-model="num">{{num}}</span>
        </div>
        <div class="num">
          <span class="label text">提现数量</span>
          <el-input v-model="count" class="input" size="mini"></el-input></div>
        <div class="num"><span class="label text">实际到账:</span><span class="label">21.987</span></div>
      </div>
      <div class="footer">
        <el-button type="primary" plain :disabled="disabled">提取</el-button>
      </div>
   </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      num:"21987",
      count:"",
      disabled:true,
      value:'GXS',
      options: [{
          label: 'GSX1'
        }, {
          label: 'GSX2'
        }, {
          label: 'GSX3'
        }, {
          label: 'GSX4'
        }, {
          label: 'GSX5'
        }],
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  watch:{
    'count'(){
      if(this.count < this.num){
        this.disabled = false;
      }else{
        this.disabled = true;
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
	position:relative;
  width:100%;
  .select{
    margin:.2rem .5rem;
  }
  .wrap{
    border-bottom:1px solid #ccc;
    padding-bottom:.5rem;
    .label{
      margin:.2rem .5rem;
      font-size:.5rem;
      font-weigh:500;
    }
    .num{
      margin:.35rem 0;
      .text{
      margin-right:.1rem;;
      }
      .input{
        margin-left:.5rem;
        height:.5rem;
        width:2.5rem;
      }
    }
  }
  .footer{
    margin-top:.5rem;
    text-align: center;
  }

  .el-button{
    padding:10px 30px;
  }

  .is-disabled{
    color: #bcbec2;
    background-color: #f4f4f5;
    border-color: #e9e9eb;
  }
}

.el-input__inner{
  height:16px;
  padding:0 10px;
}
</style>