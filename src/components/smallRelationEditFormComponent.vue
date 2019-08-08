<template>
  <v-data-table
      dense
      :loading="loading"
      :headers="headers"
      :items="items"
      :search="search" 
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
    <template v-slot:item="{ item }">
      <tr @click="$router.replace({ 
        name: 'detail', 
        params: {
          app: $route.params.app,
          type: $route.params.type, 
          pk: item.id
        }
      })">
        <td v-for="key in headers">
          {{item[key.value]}}
        </td>
      </tr>
    </template>
  </v-data-table> 
</template>


<script>
export default {
    name: "SmallList",
    props: ['relation'],
    created() {
      console.log("FEFE")
      console.log(this.model)
      this.$store.dispatch('loadData',{
        app: this.relation.model[0],
        model: this.relation.model[1],
        type: "list",
        token : localStorage.getItem('user-token')
      }).
      then(
        response => {
          this.items = response
          this.computeHeaders()
        },
        error => {
          this.loading= false
        }
      )
    },
    data () {
      return {
        loading: true,
        headers: [],
        items: [],

        search: '',
      }
    },
    methods: {
      computeHeaders () {
        Object.keys(this.items[0]).forEach( key => {
          this.headers.push({ align: 'left',text: key.charAt(0).toUpperCase() + key.slice(1), value: key })
        })
        this.loading= false
      },
      getTitle (app, model) {
        console.log(app, model)
        return this.$store.getters.getModelTitle(app, model)
      }
    },
}
</script>