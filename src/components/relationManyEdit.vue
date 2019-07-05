<template>
  <div>
    <md-table-toolbar>
      <md-field md-clearable class="md-toolbar-section-end">
        <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
      </md-field>
    </md-table-toolbar>
    <md-table id="choiceTable" v-model="searched">
      <md-table-row class="rowitem" slot="md-table-row" slot-scope="{ item }" >
        <md-table-cell  md-label="ID" md-sort-by="name"><md-checkbox v-model="item.selected" @change="selectItem(item)"></md-checkbox>{{ item.name }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>
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
    props: ['relationInfo', 'selected', 'many'],
    data: () => ({
      items: [],
      search: null,
      searched: [],
      boolean: false,
    }),
    mounted() {
      console.log("MOUNTED")
    },
    methods: {
      onSelect (items) {
        console.log("ONSELECT")
        this.selected = items
      },
      searchOnTable () {
        this.searched = searchByName(this.items, this.search)
      },
      selectItem ( item ) {
        console.log(this.selected)
        if (item.selected) this.selected.push(item.id)
        else this.selected = this.selected.filter(i => i !== item.id )
        console.log(this.selected)
      }

    },
    created () {
      console.log("BEGINNING")
      console.log(this.selected)
      this.$store.dispatch('loadRelationList',{
        token : this.$session.get('token'),
        name : this.relationInfo.name,
        model : this.relationInfo.model
      })
      .then(
        response => {
          console.log("returned")
          console.log(response)
          console.log(this.selected)
          console.log(this.many)
          this.items = response
          this.items.forEach( item => {
            if(this.selected.includes(item.id)) item.selected = true
          })
          this.searched = this.items
        },
        error => {
        }
      )
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