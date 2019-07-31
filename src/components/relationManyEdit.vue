<template>
  <div>
    <md-table v-model="items">
    <div>{{selected}}</div>
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-row class="rowitem" slot="md-table-row" slot-scope="{ item }" >
        <md-table-cell  md-label="ID" md-sort-by="name"><md-checkbox v-model="item.selected" @change="selectItem(item)"></md-checkbox>{{ item.name }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>
  import Vue from 'vue'
  
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'relationManyEdit',
    props: ['relationInfo', 'selected'],
    data: () => ({
      items: [],
      search: null,
      searched: [],
      boolean: false,
    }),
    methods: {
      searchOnTable () {
        this.searched = searchByName(this.items, this.search)
      },
      selectItem ( item ) {
        console.log(item.selected)
        if (item.selected) this.selected.push(item.id)
        else this.selected.splice(this.selected.indexOf(item.id), 1)
        console.log(this.selected)
      }
    },
    mounted () {
      console.log("BEGINNING")
      console.log(this.selected)
      this.$store.dispatch('loadRelationList',{
        token : localStorage.getItem('user-token'),
        name : this.relationInfo.name,
        model : this.relationInfo.model
      })
      .then(
        response => {
          this.items = response
          this.items.forEach((item) => {
            if(this.selected.includes(item.id)) Vue.set(item,  "selected", true)
            else Vue.set(item,  "selected", false)
          })                
          // this.searched = this.items
        },
        error => {
        }
      )
      console.log(this.items)
    },
  }
</script>

<style lang="scss" scoped>
  .md-table {
    margin-top: 16px;
    height : 400px;
    overflow-y : scroll;
  }
</style>