<template>
  <div>
    <v-timeline dense> 
    <v-timeline-item small fill-dot  :color="colour" v-for="v in schoolings">
      <div v-if="v.many">
        <SmallList 
        :list="v.value"
        :url="v.api" 
        :title="v.title"
        />
      </div>
      <div v-else-if="v.pivot">
        <h2 :class="`headline font-weight-light mb-4`" :style="{'color':colour}">{{v.title}}</h2>
        <PivotTable :structure="v.value" />
      </div>
      <div v-else>
        <h2 :class="`headline font-weight-light mb-4`" :style="{'color':colour}">{{v.title}}</h2>
        <ul style="list-style-type: none; padding-left: 0px;">
            <li v-for="(value, key) in v.value" class="body-1" style="clear:both;">
              <v-divider></v-divider>
              <div style="float: left; width: 30%;"><b>{{titleEdit(key)}}: </b></div>
              <div style="float: left; width: 50%;">{{printNone(value)}}</div><br>
            </li>
            <v-divider></v-divider>
        </ul>
        <br>
      </div>
    <br>
    </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
  import SmallList from "./smallListComponent"
  import PivotTable from "./pivotTableComponent"
  import {titleEdit, printNone} from "../helpers/util"
  export default {
    name: "ListComponent",
    components: {
      SmallList,
      PivotTable
    },
    props: ['schoolings'],
    computed: { colour() {  return this.$store.getters.colourGetter } },
    methods: {
      titleEdit: titleEdit,
      printNone: printNone,
    },
  }
</script>
