<template>
<div >
  <div class="centre-focus">
    <div>

    <md-content class="sidemenu-top">
      <SidemenuTop />
    </md-content>

    <md-content class="sidemenu-bottom">
      <Sidemenu />
    </md-content>
    </div>
    <div >
    <md-content class="topmenu">
    
    </md-content>     
    <md-content class="maincontent">
      <router-view class="router-component" :key="$route.fullPath"/>
    </md-content>
    </div>
  </div>
</div>
</template>

<script>
import Sidemenu from '../components/sidemenu.vue'
import SidemenuTop from '../components/sidemenuTop.vue'
export default {

  name: 'main',
  components : {
    Sidemenu,
    SidemenuTop
  },
  data() {
    return {
      account : {
        username: "",
        password: "",
      }
    }
  },
}
</script>

<style lang="scss">
.main {
  
}

.topmenu {
  height: 50px;
  width:800px;  
  max-width: calc(100vw - 125px);
}

.sidemenu-bottom {
  width: 260px;
  height: 68vh;
  max-width: calc(100vw - 125px);
  overflow-y : scroll;
}

.sidemenu-top {
  width: 260px;
  height: 22vh;
  max-width: calc(100vw - 125px);
    .title {
    text-align: center;
    margin-bottom: 5px;
    img {
      margin-bottom: 2px;
      max-width: 60px;
      }
    .md-title {
      font-size : 1.3em;
      }
    .md-body {
      font-size : 1em;
      } 
    }

}

.maincontent {
  height: calc(90vh - 49px);
  width:800px;  
  max-width: calc(100vw - 125px);
}

.centre-focus {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}


.md-content {
  border: 1px solid rgba(#000, .12);
  z-index: 1;
  padding: 15px;
  margin: 0.2vh;
  position: relative;
  
}


</style>