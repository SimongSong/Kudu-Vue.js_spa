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
    <md-input />
  
    <md-button @click="$store.commit('LOGOUT')">{{$store.state.account}}</md-button>
    <md-button >API</md-button>
    <md-button >Admin</md-button>
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

  name: 'temp',
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


.topmenu {
  height: 50px;
  max-width: calc(100vw - 125px);
  display: flex;
  align-items: center;
}

.sidemenu-bottom {
  width: 260px;
  height: 68vh;
  max-width: calc(100vw - 100px);
  overflow-y : scroll;
}

@media only screen and (max-width: 1026px) {
    .sidemenu-bottom {
      display: none;
    }
    .sidemenu-top {
      display: none;
    }
}

@media only screen and (max-height: 540px) {
    .sidemenu-top {
      display: none;
    }
    .sidemenu-bottom {
      height: 90vh;
    }
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
      font-size : 1.3sem;
      }
    .md-body {
      font-size : 1em;
      } 
    }

}

.maincontent {
  height: calc(90vh - 49px);
  min-width: calc(90vw - 225px);
}

.router-component {
  height: 100%;
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