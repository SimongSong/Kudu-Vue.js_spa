<template>

  <div>
    <v-timeline dense> 
    <v-timeline-item small fill-dot  :color="colour" v-for="v in relations">
      <SmallList :model="v" />
    <v-divider></v-divider>
    <br>
    </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
  import SmallList from "./smallListComponent"
  export default {
    name: "ListComponent",
    components: {
      SmallList
    },
    props: ['relations'],
    computed: { colour() {  return this.$store.getters.colourGetter } },
  }
</script>
