<template>
  <div>
    <v-row> 
        <v-col>
        <v-card
            class="pa-2"
            outlined
            tile

        >
            <h2 :class="`display-0 font-weight-light pink--text`">{{category}}</h2>
            {{results.total}} results
            <!-- {{results}} -->

            <template v-for="(value, key) in results.results">
                
                {{key}}:{{value}}
            </template>
        </v-card>
        <v-spacer></v-spacer>
        </v-col>
    </v-row>
  </div>
</template>


<script>
import {getTitle} from "../helpers/util"
import Vue from 'vue'
export default {
    name: "SearchResult",
    props: ['title', 'results'],
    data () {
      return {
        resultLinks: []
      }
    },
    created() {
        this.formatTitle()
    },
    methods: {
        formatTitle: function() {
            console.log("in format title")
            // this.category = this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase()
            this.category = this.title.toUpperCase() //format this better core => Core dlp => DLP tenx => Tenx
            return this.category
        }
    },
}
</script>