<template>
   <div class="contianer">
      <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">详情</span>
        </div>
      </div>
      <div class="title-content">
        <div class="title"><img src="../../static/icon/hot.png" height="14" width="14" alt="">{{dataArray.title}}</div>
        <div class="start-time">开始时间: {{dataArray.betStartTime | changeTime}}</div> 
        <!-- <div class="end-time">剩余时间: 03:24:14 18</div> -->
        <zk-time-down @time-end="message = '倒计时结束'" :endTime='endTime' :type="true" class="end-time"></zk-time-down>
      </div>
      <div class="describe" v-show="false">
        <div class="situation">
          <div>
            <div class="name">BTC/CNY</div>
            <div class="prodution-name">币种</div>
          </div>
          <div>
            <div class="name">71029.82</div>
            <div class="prodution-name">最新价</div>
          </div>
          <div>
             <div class="name">-1.8%</div>
            <div class="prodution-name">涨跌幅</div>
          </div>
        </div>
        <div class="prodution"><span class="label">数据来源:网易&nbsp&nbsp&nbsp</span><a>http://www.baidu.com</a></div>
      </div>
      <div class="notice">
        <span><i class="iconfont icon-xinxi"></i>比特币一直在跌,大神预言zhe</span>
      </div>
      <div class="bet">
        <div class="title">投注</div>
        <div class="content">
          <div class="option-font-three flexed">
              <div @click="choose('A',dataArray.optionA,dataArray.optionAOdds)"><span v-show="!dataArray.optionC">选项</span>A:{{dataArray.optionA}}</div>
              <div @click="choose('B',dataArray.optionB,dataArray.optionBOdds)"><span v-show="!dataArray.optionC">选项</span>B:{{dataArray.optionB}}</div>
              <div v-if="dataArray.optionC" @click="choose('C',dataArray.optionC,dataArray.optionCOdds)">C:{{dataArray.optionC}}</div>
          </div>
          <div class="progress" ref="progress"> 
            <div></div> 
            <div></div>
            <div v-show="dataArray.optionC"></div>  
          </div>

         <div :class="(!dataArray.optionC)?'now-cent-two flexed':'now-cent-three flexed'" >
            <div>{{dataArray.optionAOdds}}</div>
            <div>{{dataArray.optionBOdds}}</div>
            <div v-if="dataArray.optionC">{{dataArray.optionCOdds}}</div>
          </div>
          <div :class="(!dataArray.optionC)?'now-title-two flexed':'now-title-three flexed'">
            <div>获胜倍数/份</div>
            <div>获胜倍数/份</div>
            <div v-if="dataArray.optionC">获胜倍数/份</div>
          </div>
          <div :class="(!dataArray.optionC)?'average-two flexed':'average-three flexed'">
            <div><i class="iconfont icon-29"></i>{{dataArray.optionAQuantity}}{{dataArray.tradeCoin}}</div>
             <div><i class="iconfont icon-29"></i>{{dataArray.optionBQuantity}}{{dataArray.tradeCoin}}</div>
              <div v-if="dataArray.optionC"><i class="iconfont icon-29"></i>{{dataArray.optionCQuantity}}{{dataArray.tradeCoin}}</div>
          </div>
        </div>
      </div>
      <div class="history">
        <div class="title">历史投注记录</div>
        <table>
          <tr>
            <th>投入选项</th>
            <th>投入份数</th>
            <th>获胜倍数</th>
            <th>投注时间</th>
          </tr>
          <tr v-for="item in dataArray.history">
            <td>{{item.betResult}}</td>
            <td>{{item.betQuantity}}</td>
            <td>{{item.betOdds}}</td>
            <td>{{item.createTime | changeTime}}</td>
          </tr>
        </table>
      </div>
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="name-wrap">
          <div>
            <div class="option"> {{optOrder}}:{{option}}</div>
            <div class="label">请选择投入代币的数量:</div>
          </div>
          <div>
             <div class="now-money">当前投入:{{allMoney}}</div>
             <div class="lab">账户余额:66gxs</div>
          </div>
        </div>
         <div class="range">
          <div class="input">
             <el-input-number v-model="rangeValue"  :min="1" :max="maxValue" label="描述文字" ></el-input-number>
          </div>
        </div>
        <div class="button-wrap">
          <div v-for="x in buttonArray" @click="addMoney(x)">{{x}}</div>
        </div>
       <!--  <mt-range v-model="rangeValue" class="range">
            <div slot="start">0.1</div>
            <div slot="end">50</div>
        </mt-range> -->
        <div class="award">
          <span>当前获胜倍数:<span class="label-red">{{nowOdd}}</span></span>
          <span>猜对获得: <span class="label-red">{{nowOdd * allMoney}}</span></span>
        </div>

        <div class="footer">
          <span class="text">当前获得倍数仅供参考以确认后实时数据为准</span>
          <div class="button">
            <button @click="clear()">清空</button>
            <button @click="submit()">确认</button>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
