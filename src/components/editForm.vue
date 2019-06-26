<template>
<md-dialog :md-active.sync="showForm">
<form @submit.prevent="getFormValues">
  <md-card >
        
  <md-card-header>
    <div class="md-title">create {{$route.params.type}}</div>
  </md-card-header>
 
  <md-card-content>
  <div v-for="(value,key) in getForm">
    <md-field v-if="key !== 'children' && value.type !== 'Date'">
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
    
    <div v-else v-for="child,k in value">
      <p>{{k}}</p>
        <md-field v-if="value.type !== 'Date'" v-for="value,key in child">
          <label>{{key}}</label>
          <md-input v-if="value.type === 'String'" v-model="value.value"></md-input>
          <md-input v-else-if="value.type === 'Integer'" v-model="value.value"></md-input>
          <md-datepicker v-else-if="value.type === 'Date'" v-model="value.value"></md-datepicker>
          <md-select v-else-if="value.type === 'Select'" v-model="value.value">
            <md-option v-for="choice in value.choices" :value='choice[0]'>{{choice[1]}}</md-option>
          </md-select>
        </md-field>    
        <md-datepicker v-else>
          <label>{{key}}</label>
        </md-datepicker>
    </div>    
  
  </div>
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
  export default {
    name: 'editForm',
    props: ['showForm', 'toggleEditForm'],
    name: 'FormValidation',
    data: () => ({
      showForm: true,
    }),
    methods: {
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


