<template>
   <div class="contain">
   <!--    <div class="nav-bar">个人中心</div> -->
     
      <ul class="content">
         <li>
           <el-upload
            class="avatar-uploader"
            action="/app/user/update/photo"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="name">
            <label>用户头像</label>
            <div class="icon1" >
              <div class="icon-img">
                <img :src="icon" alt="" width='48' height='48' class="icon">
              </div>
            </div>
             <img src="../../../static/icon/jiantou.png" height="22" width="22" alt="" style="" class="jiantou">
          </div>
        </li>
        <li v-for="item in common" @click="step(item.type,item.text)">
          <!-- <div class="icon"><img :src="item.icon" height="22" width="22" alt=""></div> -->
          <div class="text">{{item.text}}</div>
          <div class="textRight">{{item.textRight}}</div>
          <div class="into" v-show='item.text=="昵称"'><img src="../../../static/icon/jiantou.png" height="22" width="22" alt=""></div>
        </li>
      </ul>
   </div>
</template>

<script>
import { info,changeName} from '../../api/api.js'
import { Indicator ,MessageBox,Toast } from 'mint-ui';
import axios from 'axios';
import { getToken } from '../../untils/auth.js'

 var qs=require("qs");
export default {
  data () {
    return {
      icon:'',
      imageUrl:'',
      ruleForm1:null,
      loading2:'',
      common:[
      {
        icon:'../../static/icon/canyu.png',
        text:'昵称',
        textRight:''
      },
      {
        icon:'../../static/icon/collect.png',
        text:'当前账号',
        textRight:''
      },
      {
        icon:'../../static/icon/tixian.png',
        text:'关于我们',
        type:'wai'
      }
      ],
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
    this.fetch();
  },
  methods: {
    step(type,text) {
     if(type=="wai"){
        window.location.href ="https://www.ppset.io";
      }
      if(text=='昵称'){
       
        MessageBox.prompt(' ','请输入新昵称').then(({ value, action }) => {
          if(value!=''&&value!=null){
            changeName({userName:value}).then(response=>{
              Toast({
                message: '修改名称成功',
                iconClass: 'icon icon-success'
              });
              this.fetch();
            })
          }
        });
      }
    },
    // update(e){
    //   alert(1);
    //   console.log(e)
    //   let file = e.target.files[0];             
    //   let param = new FormData(); //创建form对象  
    //   if(file){
    //     param.append('file',file,file.name);//通过append向form对象添加数据  
    //     param.append('chunk','0');//添加form表单中其他数据  
    //     let config = {  
    //       headers:{'Content-Type':'multipart/form-data'},
    //       token:getToken()
    //     };  //添加请求头  
    //     axios.post('/app/user/update/photo',param,config)  
    //     .then(response=>{  
    //       if(response.data && response.data.body.headPhoto){
    //         this.icon = response.data.body.headPhoto;
    //       }
    //     })
    //    }  
    // },
    beforeAvatarUpload(file){

        
        const isJPG = (file.type === 'image/jpeg'||file.type ==='image/jpg'||file.type ==='image/png'||file.type ==='image/JPG'||file.type ==='image/PNG'||file.type ==='image/gif');

         const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是图片格式!');
          Indicator.close();
        }else if(!isLt2M){
            this.$message.error('上传头像图片大小不能超过 1MB!');
            Indicator.close();
        }else{
           Indicator.open();
        }


        return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      Indicator.close();
      if(res){
         this.icon = res.body.headPhoto;
         this.imageUrl =res.body.headPhoto;
      }else{
         this.$message.error('上传失败!');
      }
     
    },
    fetch(){
      Indicator.open();
      info().then(response=>{
        Indicator.close();
        this.common[0].textRight =response.body.nickName;
        this.common[1].textRight =response.body.account;
        if(response.body && response.body.headPhoto){
           this.icon = response.body.headPhoto;
         }else{
            this.icon = '../../../static/icon/yucec.png';
         }
       
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // @import "../common/style.scss";

  
  .contain{
    position:absolute;
    background-color:rgb(239, 239, 244);
    height:100%;
    width:100%;
    top:0;
    left:0;
    .content{
      // margin-top:1.2rem;
      // margin-top:5rem;
        li{
          // @include border-1px();
          height:1.2rem;
        }
        li:nth-child(1){
          .avatar{
            width:10rem;
            height:1.5rem;
          }
          .avatar-uploader-icon{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            font-size:50px;
            height:1.5rem;
            opacity:0;
          }
          .avatar-uploader{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 1.5rem;
              opacity: 0;
              z-index: 11;
              // border:1px solid;
          }
          label{
            position:absolute;
            left:.3rem;
            color:#97a0a6;
            z-index:1;
            top:0;
          }
          .file{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:1.5rem;
            opacity:0;
            z-index:11;
          }
          height:1.5rem;
          border-bottom:5px solid #eeeeee;
          line-height:1.5rem;
          .icon1{
            position:absolute;
            top:-.1rem;
            right:1.5rem;
            height:1.2rem;
            width:1rem;
            .icon-img{
              // border:1px solid #BBB;
              // border-radius:50%;
              .icon{
                border:1px solid #fff;
                border-raduis:50%;
                height:1rem;
                width:1rem;
                border-radius:50%;
              }
              width:1rem;
              height:1rem;
            }
          }
          .jiantou{
             position:absolute;
            top:.5rem;
            right:.3rem;
          }
        }
        li:nth-child(2n){
          // @include border-1px();
          border-top:1px solid #e0e0e0;
          border-bottom:1px solid #e0e0e0;
          // @include border-1px-top
        }
        li:nth-child(5){
          margin-top:.3rem;
        }
        li:nth-child(n) {
          background-color:#fff; 
          position:relative;
          .icon{
            position:absolute;
            top:.32rem;
            left:.4rem;
            height:.45rem;
            width:.45rem;
          }
          .text{
            position:absolute;
            top:.4rem;
            left:.3rem;
            font-size:.3rem;
            color:rgb(151, 160, 166);
          }
          .textRight{
             position:absolute;
             top:.4rem;
             right:1rem;
             height:.5rem;
             width:5rem;
             text-align: right;
             color:rgb(151, 160, 166);
          }
          .into {
             position:absolute;
             top:.3rem;
             right:.3rem;
             height:.5rem;
             width:.5rem;
             text-align: center;
          }
        }

    }

    
    
  }
  

</style>
