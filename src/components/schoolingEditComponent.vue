<template>
  <v-dialog
    v-model="openCreate"
  > 
  
    <v-card  flat height="calc(90vh - 70px)" style="overflow-y: scroll">
      <v-card-text>
      
      <div v-for="s in schoolings">
        <div v-if="'fields' in s">
          <SmallEditComponent :title="s.title" :fields="s.fields" />
        </div>
      </div>
      <v-btn 
      outlined 
      :color="colour"
      @click="test"
      >Submit</v-btn>
      </v-card-text>
    </v-card>
  
    <v-btn @click="closeCreate"> CLOSE THIS MONSTROSITY </v-btn>

  </v-dialog>
</template>

<script>
  import SmallEditComponent from "../components/smallEditFormComponent"
  export default {
    name: "EditSchooling",
    components: {
      SmallEditComponent
    },
    props: ['openCreate', 'closeCreate', 'schoolings'],
    computed: { colour() {  return this.$store.getters.colourGetter } },
  }
</script>
