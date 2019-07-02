<template>
  <div>
  <Login v-if="login" :toggleLogin="login" />
  <Temp v-else/>
  <div class="loading-overlay" v-if="loading" >
    <md-progress-spinner md-mode="indeterminate">
    </md-progress-spinner>
  </div>
  </div>
</template>
 
<script>
import Login from './views/Login'
import Temp from './views/Temp'
export default {
  name: 'app',
  mounted() {
    this.checkToken()
  },
  components: {
    Login,
    Temp
  },
  methods: {
    login () {
      this.auth = true
    },
    checkToken() {
      this.$session.start();
      if (this.$session.has("token"))
        this.auth=true
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    login () {
      return (!this.auth || this.$store.state.account.expired) 
    }
  },  
  data() {
    return {
      auth: false
    }
  },
}
</script>

<style lang="scss">
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>