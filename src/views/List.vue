<template>
  <div v-if='listHeaders !== null'>
    <div>
    <p class="table-title" style="display: inline-block;">{{$route.params.type}}</p>
    <md-button class="md-icon-button" style="display: inline-block; float : right; margin-top : 20px" @click="toggleEditForm">
        <md-icon>add</md-icon>
    </md-button>
    </div>
    <editForm :showForm="showForm" :toggleEditForm="toggleEditForm" />
    <md-divider></md-divider>
    
    <md-table :value="listValues" md-sort="id" md-sort-order="asc" md-fixed-header>
      <md-table-row 
      v-for="item in listValues" 
      @click="$router.replace({ 
        name: 'detail', 
        params: {
          app: $route.params.app,
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
  import editForm from "../components/editForm"
  export default {
    name: 'TableSearch',
    components: {
      editForm,
    },
    created() {
      console.log("CREATED")
    },
    beforeCreate() {
      console.log("CONE")
    },
    mounted () {
      console.log("MOUTNED")
      this.$store.dispatch('loadData',{app: this.$route.params.app, type: "list", model: this.$route.params.type })
    },
    data : function () {
      return {
        showForm : false,
        headers: ["i"],
        data: {"id" : 1}
      }
    },
    methods: {
      toggleEditForm: function () {
        this.showForm = !this.showForm
      }
    },
    computed : {
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
        height: 100%;
    }
  } 

  .table-title {
    font-size: 22px;
  }

  .md-field {
    max-width: 300px;
  }
</style>


