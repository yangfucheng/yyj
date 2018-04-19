<template>
   <div class="contianer">
      <div class="back-nav-bar">
        <div class="nav-container">
          <i class="iconfont icon-huitui"></i>
          <span class="nav-title">详情</span>
        </div>
      </div>
      <div class="title-content">
        <div class="title"><img src="../../static/icon/hot.png" height="14" width="14" alt="">预测BTC 2018年3月7号24点的价格,是否会跌破七千 人民币,以币安网的价格为准</div>
        <div class="start-time">开始时间: 2018年3月6号</div> 
        <!-- <div class="end-time">剩余时间: 03:24:14 18</div> -->
        <zk-time-down @time-end="message = '倒计时结束'" :endTime='endTime' class="end-time"></zk-time-down>
      </div>
      <div class="describe">
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
      <div class="bet">
        <div class="title">投注</div>
        <div class="content">
          <div class="option-font-three flexed">
              <div @click="choose()">A:是</div>
              <div>B:不会跌破</div>
              <div>C:不会跌破</div>
          </div>
          <div class="progress" ref="progress"> 
            <div></div> 
            <div></div>
            <div></div>
          </div>
          <div class="now-cent-three flexed" >
            <div>3.6</div>
            <div>3.6</div>
            <div>3.6</div>
          </div>
          <div class="now-title-three flexed">
            <div v-for="x in 3">获胜倍数/份</div>
          </div>
          <div class="average-cent-three flexed">
            <div>3.6 &nbsp<i class="iconfont icon-tubiaoshangshengqushi" style="color:red"></i></div>
            <div>3.6&nbsp<i class="iconfont icon-tubiaoshangshengqushi" style="color:red"></i></div>
            <div>3.6&nbsp<i class="iconfont icon-tubiaoshangshengqushi" style="color:red"></i></div>
          </div>
          <div class="average-three flexed">
            <div v-for="x in 3">平均获胜倍数</div>
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
          <tr v-for="x in 3">
            <td>A:不会跌破</td>
            <td>30</td>
            <td>3.3</td>
            <td>2018-03-13 17:23:21</td>
          </tr>
        </table>
      </div>
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="name-wrap">
          <div>
            <div class="option"> A:不会跌破</div>
            <div class="label">请选择投入代币的数量:</div>
          </div>
          <div>
             <div class="now-money">当前投入:{{allMoney}}</div>
             <div class="lab">账户余额:66gxs</div>
          </div>
        </div>
        <div class="button-wrap">
          <div v-for="x in buttonArray" @click="addMoney(x)">{{x}}</div>
        </div>
        <mt-range v-model="rangeValue" class="range">
            <div slot="start">0.1</div>
            <div slot="end">50</div>
        </mt-range>
        <div class="award">
          <span>当前获胜倍数:<span class="label-red">3.6</span></span>
          <span>猜对获得: <span class="label-red">666666666666</span></span>
        </div>
        <div class="footer">
          <span class="text">当前获得倍数仅供参考以确认后实时数据为准</span>
          <div class="button">
            <button @click="clear()">清空</button>
            <button>确认</button>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
import zkTimeDown from '../components/Countdown.vue'
export default {
  components : {
      zkTimeDown
  },
  data () {
    return {
      message : '正在倒计时',
      endTime : '1524900800000',
      popupVisible: false,
      rangeValue:0,
      buttonArray:[1,2,3,4,5,6],
      buttonMoeny:0,
      allMoney:0
    }
  },
  mounted() {
      // alert(this.cell);
      var proDom =this.$refs.progress;
      var divArray =proDom.getElementsByTagName('div');
      divArray[0].style.width ="33%";
      divArray[1].style.width ="33%";
      divArray[2].style.width ="35%";
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  methods: {
    choose(){
      this.popupVisible=true;
    },
    addMoney(x){
      this.buttonMoeny += x; 
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
    }
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
      .now-title-three{
        font-size:.4rem;
      }
      .average-cent-three{
        color:#ccc;
        font-size:.5rem;
        font-wight:700;
      }
      .average-three{
        font-size:.4rem;
        color:#ccc;
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
      flex-wrap:wrap;
      justify-content:space-between;
      width:80%;
      margin:0 auto;
      & > div{
        border:1px solid #1AC6BC;
        border-radius:.3rem;
        width:25%;
        padding:.15rem;
        text-align: center;
        margin-bottom:.13rem;
      }
    }
    .range{
      width:90%;
      margin:0 auto;
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
</style>
