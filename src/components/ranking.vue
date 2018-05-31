<template>
  <div class="contain">
  <mt-navbar v-model="selected">
    <mt-tab-item id='current'>本周排行</mt-tab-item>
    <mt-tab-item id="last">上周排行</mt-tab-item>
  </mt-navbar>
  <mt-tab-container v-model="selected">
  <mt-tab-container-item id="current">
  <div class='user'>
    <div class='user_detail'><img src='../common/images/logo.png' class='logo'><span class='uname'>{{user.userName}}</span></div>
    <div class='user_info'><p>我的收益值：{{userRank!=null?userRank.income:''}}</p><p>排名：<span class='rank'>{{userRank!=null?userRank.rank:''}}</span>名</p></div>
  </div>
  <div class='list'>
    <ul class='rank_list'>
      <li><ul class='thead'><li>名次</li><li>用户名</li><li>收益值</li></ul></li>
      <li v-for='item in dataObj' :key='item.id'>
        <ul><li><span :class="'rank' +item.rank">{{item.rank}}</span></li><li>{{item.username}}</li><li>{{item.income}}</li></ul>
      </li>
    </ul>
  </div>
  </mt-tab-container-item>
  <mt-tab-container-item id="last">
  <div class='user'>
    <div class='user_detail'><img src='../common/images/logo.png' class='logo'><span class='uname'>{{user.userName}}</span></div>
    <div class='user_info'><p>我的收益值：{{lastRank!=null?lastRank.income:''}}</p><p>排名：<span class='rank'>{{lastRank!=null?lastRank.rank:''}}</span>名</p></div>
  </div>
  <div class='list'>
    <ul class='rank_list'>
      <li><ul class='thead'><li>名次</li><li>用户名</li><li>收益值</li></ul></li>
      <li v-for='item in lastObj' :key='item.id'>
        <ul><li><span :class="'rank' +item.rank">{{item.rank}}</span></li><li>{{item.username}}</li><li>{{item.income}}</li></ul>
      </li>
    </ul>
  </div>
  </mt-tab-container-item>
  </mt-tab-container>
  <div>
    <img src='https://ydb.anydd.com/images/app/rank.jpg' class='intro'/>
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
  created(){
    this.fetch('current');
    this.fetch('last');
    this.getUserInfo();
    this.getMineRank('current');
    this.getMineRank('last');
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
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
  span,li,p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    .rank_list{
      ul:after{
        content:""; 
        display:block; 
        height:0; 
        visibility:hidden; 
        clear:both;
      }
      .thead{
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
        li:first-child,li:nth-child(3){
          width: 30%;
        }
        li:nth-child(2){
          width:40%;
        }
      }
    }
  }
  
</style>
