<template>
  <div>
    <v-row> 
        <v-col>
        <v-card
            class="pa-2"
            outlined
            tile

        >
            <template v-if="resultsTotal === 0">
                No results for {{title}}
            </template>
            <template v-else>
                <template v-for="(value, key) in results">
                    <v-card :key="key" flat>
                        <v-card-text v-if="value.length !==0 " class="pa-0">
                            <h2 :class="` font-weight-light pink--text`">{{key}} ({{results[key].length}})</h2>
                            <v-card flat v-for="(result) in value" :key="result" href="www.google.com">
                                <v-card-text class="pa-0"> 
                                    {{result}}
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </template>
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
    props: ['title', 'appResults'],
    data () {
      return {
        resultInfo: {}
      }
    },
    created() {
        this.formatTitle()
        this.results = this.appResults.results
        this.resultsTotal = this.appResults.total
        this.models = Object.keys(this.results)

        var test = this.models.map(model => {
            this.resultInfo[model] = [];
        })
        console.log(this.resultInfo)
        this.getResultInfo()
        console.log(this.resultInfo)
    
    },
    methods: {
        formatTitle: function() {
            this.category = this.title.toUpperCase() //format this better core => Core dlp => DLP tenx => Tenx
            return this.category
        },

        getResultInfo: function() {
            console.log(Object.keys(this.resultInfo))
            console.log(`RESULTS INFO IN FUNCTION!!! ${this.resultInfo}`)
            this.models.forEach((key) => {
                this.results[key].forEach((id) => {
                    console.log(`key ${key}`)
                    console.log(Object.keys(this.resultInfo))
                    this.resultInfo[key].push({
                        id: id,
                        label: "test",
                        link: "testing"

                    })
                })
            })
            // console.log(this.models)
            // for (var i = 0; i < this.models.length; i++) {
            //     // var modelResults = this.results[this.models[i]]
            //     // this.resultInfo[this.models[i]] = {}
            //     // this.resultInfo[this.models[i]]["subtotal"] = modelResults.length
            //     this.resultInfo[this.models[i]] = []

            // }
        }
    },
}
</script>