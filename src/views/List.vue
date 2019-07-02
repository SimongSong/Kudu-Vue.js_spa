<template>
  <div v-if='listHeaders !== null'>
    <div>
    <p class="table-title" style="display: inline-block;">{{$route.params.type}}</p>
    <md-button v-if="!isEditable" class="md-icon-button" style="display: inline-block; float : right; margin-top : 20px">
        <md-icon>add</md-icon>
    </md-button>
    </div>
    

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
      // this.toggleLoading()
      this.$store.dispatch('loadData',{
        app: this.$route.params.app, 
        type: "list", 
        model: this.$route.params.type, 
        token : this.$session.get('token')
        }).
      then(
        response => {
          console.log("DONE")
          console.log(this.$store.state.loading)
        },
        error => {
          console.log("ERROR")
          console.log(this.$store.state.loading)
        }
      )
    },
    // updated() {
    //   this.$nextTick(function () {
    //     console.log("NEXT TICK")
    //     this.$store.commit('KILLLOADING')
        
    //   })
    // },  
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
      },
      toggleLoading () {
      this.$store.commit('LOADING')
      }
    },
    // events : {
    //   stopLoading: function() {
    //     console.log("HEFKEJHFOEJOFHEOFIH")
    //     console.log("EVENT HANDLE")
    //     this.toggleLoading()
    //   }
    // },
    computed : {
      listHeaders () {
        return this.$store.getters.getListHeaders
      },
      listValues () {
        return this.$store.getters.getListValues
      },
      isEditable () {
      return this.$store.getters.isEditable
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-table {
    height: 100%;
    max-width: 100%;
    .md-table-row {
       width: 100%;
       overflow: auto;
    }
  }

  @media (max-width: 978px) {
    .md-table{

    }
  } 

  .table-title {
    font-size: 22px;
  }

  .md-field {
    max-width: 300px;
  }
</style>


