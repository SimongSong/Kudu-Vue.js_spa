<template>
<v-card
  height="calc(100vh - 70px)"
  style="border-radius:0px;"
>
    <v-tabs
      color="white"
      right

    >
      <v-tab>Information</v-tab>
      <v-tab>Edit</v-tab>
      <v-tab>Delete</v-tab>

      <v-tab-item>
        <v-container >
        <v-layout>
        <blockquote class="blockquote" style ="height: calc(100vh - 150px); width:100%; overflow-y: scroll;">
          <span class="display-2">{{modelTitle}} {{modelFields.id.value}}</span><br><br>
          <ul style="list-style-type: none; padding-left: 0px;">
            <li v-for="(v,k) in modelFields" class="body-1" style="clear:both;">
              <div style="float: left; width: 30%;"><b>{{titleEdit(k)}}: </b></div>
              <div style="float: left; width: 50%;">{{printNone(v.value)}}</div>
              <v-divider></v-divider>
            </li>
          </ul><br>
          <v-divider></v-divider>
          <br>
          <div style="margin-top:20px;" v-for="(v,k) in modelChildren">
            <span class="display-1">{{v.title}}</span><br>
            <ul style="list-style-type: none; padding-left: 0px;">
              <li v-for="(value,title) in v.fields" class="body-1" style="clear:both;">
                <div style="float: left; width: 30%;"><b>{{titleEdit(title)}}: </b></div>
                <div style="float: left; width: 50%;">{{printNone(value.value)}}</div>
                <v-divider></v-divider>
              </li>
            </ul><br>
            <v-divider></v-divider>
          </div>
          </blockquote>
          </v-layout>
          </v-container>
        </v-tab-item>

      <v-tab-item>
        <v-container
          fluid
          grid-list-sm
        >
          <v-layout wrap>
             <v-flex xs12 sm6>
          <v-text-field
                 value="TESTTEST11"
            label="Sample ID"    
            readonly
          ></v-text-field>
              <v-text-field
             value="PX104019142"
            label="Anonymous Patient ID"    
            readonly
          ></v-text-field>
        </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container
          fluid
          grid-list-sm
        >
          <v-layout wrap>
            FEFE
          </v-layout>
        </v-container>
      </v-tab-item>

    </v-tabs>
  </v-card>
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
export default {
  name: 'detail',
  components: {

  },
  data: () => ({
    detailData: {},
  }),
  methods: {
    titleEdit(title){
      var res = title.split("_")
      res.forEach((r,i) => {res[i] = r.charAt(0).toUpperCase() + r.slice(1);})
      return res.join(" ")
    },
    printNone(val){
      if(val) return val
      else return "None"
    }
  },
  created() {
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