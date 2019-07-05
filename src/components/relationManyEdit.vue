<template>
  <div>
    <md-table-toolbar>
      <md-field md-clearable class="md-toolbar-section-end">
        <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
      </md-field>
    </md-table-toolbar>
    <md-table id="choiceTable" v-model="items">
      <md-table-row class="rowitem" slot="md-table-row" slot-scope="{ item }" >
        <md-table-cell  md-label="ID" md-sort-by="name"><md-checkbox v-model="item.selected" @click.stop @change.stop="selectItem(item)"></md-checkbox>{{ item.name }}{{ item.selected }}</md-table-cell>
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
      single : null,
      boolean: false,
    }),
    methods: {
      onSelect (items) {
        console.log("ONSELECT")
        this.selected = items
      },
      searchOnTable () {
        this.searched = searchByName(this.items, this.search)
      },
      selectItem ( item ) {
        console.log(item.id)
        console.log(this.items)
        console.log(this.selected)
        console.log(item.selected)
        // if (item.selected) {
        //   this.selected.push(item.id)
        //   if (!this.many) {
        //     //item filter and rmove
        //     this.single = this.item.id 
        //   }
        // }
        // else this.selected = this.selected.filter(i => i !== item.id )
        // console.log(this.selected)
      }
    },
    mounted () {
      console.log("BEGINNING")
      console.log(this.selected)
      this.$store.dispatch('loadRelationList',{
        token : this.$session.get('token'),
        name : this.relationInfo.name,
        model : this.relationInfo.model
      })
      .then(
        response => {
          this.items = response
          if (!this.many) {
            this.single = response
            this.selected = [this.selected]
            }
                
          this.items.forEach( item => {
            if(this.selected.includes(item.id)) {
              console.log(item.name)
              item.selected = true
              }
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