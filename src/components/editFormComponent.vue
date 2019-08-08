<template>
  <div>
     <v-tabs vertical>
      <v-tab>
        Properties
      </v-tab>
      <v-tab :disabled="typeof this.children === 'undefined'">
        Children
      </v-tab>
      <v-tab :disabled="typeof this.relations === 'undefined'">
        Relations
      </v-tab>
      <v-tab>
      SUBMIT
      </v-tab>

      <v-tab-item >
        <v-card flat height="calc(90vh - 70px)" style="overflow-y: scroll">
          <v-card-text>
            <SmallEditComponent :title="title" :fields="structure.fields"  /><br>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat height="calc(90vh - 70px)" style="overflow-y: scroll">
          <v-card-text>
           <SmallEditComponent v-for="c in structure.children" :title="c.title" :fields="c.fields" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat height="calc(90vh - 70px)" style="overflow-y: scroll">
          <v-card-text>
            <SmallRelationEditComponent v-for="r in structure.relations" v-bind:relation="r"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <UpdateComponent :title="title" :fields="fields" :children="children" :relations="relations" :structure="structure" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import SmallEditComponent from "../components/smallEditFormComponent"
  import SmallRelationEditComponent from "../components/smallRelationEditFormComponent"
  import UpdateComponent from "../components/updateEditComponent"
  import Vue from 'vue'
  export default {
    props: ['title', 'fields', 'children', 'relations'],
    name: "EditComponent",
    components: {
      SmallEditComponent,
      SmallRelationEditComponent,
      UpdateComponent
    },
    data() {
      return {
        structure: {
          fields: JSON.parse(JSON.stringify(this.fields)),
          children: (typeof this.children === 'undefined') ? null : JSON.parse(JSON.stringify(this.children)),
          relations: (typeof this.relations === 'undefined') ? null : JSON.parse(JSON.stringify(this.relations))
        },
        submit: false
      }
    },
    methods: {
      getTitle (app, model) {
        console.log(app, model)
        return this.$store.getters.getModelTitle(app, model)
      },
    },

  }
</script>