import zkTimeDown from '../components/Countdown.vue'
import {getDetial,bet,refresh} from '../api/api.js'
import {timestampToTime} from '../../src/untils/enums.js'
var qs=require("qs");
export default {
  components : {
      zkTimeDown
  },
  data () {
    return {
      message: '正在倒计时',
      endTime: '',
      popupVisible: false,
      rangeValue:0,
      buttonArray:[5,10,50,'全部'],
      buttonMoeny:0,
      allMoney:0,
      dataArray:null,
      optOrder:'',
      option:'',
      nowOdd:'',
      maxValue:''
    }
  },
  mounted() {
      // alert(this.cell);
    var proDom =this.$refs.progress;
    var divArray =proDom.getElementsByTagName('div');
    // let scaleA = 0.95 / this.dataArray.optionAOdds;
    // let scaleB = 0.95 / this.dataArray.optionBOdds;
    // let scaleC = 0.95 / (this.dataArray.optionCOdds);
    let optionAQuantity = this.dataArray.optionAQuantity;
    let optionBQuantity = this.dataArray.optionBQuantity;
    let optionCQuantity = this.dataArray.optionCQuantity;
    let optionAll = optionAQuantity + optionBQuantity +optionCQuantity
    let scaleA = optionAQuantity/optionAll;
    let scaleB = optionBQuantity/optionAll;
    let scaleC = optionCQuantity/optionAll;
    // divArray[0].style.width =toPercent(scaleA);
    // divArray[1].style.width =toPercent(fomat(scaleA,scaleB,scaleC,1));
    // divArray[2].style.width =toPercent(fomat(scaleA,scaleB,scaleC,2));
    // if(scaleC==Infinity){
    //   scaleC=0;
    // }
    // alert(scaleC)
    divArray[0].style.width =toPercent(scaleA);
    divArray[1].style.width =toPercent(fomat(scaleA,scaleB,scaleC,1));
    divArray[2].style.width =toPercent(fomat(scaleA,scaleB,scaleC,2));
    // divArray[0].style.width =scaleA
    // divArray[1].style.width =scaleB
    // divArray[2].style.width =scaleC
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
          return scaleC
        }
      }else if(!scaleC&&num==2){
        return 0;
      }
      else{
        return scaleB;
      }
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    // alert();
    this.dataArray=this.$route.params.dataArray;
    this.endTime =this.dataArray.betEndTime || '';
    this.maxValue = this.dataArray.maxBet;
    this.fetch();
    this.initTime();
  },
  filters: {
    changeTime(value){
      return timestampToTime(value)
    }
  },
  methods: {
    fetch(){
      var params = {
        projectId:this.dataArray.id
      }
      getDetial(params).then(response=>{
        this.dataArray = response.body;
      })
    },
    initTime(){
      // self =this;
      // var init = setInterval(function(){
      //   self.refresh();
      // },10000)
    },
    refresh(){
      var params ={
        projectId : this.dataArray.id
      }
      refresh(params).then(response=>{
        this.dataArray.optionAQuantity = response.body.optionAQuantity;
        this.dataArray.optionBQuantity = response.body.optionBQuantity;
        this.dataArray.optionCQuantity = response.body.optionCQuantity;
      })
    },
    submit() {
      var params ={
        projectId:this.dataArray.id,
        betResult:this.optOrder,
        betQuantity:(this.allMoney * this.dataArray.minBet),
      }
      bet(params).then(response=>{
        this.popupVisible = false;
        this.fetch();
      })
    },
    choose(optOrder,option,optionOdd){
      this.popupVisible=true;
      this.optOrder = optOrder;
      this.option =option;
      this.nowOdd = optionOdd;
    },
    addMoney(x){
      if(x=="全部"){
        this.rangeValue =this.dataArray.maxBet;
      }else{
         this.rangeValue = x; 
      }
    },
    clear(){
      this.allMoney = 0;
      this.rangeValue = 0;
      this.buttonMoeny = 0;
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
  width:100%;
  margin:0 auto;
  .title-content{
    width:98%;
    margin:0 auto;
    border:1px solid ;
    .title{
      font-size:.4rem;
      font-weight:700;
      margin:.1rem .2rem .4rem .2rem;
    }
    .start-time {
      font-size:.3rem;
      color:#C0C0C0;
      font-weight:400;
      margin:.1rem .2rem .1rem .2rem;
      border-bottom:1px solid #C0C0C0;
    }
    .end-time {
      font-size:.4rem;
      font-weight:700;
      margin-left:38%;
    }
  }
  .describe{
    border:1px solid #ccc;
    padding:.3rem;
    margin-top:.1rem;
    // border-radius:.3rem;
    .situation{
      display:flex;
      justify-content:space-around;
      .name{
        font-size:.5rem;
        font-weight:700;
      }
      .prodution-name{
        font-size:.3rem;
        color:#ccc;
        text-align: center;
      }
    }
    .prodution{
      margin-left:.52rem;
      margin-top:.1rem;
      .label{
        color:#ccc;
      }
      a{
        color:green;
      }
    }
  }
  .notice{
    border-bottom:1px solid #ccc;
    border-top:1px solid #ccc;
    padding:.3rem .6rem;
    font-size:.35rem;
    color:rgb(77, 94, 187)
  }
  .bet{
    .title{
      font-size:.45rem;
      font-weight:700;
      margin:.1rem 0;
      margin-left:.1rem;
    }
    .content {
      border:1px solid #ccc;
      padding-bottom:.3rem;
      box-shadow:0 -1px 10px #ccc;
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
        div:nth-child(1){
          border-right:1px solid #ccc;
        }
        & > div{
          width:50%;
        }
      }
      .option-font-two{
        font-weight:700;
        font-size:.5rem;
      }
      .progress {
        margin:0 auto;
        margin-top:.1rem;
        margin-bottom:.2rem;
        width:90%;
        height:.25rem;
        border-radius:5px;
        background-color:#FFF;
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
          background-color:#1AC6BC;
          height:.25rem;
        }
      }
      .option-font-three{
        font-weight:700;
        font-size:.4rem;
        padding:.1rem;
        & > div {
          border:1px solid #1AC6BC;
          padding:.1rem;
          margin:.3rem .3rem .1rem .3rem;
        }
      }
      .now-cent-three{
        font-weight:700;
        font-size:.7rem;
      }

      .now-cent-two{
        font-weight:700;
        font-size:1rem;
        width:70%;
        margin:0 auto;
        & > div:nth-child(2){
          border-left:1px solid #ccc;
          padding-left:1.2rem;
        }
      }
      .now-title-three{
        font-size:.4rem;
      }
      .now-title-two{
        font-size:.4rem;
        width:70%;
        margin:0 auto;
      }
      .average-three{
        font-size:.4rem;
        color:#000;
      }
      .average-two{
        font-size:.4rem;
        color:#000;
        width:70%;
        margin:0 auto;
      }
    }
  }
  .history{
    .title{
      font-size:.45rem;
      font-weight:700;
      margin:.1rem 0;
      margin-left:.1rem;
      margin-top:.15rem;
      margin-bottom:.2rem;
    }
    table{
      width:100%;
      padding:100px;
      box-shadow:0 -1px 10px #ccc;
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
  }
  .mint-popup-bottom{
    width:100%;
    height:8rem;
    .name-wrap{
      margin-top:.2rem;
      display:flex;
      margin-left:.7rem;
      margin-bottom:.2rem;
      .option{
        text-align: center;
        font-size:.5rem;
        font-weight:700;
        padding:.3rem;
        border:1px solid #1AC6BC;
      }
      .label{
        text-align: center;
        margin-top:.2rem;
        font-size:.35rem;
      }
      //凌晨两点的布局,蒙圈了,有时间优化记得修改.
      .lab{ 
        text-align: center;
        margin-left:.8rem;
        margin-top:.3rem;
        font-size:.35rem;
      }
      .now-money{
        font-size:.5rem;
        font-weight:700;
        text-align: center;
        margin-left:.5rem;
        padding:.3rem;
      }
    }
    .button-wrap{
      display:flex;
      // flex-wrap:wrap;
      justify-content:space-between;
      width:80%;
      margin:0 auto;
      & > div{
        border:1px solid #1AC6BC;
        border-radius:.3rem;
        width:15%;
        padding:.15rem;
        text-align: center;
        margin-bottom:.13rem;
      }
    }
    .range{
      width:7rem;
      margin:.2rem auto;
      .input{
        width:7rem;
      }
    }
    .award{
      display:flex;
      justify-content:space-around;
      margin-top:.2rem;
      font-size:.35rem;
      margin-bottom:.4rem;
      .label-red{
        color:red;
        margin-left:.1rem;
      }
    }
    .footer{
      display:flex;
      width:90%;
      margin:0 auto;
      .text{
        width:56%;
        font-size:.45rem;
      }
      .button{
         width:45%;
         margin-left:.1rem;
         margin-top:.2rem;
         button{
          text-align: center;
          border:1px solid #1AC6BC;
          border-radius:.3rem;
          width:1.8rem;
          height:.9rem;
          background-color:#FFF;
         }
         button:nth-child(2){
          background-color:#1AC6BC;
         }
      }
    }
  }
}
.el-input-number{
  width:7rem;
  line-height:1rem;
}

.el-input__inner{
  width:7rem;
  line-height:.5rem;
}
</style>
