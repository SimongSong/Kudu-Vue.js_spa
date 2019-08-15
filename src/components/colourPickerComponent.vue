<template>
  <v-dialog
    persistent
    v-model="picker"
    width="345"
  >
  <v-card>
    <v-card-title>
      <span class="headline">Go crazy!{{colour}}</span>
    </v-card-title>
    <v-card-text>
    <v-color-picker v-model="colour" showSwatches flat>
    </v-color-picker>  
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="green darken-1" text @click="pickerClose">cancel</v-btn>
    <v-btn color="green darken-1" text @click="pickColour">Agree</v-btn>
    </v-card-actions>
 </v-card>
  
  </v-dialog>
</template>
<script>
  export default {
    name: 'colourPicker',
    props: ['picker', 'pickerClose'],
    beforeDestroy() {
      this.picker = false
    },
    data() {
      return {
        colour: '#FF0000'
      }
    },
    methods: {
      pickColour() {
        this.$store.commit('UPDATE_COLOUR',this.colour)
        console.log(this.$store.getters.colourGetter)
        this.pickerClose()
      }
    },
  }
</script>