<template>

  <div>
    <v-timeline dense> 
    <v-timeline-item small fill-dot  :color="colour" v-for="v in relations">
      <SmallList 
      :list="v.selected"
      :url="getUrl(v)" 
      :title="getTitle(v.model[0],v.model[1])"
      />
    <v-divider></v-divider>
    <br>
    </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
  import SmallList  from "./smallListComponent"
  import {getTitle} from "../helpers/util"
  export default {
    name: "ListComponent",
    components: {
      SmallList,
    },
    created() {
    },
    props: ['relations'],
      methods: { 
      getTitle: getTitle,
      getUrl(model) { return this.$store.state.structure[model.model[0]][model.model[1]].list_api },
    },
    computed: { 
      colour() {  return this.$store.getters.colourGetter } 
      },
  }
</script>
