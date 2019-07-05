<template>
<md-dialog :md-active.sync="showForm">
<form @submit.prevent="getFormValues">
  <md-card >
  <md-card-header>
    <div class="md-title">create {{$route.params.type}}</div>
  </md-card-header>
  
  <md-card-content>

  <md-subheader>Relations</md-subheader>
  <md-list>
    <md-list-item md-expand v-for="(value,key) in formData.relations">
      <span class="md-list-item-text" >{{key}}{{value.many}}</span>
      <md-list slot="md-expand">
        <relationManyEdit :relationInfo="value" :selected="value.selected" :many="value.many"/>    
      </md-list>
    </md-list-item>      
  
    <md-divider></md-divider>

    <md-subheader>Properties </md-subheader>
    <md-list-item md-expand >
      <span class="md-list-item-text">{{$route.params.type}} </span>
      <md-list slot="md-expand">
        <md-list-item  v-for="(value,key) in formData.fields">
          <md-field v-if="value.type !== 'Date'">
            <label>{{key}}</label>
            <md-input v-if="value.type === 'String'" v-model="value.value"></md-input>
            <md-input v-else-if="value.type === 'Integer'" v-model="value.value"></md-input>
            <md-datepicker v-else-if="value.type === 'Date'" v-model="value.value">
            <label>Select date</label>
            </md-datepicker>
            <md-select v-else-if="value.type === 'Select'" v-model="value.value">
              <md-option v-for="choice in value.choices" :value='choice[0]'>{{choice[1]}}</md-option>
            </md-select>
          </md-field>    
          <md-datepicker v-else-if="key !== 'children' && value.type === 'Date'" v-model="value.value">
          <label>{{key}}</label>
          </md-datepicker>
        </md-list-item >
      </md-list>
    </md-list-item> 
    
    <md-list-item md-expand v-for="(value,key) in formData.children">
      <span class="md-list-item-text">{{key}} </span>
      <md-list slot="md-expand">
        <md-list-item  v-for="(v,k) in value">
          <md-field v-if="v.type !== 'Date'">
          <label>{{k}}</label>
          <md-input v-if="v.type === 'String'" v-model="v.value"></md-input>
          <md-input v-else-if="v.type === 'Integer'" v-model="v.value"></md-input>
          <md-datepicker v-else-if="v.type === 'Date'" v-model="v.value">
          <label>Select date</label>
          </md-datepicker>
          <md-select v-else-if="v.type === 'Select'" v-model="v.value">
            <md-option v-for="choice in v.choices" :value='choice[0]'>{{choice[1]}}</md-option>
          </md-select>
          </md-field>    
          <md-datepicker v-else-if="v.type === 'Date'" v-model="v.value">
          <label>{{k}}</label>
          </md-datepicker>        
        </md-list-item >      
      </md-list>
    </md-list-item>

  </md-list>

  </md-card-content>

  <md-card-actions>
    <md-button type="submit">Create</md-button>
    <md-button @click="toggleEditForm">Cancer</md-button>
  </md-card-actions>

  </md-card>
  </form>
</md-dialog>
</template>

<script>
  import relationManyEdit from "./relationManyEdit"
  export default {
    name: 'editForm',
    props: ['showForm', 'toggleEditForm', 'formData'],
    name: 'FormValidation',
    created() {
      console.log(this.formData)
    },
    components : {
      relationManyEdit
    },
    methods: {
      // THIS IS TEMP
      getFormValues (submitEvent) {
        console.log("GETFORMVALUE")
        console.log(this.$store.getters.formFields)
      }
    },
    computed: {
      getForm () {
        return this.$store.getters.formFields 
      }
    },
  }
</script>

<style lang="scss" scoped>
  .md-card {
    width : 500px;
  }
  .md-card-content {
    height : 500px;
    overflow-y : scroll;
  }

</style>


