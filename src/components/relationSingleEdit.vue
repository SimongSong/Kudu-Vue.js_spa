<template>
  <div>
    <md-radio v-model="selected" v-for="item in items" :value="item.id">{{item.name}}</md-radio>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'relationSingleEdit',
    props: ['relationInfo', 'selected'],
    data: () => ({
      items: [],
      selected: false,
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

</style>