<template>
      <p>剩余时间:{{time}}</p>
</template>

<script>
   export default{
       data () {
           return {
               time : '',
               flag : false
           }

       },
       mounted () {
           let time = setInterval(()=>{
               if(this.flag == true){
                   clearInterval(time)
               }
               this.timeDown()
           },500)
       },
       props : {
           endTime : {
               type : String
           }
       },
       methods : {
           timeDown () {
               const endTime = this.endTime;
               const nowTime = new Date();
               // alert(endTime.getTime());
               let leftTime = parseInt((endTime-nowTime.getTime())/1000)
               let d = parseInt(leftTime/(24*60*60))
               let h = this.formate(parseInt(leftTime/(60*60)%24))
               let m = this.formate(parseInt(leftTime/60%60))
               let s = this.formate(parseInt(leftTime%60))
               if(leftTime <= 0){
                   this.flag = true
                   this.$emit('time-end')
               }
               if(leftTime >= 0){
                this.time = `${d}天${h}小时${m}分${s}秒`
              }else{
                this.time ='已经结束'
              }
               

           },
           formate (time) {
               if(time>=10){
                   return time
               }else{
                   return `0${time}`
               }
           }
       }
   }
</script>
