<template>
  <div>
    <v-card-text>
      <SmallEditComponent :title="title" :fields="structure.fields"  /><br>
      <SmallEditComponent v-for="c in structure.children" :title="c.title" :fields="c.fields" />
    </v-card-text>
  </div>
</template>

<script>
  import SmallEditComponent from "../components/smallEditFormComponent"
  import SmallRelationEditComponent from "../components/smallRelationEditFormComponent"
  import Vue from 'vue'
  export default {
    props: ['title', 'fields', 'children', 'relations'],
    name: "EditComponent",
    data() {
      return {
        structure: {
          fields: JSON.parse(JSON.stringify(this.fields)),
          children: JSON.parse(JSON.stringify(this.children)),
          relations: JSON.parse(JSON.stringify(this.relations))
        },
        submit: false
      }
    },
    created() {
      // Vue.set(this.structure, 'fields', this.fields)
      // Vue.set(this.structure, 'children', this.children)
      // Vue.set(this.structure, 'relations', this.relations)
      console.log("WHOA")
      // this.fields = {"FEFE" : "FEFE"}
      console.log(this.structure)
    },
    components: {
      SmallEditComponent,
      SmallRelationEditComponent
    },
    methods: {
      getTitle (app, model) {
        console.log(app, model)
        return this.$store.getters.getModelTitle(app, model)
      },
    },
    computed: {
      
    },
 
    // <SmallRelationEditComponent v-for="r in relations" :relation="r" />
  }
</script>
