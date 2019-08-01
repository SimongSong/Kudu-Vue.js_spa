<template>
<div>
{{modelTitle}}<br><br>
{{modelFields}}<br><br>
{{modelRelations}}<br><br>
{{modelChildren}}<br><br>
</div>
</template>
<style lang="scss" scoped>
  .detail-wrap {
    height : 100%;
    overflow-y : scroll;    
  }

  .md-card {
    width: 99%;
    max-width: 1000px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .detail_content p {
    display: inline-block;
  }

  p.thick {
  font-weight: bold;
  }
</style>

<script>
import editForm from "../components/editForm"
export default {
  name: 'detail',
  components: {
    editForm,
  },
  data: () => ({
    detailData: {},
    deleteAlert: false,
    showForm: false,
  }),
  methods: {
    toggleEditForm: function () {
      this.showForm = !this.showForm
    }
  },
  created() {
    this.$store.state.model
  },
  mounted () {
      this.$store.dispatch('loadData',{
        app: this.$route.params.app, 
        type: "detail", 
        pk: this.$route.params.pk,  
        model: this.$route.params.type,
        token : localStorage.getItem('user-token')
        })
  },
  computed: {
    modelTitle () { return this.$store.state.model.title },
    modelFields(){ return this.$store.state.model.form_fields.fields },
    modelChildren(){ return this.$store.state.model.form_fields.children },
    modelRelations(){ return this.$store.state.model.form_fields.relations },
    isEditable () {
      return this.$store.state.model.noteditable
    }
  },
}

  // <div class="detail-wrap" v-if='cardValues !== null'>
  //     <md-dialog-alert
  //     :md-active.sync="deleteAlert"
  //     md-title="DELETELTELDELDLELTEL!"
  //     md-content="DELETE DELETE DELETE??????DELETE ." />
    
  //   <editForm :showForm="showForm" :toggleEditForm="toggleEditForm" :formData = "this.$store.state.model.form_fields"/>

  //   <md-card md-with-hover>
  //     <md-card-header>
  //       <div class="md-title">{{$route.params.type.toUpperCase()}}
  //       </div>
  //     </md-card-header>
  //     <md-card-actions v-if="!isEditable">
  //       <md-button @click="toggleEditForm">Edit</md-button>
  //       <md-button @click="deleteAlert = true">Delete</md-button>
  //     </md-card-actions>
  //   </md-card>  
  //   <md-card md-with-hover>
  //     <md-card-content>
  //       <div v-for="(value,key) in cardParentValues" class="detail_content">
  //         <p class="thick">{{key.charAt(0).toUpperCase() + key.slice(1)}}: </p> <p>{{value}}</p>
  //       </div>
  //     </md-card-content>
  //   </md-card>

  //   <md-card md-with-hover  v-for="card in cardValues">
  //     <md-card-header>
  //       <div class="md-title">{{card[0].toUpperCase()}}</div>
  //     </md-card-header>
  //     <md-card-content>
  //       <div v-for="(value,key) in card[1]" class="detail_content">
  //         <p class="thick">{{key.charAt(0).toUpperCase() + key.slice(1)}}: </p> <p>{{value}}</p>
  //       </div>
  //     </md-card-content>
  //   </md-card>
  //   <br/>
  // </div>
</script>