<template>
  <div>
    <md-table v-model="searched" @md-selected="onSelect" >
      <md-table-toolbar>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="ID" md-sort-by="name">{{ item.name }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    console.log(items)
    console.log(term)
    
    if (term) {
      console.log(items.filter(item => toLower(item.name).includes(toLower(term))))
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }

  export default {
    name: 'relationManyEdit',
    props: ['relationInfo', 'selected'],
    data: () => ({
      search: null,
      searched: [],
      items: []
    }),
    methods: {
      onSelect (items) {
        this.selected = items
      },
      getAlternateLabel (count) {
        let plural = ''

        if (count > 1) {
          plural = 's'
        }

        return `${count} user${plural} selected`
      },
      searchOnTable () {
        console.log("SERACH")
        this.searched = searchByName(this.items, this.search)
      },
    },
    created () {
      console.log("BEGINNING")
      console.log(this.$session.get('token'))
      this.$store.dispatch('loadRelationList',{
        token : this.$session.get('token'),
        name : this.relationInfo.name,
        model : this.relationInfo.model
      })
      .then(
        response => {
          console.log("returned")
          console.log(response)
          this.items = response
          this.searched = this.items
          this.selected = []
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