<template>

<v-data-table
    dense
    v-model="selected"
    :loading="loading"
    :headers="headers"
    :items="items"
    :search="search" 
    :single-select="!relation.many"
    show-select
  >
  <template v-slot:top>
    <v-toolbar flat>
      <h2 :class="`headline font-weight-light mb-4 pink--text`">{{getTitle(relation.model[0],relation.model[1])}}</h2>
      <v-spacer></v-spacer>
      <v-flex xs6 md2>
      <v-text-field v-model="search" label="search" ></v-text-field>
      </v-flex>
    </v-toolbar>
  </template>
</v-data-table> 
  
</template>


<script>
import {getTitle} from "../helpers/util"
import Vue from 'vue'
export default {
    name: "SmallRelationList",
    props: ['relation'],
    created() {
      this.$store.dispatch('refresh',{token : localStorage.getItem('user-token')})
      .then(
        this.$store.dispatch('loadData',{
          app: this.relation.model[0],
          model: this.relation.model[1],
          type: "list",
          token : localStorage.getItem('user-token')
        }).
        then(
          response => {
            this.items = response
            this.selected = this.items.filter(item => this.relation.selected.includes(item.id))
            this.computeHeaders()
          },
          error => {
            this.loading= false
          }
        )
      ).catch( e => { this.$router.push('/login') } )
    },
    watch: {
      selected: function(newSelected) { Vue.set(this.relation, 'selected',newSelected.map(s => s.id)) }
    },
    data () {
      return {
        loading: true,
        headers: [],
        items: [],
        selected:  [],
        search: '',
      }
    },
    methods: {
      getTitle: getTitle,
      computeHeaders () {
        getTitle: getTitle,
        Object.keys(this.items[0]).forEach( key => {
          this.headers.push({ align: 'left',text: key.charAt(0).toUpperCase() + key.slice(1), value: key })
        })
        this.loading= false
      },
    },
}
</script>