<template>
  <div v-if='headerLoaded'>
    <md-table md-height="100%" :value="listValues" md-sort="id" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
      <div class="md-toolbar-section-start">
        <h1 class="md-title">{{$route.params.type}}</h1>
      </div>
      
      <md-field md-clearable class="md-toolbar-section-end">
      <md-input placeholder="Search by name..." v-model="search"/>
      </md-field>
      </md-table-toolbar>
        
      <md-table-row 
      slot="md-table-row" 
      slot-scope="{ item }"
      @click="$router.replace({ 
        name: 'detail', 
        params: {
          app: $route.params.app,
          type: $route.params.type, 
          pk: item.id
        }
      })">
        <md-table-cell v-for="header in headers" :md-label="header" :md-sort-by="header" md-numeric>{{ item[header] }}</md-table-cell>
      </md-table-row>      
    </md-table>
        <md-button v-if="!isEditable" @click="toggleEditForm" class="md-icon-button">
        <md-icon>add</md-icon>
    </md-button>
    <editForm :showForm="showForm" :toggleEditForm="toggleEditForm" :formData = "this.$store.state.model.form_fields" />
  </div>
</template>

<script>
  import editForm from "../components/editForm"
  import customFilter from "../components/customFilter"
  import {listSearch} from "../helpers/util"
  export default {
    name: 'TableSearch',
    components: {
      editForm,
      customFilter
    },
    created() {
      console.log("CREATED")
      console.log(this.$store.state.form)
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
          this.dataset = response
          if(typeof response[0] !== 'undefined') this.headers =  Object.keys(response[0]) 
          this.headerLoaded = true
          console.log("HELLO")
        },
        error => {
          console.log("ERROR")
          // this.$store.commit('KILLLOADING')
          // console.log(this.$store.state.loading)
        }
      )
    },
    beforeCreate() {
      console.log("CONE")
    },
    mounted () {
      console.log("MOUTNED")
    },
    // updated() {
    //   this.$nextTick(function () {
    //     console.log("NEXT TICK")
    //     if (this.headerLoaded){
    //       this.headerLoaded = false
    //       this.$store.commit('KILLLOADING')
    //     }
    //     else this.headerLoaded = true
        
    //   })
    // },  
    data : function () {
      return {
        headerLoaded : false,
        dataset: [],
        headers: [],
        search: null,
        showForm : false,
        headers: ["i"],
        searched : []
      }
    },
    methods: {
      toggleEditForm: function () {
        console.log("fefe")
        console.log(this.showForm)
        this.showForm = !this.showForm
        console.log(this.showForm)
      },
      toggleLoading () {
      this.$store.commit('LOADING')
      },
      searchOnTable () {

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
      // listHeaders () {
      //   return this.$store.getters.getListHeaders
      // },
      listValues () {
        if (this.search) 
          return listSearch(this.search, this.dataset)
        return this.dataset
      },
      isEditable () {
      return this.$store.getters.isEditable
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-table {
    min-width: 50vh;
    height: calc(100% - 40px);
  }


  .table-title {
    font-size: 22px;
  }

  .md-table .md-table-cell.md-has-action .md-table-cell-container {
    justify-content: space-around;
  }
  .md-table .md-table-head {
    text-align: center;
  }
  .md-table .md-table-cell {
    text-align: center;
  }
  .md-table-head.md-numeric {
    text-align: center;
  }
</style>


