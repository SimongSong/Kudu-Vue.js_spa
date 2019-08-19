<template>    
    <div style="max-width: 40vw;">
        <h2 :class="`headline font-weight-light mb-4`" :style="{'color':colour}">{{title}}</h2>
        <div v-for="(f,k) in fields">
          <v-text-field v-if="f.type === 'String'"
            v-model="f.value"
            :label="k"
          ></v-text-field>
          <v-text-field v-else-if="f.type === 'Integer'"
            v-model="f.value"
            type="number"
            :label="k"
          ></v-text-field>   

          <v-select v-if="f.type === 'Select'"          
          v-model="f.value"
          :hint="k"
          :items="getChoicesList(f.choices)"
          label="Select"
          persistent-hint
          return-object
          single-line
          ></v-select>


          <v-menu v-if="f.type === 'Date'"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="f.value"
                :label="k"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="f.value" scrollable></v-date-picker>
          </v-menu>
          
          <v-checkbox
            v-else-if="f.type === 'Bool'"
            v-model="f.value"
            :label="`${k}: ${f.value.toString()}`"
          ></v-checkbox>
        </div>
      </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "SmallEditComponent",
    props: ['title', 'fields'],
    data() {
      return {
      }
    },
    methods: {
      getChoicesList(choices) {
        return Object.values(choices)
      }
    },
    computed: { colour() {  return this.$store.getters.colourGetter } },
  }
</script>
