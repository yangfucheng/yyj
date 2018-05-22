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
               type : Number
           },
           type : {
             type : Boolean
           }
       },
       methods : {
           timeDown () {
               const endTime = new Date(this.endTime)
               const nowTime = new Date();
               let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
               let d = this.formate(parseInt(leftTime/(24*60*60)))
               let h = this.formate(parseInt(leftTime/(60*60)%24))
               let m = this.formate(parseInt(leftTime/60%60))
               let s = this.formate(parseInt(leftTime%60))
               
               this.time = `${d}天${h}小时${m}分${s}秒`
               if(leftTime <= 0){
                   // this.flag = true
                   // this.$emit('time-end')
                   this.time="已结束"
               }
               if(this.type==false && leftTime > 0){
                  this.time = `${d}天${h}小时`
               }
           },
           formate (time) {
               if(time>=10){
                   return time
               }else if(time < 0 || !time){
                  return '0'
               }else{
                   return `0${time}`
               }
           }
       }
   }
</script>
