<template>
  <div>
  <v-card
    flat
  >
  {{this.results}}
    <v-card-title>
      <h2 :class="`display-1 font-weight-light pink--text`">Search Results</h2>
    </v-card-title>
    <v-card-text>
      <p>Found {{searchResults.total}} results for query "{{query}}" </p> 
     {{searchResults}}
    <template>
      <v-card flat color="basil">

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="app in apps"
            :key="app"
          >
            {{ app }} ({{results[app]["total"]}})
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="app in apps"
            :key="app"
          >
            <v-card flat color="basil">
              <SearchResult :title="app" :appResults="results[app]"></SearchResult>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
    <!-- <template v-for="(value, key) in results">   
        <SearchResult :title="key" :results="value"></SearchResult>
    </template> -->
    </v-card-text>
    
  </v-card>
  </div>
</template>

<script>

import SearchResult from "../components/searchResultComponent"
export default {
  components: {
    SearchResult,
  },
  data() {
    return {
      tab: null,
      query: this.$route.params.query,
      structure: {},
      results: {},
      apps: {},
      searchResults: {},
      models: {},
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
    ).catch( e => { this.$router.push('/login') } )
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
        this.results[app]["results"] = {}
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
          // TODO: add key results before model key
          this.results[app]["results"][model] = this.searchResults[app][model]
          this.results[app]["total"] += this.searchResults[app][model].length
        })
      }

      console.log(`HELLLOOOOOO ${this.results}`)
    }
  }
};
</script>
