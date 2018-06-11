<template>
  <div class="contain">
  <mt-navbar v-model="selected">
    <mt-tab-item id='current'>本周排行</mt-tab-item>
    <mt-tab-item id="last">上周排行</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected">
  <mt-tab-container-item id="current">
  <div class='user'>
    <div class='user_detail'><img :src='user.headPhoto?user.headPhoto:"https://ydb.anydd.com/images/app/logo.png"' class='logo'><span class='uname'>{{user?user.nickName:''}}</span></div>
    <div class='user_info'><p>我的收益值：{{userRank?(userRank.income?userRank.income:0):0}}</p><p>排名：<span class='rank'>{{userRank!=null?userRank.rank:''}}</span>&nbsp;名</p></div>
  </div>
  <div class='list'>
    <ul class='rank_list'>
      <li><ul class='thead'><li>名次</li><li>用户名</li><li>收益值</li></ul></li>
      <li v-for='item in dataObj' :key='item.id'>
        <ul><li><span :class="'rank' +item.rank">{{item.rank}}</span></li><li>{{item.username | changeTel}}</li><li>{{item.income}}</li></ul>
      </li>
    </ul>
  </div>
  </mt-tab-container-item>
  <mt-tab-container-item id="last">
  <div class='user'>
    <div class='user_detail'><img :src='user.headPhoto?user.headPhoto:"https://ydb.anydd.com/images/app/logo.png"' class='logo'><span class='uname'>{{user?user.nickName:''}}</span></div>
    <div class='user_info'><p>我的收益值：{{lastRank?(lastRank.income?lastRank.income:0):0}}</p><p>排名：<span class='rank'>{{lastRank!=null?lastRank.rank:''}}</span>&nbsp;名</p></div>
  </div>
  <div class='list'>
    <ul class='last_rank_list'>
      <li><ul class='thead'><li>名次</li><li>用户名</li><li>收益值</li><li>奖励</li></ul></li>
      <li v-for='item in lastObj' :key='item.id'>
        <ul><li><span :class="'rank' +item.rank">{{item.rank}}</span></li><li>{{item.username | changeTel}}</li><li>{{item.income}}</li><li>{{item.bonus}}</li></ul>
      </li>
    </ul>
  </div>
  </mt-tab-container-item>
  </mt-tab-container>
  <div>
    <img src='https://ydb.anydd.com/images/app/rank2.jpg' class='intro'/>
  </div>
  </div>
</template>

<script>
import { getRank,info,getUserRank} from '../api/api.js'
import { Indicator} from 'mint-ui';

export default {
  data () {
    return {
      selected:'current',
      user:'',
      dataObj:{},
      userRank:{},
      lastObj:'',
      lastRank:'',
    }
  },
  filters: {
    changeTel(value){
      let reg = /^1[0-9]{10}$/;
      if(!reg.test(value)){
        return value;
      }else{
        let name=value.substr(0,3)+'****'+value.substr(7,11);
        return name;
      }
    }
  },
  watch: {
    selected: function (val, oldVal) {
      if(val=='last'){
        if(this.lastRank==''){
          this.fetch('last');
          this.getMineRank('last');
        }
      }
    }
  },
  created(){
    this.getUserInfo();
    this.fetch('current');
    this.getMineRank('current');
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    };
    window.scroll(0,0);
    history.scrollRestoration = 'manual';
  },
  methods: {
    fetch(type){
      Indicator.open();
      getRank(type).then(response=>{
        Indicator.close();
        if(type=='current'){
          this.dataObj=response.body;
        }else{
          this.lastObj=response.body;
        }
      },function (res) {
        Indicator.close();
      })
    },
    getUserInfo(){
      info().then(response=>{
        this.user =response.body;
      })
    },
    getMineRank(type){
      getUserRank(type).then(response=>{
        if(type=='current'){
          this.userRank =response.body;
        }else{
          this.lastRank=response.body;
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .mint-navbar .mint-tab-item.is-selected{
    color:#1AC6BC;
    border-color:#1AC6BC;
  }
  a:hover{
    text-decoration: none;
  }
  .rank1,.rank2,.rank3{
    display: inline-block;
    width: 16px;
  }
  .rank1{
    color: #fbcc44;
    background:url('../common/images/guanjun.png') no-repeat center center;
  }
  .rank2{
    color:#c6c6c6;
    background:url('../common/images/yajun.png') no-repeat center center;
  }
  .rank3{
    color:#c18c22;
    background:url('../common/images/jijun.png') no-repeat center center;
  }
  .intro{
    width:100%;
    margin-top: .6rem;
  }
  span,li,p,.user_detail{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .rank_list ul>li:first-child,.rank_list ul>li:nth-child(3){
    width: 30%;
  }
  .last_rank_list ul>li:first-child{
    width:14%;
  }
  .last_rank_list ul>li:nth-child(3),.last_rank_list ul>li:nth-child(4){
    width:23%;
  }
  .contain{
    color:#676b6d;
    .mint-navbar{
      border-bottom:1px solid #ddd;
    }
    .user{
      display: flex;
      div{
        box-sizing:border-box;
        padding:0.3rem;
      }
      .user_detail{
        width:55%;
      }
      .logo,.uname{
        vertical-align:middle;
      }
      .logo{
        width:1.6rem;
        height: 1.6rem;
        border-radius:50%;
        border:1px solid #e5e5e5;
        margin-right: 0.2rem;
      }
      .user_info{
        width: 45%;
        p{
          line-height: 0.8rem;
        }
        .rank{
          font-size: 0.5rem;
        }
      }
    }
    .rank_list>li:nth-child(2),.last_rank_list>li:nth-child(2){
        margin-top:36px;
      }
    .rank_list,.last_rank_list{
      max-height:415px;
      min-height: 36px;
      overflow: scroll;
      ul:after{
        content:""; 
        display:block; 
        height:0; 
        visibility:hidden; 
        clear:both;
      }
      .thead{
        width: 100%;
        position: absolute;
        background:#2bb8ae;
        color:#fff;
        border-bottom:none;
      }
      ul{
        border-bottom:1px solid #eee;
        li{
          float: left;
          text-align:center;
          padding:10px 0;
        }
        li:nth-child(2){
          width:40%;
        }
      }
    }
  }
  
</style>
