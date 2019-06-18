<template>

  <div v-if='listHeaders !== null'>
    {{listHeaders}}
    
     <md-table :value="listValues" md-sort="id" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">{{$route.params.type}}</h1>
      </md-table-toolbar>

      <md-table-row 
      v-for="item in listValues" 
      @click="$router.replace({ 
        name: 'detail', 
        params: {
          type: $route.params.type, 
          pk: item.id
        }
      })">
        <md-table-cell v-for="(value,key) in item" :md-label="key" :md-sort-by="key">{{ value }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
  
</template>

<script>
  import {listUrl} from "../helpers/util"

  export default {
    name: 'TableSearch',
    created() {
      console.log("CREATED")
    },

    beforeCreate() {
      console.log("CONE")
    },
    mounted () {
      console.log("MOUTNED")
      this.$store.dispatch('loadData',{url: listUrl(this.$route.params.type), type: "list"})
    },
    data : function () {
      return {

        headers: ["i"],
        data: {"id" : 1}
      }
    },
    computed : {
      model () {
        return this.$store.getters.getModel
      },
      listHeaders () {
        return this.$store.getters.getListHeaders
      },
      listValues () {
        return this.$store.getters.getListValues
      },
    },
  }
</script>

<style lang="scss" scoped>
  .md-table {
    overflow:auto;
    height: 100%;
    max-width: 1000px;
  }

  @media (max-width: 978px) {
    .md-table{
        max-width: 650px;
    }
  } 

  .md-field {
    max-width: 300px;
  }
</style>


