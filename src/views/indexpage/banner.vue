<template>
  <!-- <div style="background:#f0f2f5;margin-top: -20px;"> -->
  <div>
   <div><img src="https://ydb.anydd.com/images/app/introduce.jpg" alt="" width="100%;"></div>
    
  </div>
</template>

<script>
// import img_404 from '@/assets/404_images/404.png'
// import img_404_cloud from '@/assets/404_images/404_cloud.png'

export default {
  data() {
    return {
      // img_404,
      // img_404_cloud
    }
  },
  created() {
    if(this.$store.state.tabHidden) {
      this.$store.dispatch('tabHidden')
    }
  },
  methods: {
    shuaxin(){
      history.go(0);
    }
  },
  computed: {
    message() {
      return '特朗普说这个页面你不能进......'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
