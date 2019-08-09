<template>
    <v-data-table
      fixed-header
      :loading="loading"
      :headers="headers"
      :items="items"
      height="calc(100vh - 200px)"
      :search="search"
      :items-per-page="30"
      :footer-props="{
      itemsPerPageOptions: [15, 20, 30, 50, 100],
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
      }"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title> {{$route.params.app.toUpperCase()}} {{$route.params.type.toUpperCase()}} LIST</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>
        <v-button>Create New</v-button>
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
    name: "ListView",
    created() {
      this.$store.dispatch('loadData',{
        app: this.$route.params.app, 
        type: "list", 
        model: this.$route.params.type, 
        token : localStorage.getItem('user-token')
        }).
      then(
        response => {
          this.items = response
          this.computeHeaders()
          console.log(this.items)
        },
        error => {}
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
    },
  }
</script>