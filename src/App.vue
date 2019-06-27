<template>
  <Temp />
</template>




<script>
// <Login v-if="!auth" :toggleLogin="login" />
//   <Main v-else />
import Main from './views/Main'
import Login from './views/Login'
import Temp from './views/Temp'
export default {
  name: 'app',
  components: {
    Main,
    Login,
    Temp
  },
  methods: {
    login () {
      this.auth = true
    }
  },
  data() {
    return {
      auth: false
    }
  },
}
</script>

