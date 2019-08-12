<template>
  <div>
  <v-card
    flat
  >
    <v-card-title>
      <h2 :class="`display-1 font-weight-light mb-4 pink--text`">Search Results</h2>
    </v-card-title>
    <v-card-text>
    {{searchResults}}
    </v-card-text>
    
  </v-card>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      query: this.$route.params.query,
      searchResults: {}
    }
  },
  created() {
    console.log(this.query)
    this.$store.dispatch('refresh',{token : localStorage.getItem('user-token')})
    .then(
      this.$store.dispatch('searchQuery',{
          query: this.query,
          token : localStorage.getItem('user-token')
      })
      .then(r => { this.searchResults = r})
      .catch( e => {
        console.log("FIRING FAILED")
        console.log(e)})
    ).catch( e => { this.$router.push('/login') } )
  },
};
</script>
