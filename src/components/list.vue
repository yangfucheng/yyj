<template>
   <div class="contianer">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="本周排行" name="first">
      </el-tab-pane>
      <el-tab-pane label="上周排行" name="second">
      </el-tab-pane>
    </el-tabs>
    <div class='rank'>
      <div class='info'>
        <img src='' width='50' height='50' />
        <span>xxx</span>
      </div>
      <div class='rank_list'>
        <div>收益值</div>
        <div>排名</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>名次</th>
          <th>账户</th>
          <th>收益值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataArray.history">
          <td>{{item.betResult}}</td>
          <td>{{item.betQuantity}}</td>
          <td>{{item.betOdds}}</td>
        </tr>
      </tbody>
    </table>
    <div class='footer'>
      <span>*</span>
      排行榜说明：预言周排行榜根据用户在每周一至周日中获得的GXS和PPS折算成一定的分值进行排行，收益1GXS对应25收益值，收益1PPS对应1收益值，进入排行榜前10位的用户每周都能获得PPS奖励。
    </div>
  </div>
</template>

<script>

import zkTimeDown from '../components/Countdown.vue'
import {getDetial,bet,refresh} from '../api/api.js'
import {list_self,list_all} from '../../src/untils/enums.js'
import { Indicator,Toast } from 'mint-ui';
import {GetQueryString} from '../untils/enums.js'
var qs=require("qs");
export default {
  components : {
      zkTimeDown
  },
  data () {
    return {
      message: '正在倒计时',
      endTime: 0,
      popupVisible: false,
      rangeValue:0,
      buttonArray:[5,10,50,'全部'],
      buttonMoeny:0,
      allMoney:0,
      dataArray:null,
      optOrder:'',
      option:'',
      nowOdd:'',
      maxValue:0,
      scaleA:0,
      scaleB:0,
      scaleC:0,
    }
  },
  mounted() {
    
  },
  computed:{
    getAllMoney(){
      return parseFloat((this.nowOdd * this.allMoney).toFixed(7))
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // alert(GetQueryString(id))
    // alert(this.$route.params.id);
    // this.dataArray=this.$route.params.dataArray;
    // this.endTime =this.dataArray.betEndTime || '';
    // this.maxValue = this.dataArray.maxBet;
    this.dataArray = [];
    this.fetch();
  },
  filters: {
    changeTime(value){
      return timestampToTime(value)
    },
    changeDate(value){
      return timestampTodate(value)
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    fetch(){
      
    }

    
    
  },
  watch: {
    'rangeValue'() {
       this.allMoney = this.rangeValue + this.buttonMoeny;
    },
    'buttonMoeny'(){
        this.allMoney = this.rangeValue + this.buttonMoeny;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../common/mixin.scss";
@import "../common/style.scss";
.contianer {
  table{
    thead{
      color: #fff;
      background: #409EFF;
    }
    width:100%;
    padding:100px;
    // box-shadow:0 -1px 10px #ccc;
    th{
      width:25%;
      text-align: center;
      font-size:.35rem;
      padding-bottom:.3rem;
      padding-top:.3rem;
      border-bottom:1px solid #ccc;
    }
    td {
      text-align: center;
      border-bottom:1px solid #ccc;
    }
  }
  .rank{
    width: 100%;
    display: flex;
    justify-content:space-around;
    margin: 10px 0;
  }
  .footer{
    span{
      color: red;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 8px;
  }
  

}
</style>
