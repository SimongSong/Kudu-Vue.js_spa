<template>
  <div id="app">
    <b-container>
      <router-view/>
    </b-container>
    <h1>fefe</h1>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    Footer,
  }
}
</script>

