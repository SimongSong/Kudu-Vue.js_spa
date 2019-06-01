<template>
  <div id="app">
    <Sidemenu />
    <div class="display-item">
      <router-view/>
    </div>
    <h1>fefe</h1>
    <Footer />
  </div>
</template>

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

