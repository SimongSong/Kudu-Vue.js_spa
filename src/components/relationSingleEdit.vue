<template>
  <div>
    <md-list class="single-list-row">
      <md-list-item v-for="item in items">
      <md-radio v-model="selected" :value="item.id" >{{item.name}}</md-radio>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    name: 'relationSingleEdit',
    props: ['relationInfo', 'selected'],
    created() {
      if(!this.selected) this.selected = false
    },
    data: () => ({
      items: [],
    }),
    mounted () {
      this.$store.dispatch('loadRelationList',{
        token : localStorage.getItem('user-token'),
        name : this.relationInfo.name,
        model : this.relationInfo.model
      })
      .then(
        response => { this.items = response },
        error => {
        }
      )
      console.log(this.items)
    },
  }
</script>

<style lang="scss" scoped>
.single-list-row {
  height: 200px;
  overflow-y: scroll;
}
</style>