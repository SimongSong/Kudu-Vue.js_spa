<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>
  
      <md-app-drawer md-permanent="full">
        <Sidemenu />       
      </md-app-drawer>
        
      <md-app-content>
        <router-view :key="$route.fullPath"/>
      </md-app-content>
    </md-app>
  </div>
</template>


<style lang="scss" scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>


<script>
import Sidemenu from './components/sidemenu.vue'

import Footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    Footer,
    Sidemenu
  }
}
</script>

282903819
1036393130