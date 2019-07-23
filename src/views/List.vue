<template>
  <div v-if='listHeaders !== null'>
    <md-table md-width="100%" md-height="100%" :value="listValues" md-sort="id" md-sort-order="asc" md-fixed-header>
      
      <md-table-toolbar>
      <div class="md-toolbar-section-start">
      <h1 class="md-title">{{$route.params.type}}</h1>
      </div>

      <editForm :showForm="showForm" :toggleEditForm="toggleEditForm" :formData = "this.$store.state.model.form_fields"/>
      
      <md-field md-clearable class="md-toolbar-section-end">
      <md-input placeholder="Search by name..." v-model="search" v-on:keyup.enter="login" />
      </md-field>

      </md-table-toolbar>
        
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
        <md-button v-if="!isEditable" @click="toggleEditForm" class="md-icon-button">
        <md-icon>add</md-icon>
    </md-button>
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
      this.toggleLoading()
    },
    beforeCreate() {
      console.log("CONE")
    },
    mounted () {
      console.log("MOUTNED")
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
          this.$store.commit('KILLLOADING')
          console.log(this.$store.state.loading)
        }
      )
    },
    updated() {
      this.$nextTick(function () {
        console.log("NEXT TICK")
        if (this.headerLoaded){
          this.headerLoaded = false
          this.$store.commit('KILLLOADING')
        }
        else this.headerLoaded = true
        
      })
    },  
    data : function () {
      return {
        headerLoaded : false,
        search: null,
        showForm : false,
        headers: ["i"],
        searched : []
      }
    },
    methods: {
      toggleEditForm: function () {
        this.showForm = !this.showForm
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
      listHeaders () {
        return this.$store.getters.getListHeaders
      },
      listValues () {
        let data = this.$store.getters.getListValues
        if (this.search) 
          return listSearch(this.search, data)
        return data
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

  .md-field {
    overflow: hidden;
    word-wrap: break-word;
  }
  
</style>


