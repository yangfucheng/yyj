<template>
  <div id="app"> 
      <router-view v-wechat-title='$route.meta.title'></router-view>
      <tabbar v-show="isTab">dada</tabbar>
  </div>
</template>


<script>
import tabbar from './components/tabbar.vue'
export default {
  name: 'App',
  components: {
    tabbar
  },
  created () {
    // this.$router.push('views/index.vue');
    this.$router.push('/')
  },
  computed: {
    isTab () {
      return this.$store.state.tabHidden
    }
  },
  watch: {
    '$route' () {
      if(!this.$store.state.tabHidden) {
        this.$store.dispatch('tabHidden')
      }
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
