<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">

      <md-app-drawer md-permanent="full">
        <Sidemenu />       
      </md-app-drawer>
        
      <md-app-content >
        <router-view class="router-component" :key="$route.fullPath"/>
        <div class="side-component">
        
    <md-card>
      <md-card-header>
        <div class="md-title">Recently Visited</div>
      </md-card-header>
      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>
    </md-card>
    <br/>
    <md-card>
      <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header>
      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>
    </md-card>
         </div>        
      </md-app-content>

    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, .12);
    padding-left :9%;
  }

  @media (max-width: 978px) {
    .md-app{
        padding-left :0px;
    }
  } 

   // Demo purposes only
  .md-drawer {
    width: 220px;
    max-width: calc(100vw - 125px);
  }
  
  .page-container {
   
  }

  .router-component {
    width:1000px; 
    height: 100%;
    margin:0;
    float: left;
  }
  .side-component { 
    
    width: 300px;
    margin:0;
    float: left;
  }
</style>


<script>
import Sidemenu from '../components/sidemenu.vue'


export default {
  name: 'main',
  components: {
    Sidemenu
  }
}
</script>

