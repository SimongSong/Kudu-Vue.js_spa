<template>
<v-card flat>
  <v-card-title><h2 :class="`display-2 font-weight-light mb-4`"  :style="{'color':colour}">Summary</h2></v-card-title>
<v-card-text>
<div v-if="isDifferent"> 
  <div v-if="fields">  
    <v-divider></v-divider>
    <div v-for="f in fieldDifferences" class="headline font-weight-light"> 
    Value of <span  :style="{'color':colour}">{{titleEdit(f[0])}}</span> has been updated from <span  :style="{'color':colour}">{{f[1]}}</span> to <span :style="{'color':colour}">{{f[2]}}</span>
    </div>
  </div>

  <div v-if="children">
    <v-divider></v-divider>
    <div v-for="c in childrenDifferences"> 
      <div class="headline font-weight-light" v-if="c.length !== 0">
        <div v-if="c[1].length !== 0"> 
        For <span :style="{'color':colour}">{{c[0]}}</span>:<br>
        <div v-for="d in c[1]">
        &emsp;Field <span  :style="{'color':colour}">{{titleEdit(d[0])}}</span> has been updated from  <span  :style="{'color':colour}">{{printNone(d[1])}}</span> to <span :style="{'color':colour}">{{printNone(d[2])}}</span>.
        </div>
        <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>

  <div v-if="relations">
    <div v-for="r in relationsDifferences"> 
      <div class="headline font-weight-light" >
        Relationship with <span :style="{'color':colour}">{{r[0]}}</span> has been updated from <span :style="{'color':colour}">[ {{r[1].join(",")}} ]</span> to <span  :style="{'color':colour}">[ {{r[2].join(",")}} ]</span>.
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</div>
<div v-else>
  You made no changes
</div>
</v-card-text>
</v-card>
</template>


<script>
// Relationship with {{r[0]}} has been updated from {{r[1]}} to {{r[2]}}.
import {getTitle, printNone, titleEdit} from "../helpers/util"
export default {
  name: "UpdateEdit",
  props: ['title', 'fields', 'children', 'relations', 'structure'],
  created() {
    
  },
  
  data () {
    return {
    }
  },
  computed: {
    colour() {  return this.$store.getters.colourGetter },
    fieldDifferences() { 
      if(!this.fields) return []
      return this.computeDifferences(this.fields, this.structure.fields) 
      },
    childrenDifferences() { 
      if(!this.children) return []
      var diffObject = []
      Object.keys(this.children).forEach( key => {
        diffObject.push([this.children[key].title, this.computeDifferences(this.children[key].fields, this.structure.children[key].fields)]) 
      })
      return diffObject
    },
    relationsDifferences() { 
      if(!this.relations) return []
      var diffObject = []
      Object.keys(this.relations).forEach( key => {
        if(this.structure.relations[key].selected.length == 0 && this.relations[key].selected.length == 0) return
        var title = this.getTitle(this.relations[key].model[0],this.relations[key].model[1])
        if(!this.arraysEqual(this.relations[key].selected,this.structure.relations[key].selected)) {
          diffObject.push([title, this.relations[key].selected, this.structure.relations[key].selected])
          return
        }
        
      })
      return diffObject
    },
    isDifferent() {
      if(this.relationsDifferences.length === 0 &&
        this.fieldDifferences.length === 0 &&
        !this.childrenDifferences.some(child => child[1].length !== 0)
        ) return false
      return true
    }
  },
  methods: {
    getTitle: getTitle,
    printNone: printNone, 
    titleEdit: titleEdit,
    computeDifferences(oldObject, newObject) {
      var differenceList = Object.keys(oldObject).reduce( (acc, curr)  => {
        if( oldObject[curr].value !== newObject[curr].value){ acc.push([curr, oldObject[curr].value, newObject[curr].value]) }
        return acc
      }, [])
      return differenceList
    },
    arraysEqual(_arr1, _arr2) {
      if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length) return false;
      var arr1 = _arr1.concat().sort();
      var arr2 = _arr2.concat().sort();
      for (var i = 0; i < arr1.length; i++) { if (arr1[i] !== arr2[i]) return false; }
      return true;
    }
  },  

}
</script>

