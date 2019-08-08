<template>
<v-card flat>
  <v-card-title><h2 :class="`display-2 font-weight-light mb-4 pink--text`">Summary</h2></v-card-title>
<v-card-text>
<div v-if="isDifferent"> 
  <div v-if="fields">  
    <v-divider></v-divider>
    <div v-for="f in fieldDifferences" class="headline font-weight-light"> 
    Value of <span class="pink--text">{{titleEdit(f[0])}}</span> has been updated from <span class="pink--text">{{f[1]}}</span> to <span class="pink--text">{{f[2]}}</span>
    </div>
  </div>

  <div v-if="children">
    <v-divider></v-divider>
    <div v-for="c in childrenDifferences"> 
      <div class="headline font-weight-light" v-if="c.length !== 0">
        <div v-if="c[1].length !== 0"> 
        For <span class="pink--text">{{c[0]}}</span>:<br>
        <div v-for="d in c[1]">
        &emsp;Field <span class="pink--text">{{titleEdit(d[0])}}</span> has been updated from  <span class="pink--text">{{printNone(d[1])}}</span> to <span class="pink--text">{{printNone(d[2])}}</span>.
        </div>
        <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>

  <div v-if="relations">
    <div v-for="r in relationsDifferences"> 
      <div class="headline font-weight-light" v-if="r[1].length !== 0">
        Relationship with <span class="pink--text">{{r[0]}}</span> has been updated from <span class="pink--text">{{r[1].join(",")}}</span> to <span class="pink--text">{{r[2].join(",")}}</span>.
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
    fieldDifferences() { 
      if(!this.fields) return None
      return this.computeDifferences(this.fields, this.structure.fields) 
      },
    childrenDifferences() { 
      if(!this.children) return None
      var diffObject = []
      Object.keys(this.children).forEach( key => {
        diffObject.push([this.children[key].title, this.computeDifferences(this.children[key].fields, this.structure.children[key].fields)]) 
      })
      return diffObject
    },
    relationsDifferences() { 
      if(!this.relations) return None
      var diffObject = []
      Object.keys(this.relations).forEach( key => {
        if(this.structure.relations[key].selected.length == 0 && this.relations[key].selected.length == 0) return
        var title = this.getTitle(this.relations[key].model[0],this.relations[key].model[1])
        if(this.structure.relations[key].selected.length !== this.relations[key].selected.length) {
          diffObject.push([title, this.relations[key].selected, this.structure.relations[key].selected])
          return
        }
        for(var i = 0; i < this.relations[key].selected.length; i++) {
          if(this.relations[key].selected[i] !== this.structure.relations[key].selected[i]) {
            diffObject.push([title, this.relations[key].selected, this.structure.relations[key].selected])
            return
          }
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
    getTitle (app, model) { return this.$store.getters.getModelTitle(app, model)},
    printNone(val){
      if(val) return val
      else return "None"
    },
    titleEdit(title){
      var res = title.split("_")
      res.forEach((r,i) => {res[i] = r.charAt(0).toUpperCase() + r.slice(1);})
      return res.join(" ")
    },
    computeDifferences(oldObject, newObject) {
      var differenceList = Object.keys(oldObject).reduce( (acc, curr)  => {
        if( oldObject[curr].value !== newObject[curr].value){ acc.push([curr, oldObject[curr].value, newObject[curr].value]) }
        return acc
      }, [])
      return differenceList
    }
  },  

}
</script>

