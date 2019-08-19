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
        <h2 :class="`headline font-weight-light mb-4`" :style="{'color':colour}">{{title}} LIST</h2>
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
    props: ['model', 'title', 'url', 'list'],
    created() {
      console.log(this.url)
      console.log(this.list)
      this.$store.dispatch('loadRelationList',{
        url : this.url,
        list: this.list,
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
        console.log(this.items)
        Object.keys(this.items[0]).forEach( key => {
          this.headers.push({ align: 'left',text: key.charAt(0).toUpperCase() + key.slice(1), value: key })
        })
        this.loading= false
      },
      
    },
    computed: { colour() {  return this.$store.getters.colourGetter } },
}

</script>