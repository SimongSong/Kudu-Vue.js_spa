<template>
<div class="full-control">
    <div class="list">
      <md-list  >
      <md-list-item to="/">
        <md-icon>videogame_asset</md-icon>
        <span >Home</span>
      </md-list-item>
      </md-list >
      <md-list  >
        <md-list-item md-expand v-for="(value,key) in getStructure">
          <md-icon>whatshot</md-icon>
          <span class="md-list-item-text">{{key}}</span>
          <md-list slot="md-expand">
            <md-list-item v-for="(s,k) in value" :to="s.url" class="md-inset">
                {{s.title}}
            </md-list-item>
          </md-list>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>


<script>
export default {
  name: 'sidemenu',
  components: {
  },
  computed: {
    getRouterPath(model) {
      return "/list/" + model
    },
    getStructure() {
      console.log(this.$store.state.structure)
      return this.$store.state.structure
    }
  },
}
</script>




