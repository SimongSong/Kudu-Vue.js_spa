<template>
  <div>
  <v-card
    flat
  >
  {{this.results}}
    <v-card-title>
      <h2 :class="`display-1 font-weight-light mb-4 pink--text`">Search Results</h2>
    </v-card-title>
    <v-card-text>
      <p>Found {{searchResults.total}} results for query "{{query}}" </p> 
    {{searchResults}}
    <template v-for="(app) in results">   
        <!-- <v-card flat 
          class="mx-auto"
          outlined
          :key="category"
        >   
          <v-card-text :key="category">        
            <h2 :class="`display-0 font-weight-light mb-4 pink--text`">{{category}}</h2>
          </v-card-text>
        </v-card> -->
        <v-row> 
          <v-col>
            <v-card
              class="pa-2"
              outlined
              tile

            >
              <h2 :class="`display-0 font-weight-light mb-4 pink--text`">{{app}}</h2>
            </v-card>
            <v-spacer></v-spacer>
          </v-col>
      </v-row>
    </template>
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
      structure: {},
      results: {},
      apps: {},
      searchResults: {},
      models: {},
        // Core: {
        //   total: 0,
        // },
        // DLP: {
        //   total: 0,
        // },
        // TenX: {
        //   total: 0,
        // },
        // PBAL: {
        //   total: 0,
        // },
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
      .then(r => { 
        this.searchResults = r
        this.getResults()
      })
      .catch( e => {
        console.log("FIRING FAILED")
        console.log(e)})
<<<<<<< Updated upstream
    ).catch( e => { this.$router.push('/login') } )
=======
    ).catch( e => { this.$router.push('/kudu/login') } );

    console.log(this.searchResults)    
  },

  computed: {
>>>>>>> Stashed changes
  },

  methods: {
    getResults: function() {
      this.structure = this.$store.state.structure
      console.log(this.structure)
      this.apps = Object.keys(this.structure)

      for (var i = 0; i < this.apps.length; i++) {
        var app = this.apps[i]
        console.log(`APPPPPP ${app}`)
        this.results[app] = {}
        this.results[app]["total"] = 0
        this.models = Object.keys(this.structure[app]) // list of samples, project
        console.log(`MODELS FOR ${app} in structure: ${this.models}`)
        console.log(`keys of search result app ${app}: ${Object.keys(this.searchResults[app])}`)
        this.models.forEach(model => {
          if (!Object.keys(this.searchResults[app]).includes(model)){
            console.log(`${model} not in search results; skipping`)
            return
          }
          console.log(this.searchResults)
          console.log(this.searchResults[app])
          console.log(`adding model ${model} to results ${app}`)
          this.results[app][model] = this.searchResults[app][model]
          this.results[app]["total"] += this.searchResults[app][model].length //sum lengths of values
        })
      }

      console.log(`HELLLOOOOOO ${this.results}`)
    }
  }
};
</script>
