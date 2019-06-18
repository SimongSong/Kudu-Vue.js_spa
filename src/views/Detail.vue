<template>
  <div v-if='cardValues !== null'>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{$route.params.type.toUpperCase()}}</div>
      </md-card-header>
      <md-card-actions>
        <md-button>Edit</md-button>
        <md-button>Delete</md-button>
      </md-card-actions>
    </md-card>  
    <md-card md-with-hover>
      <md-card-content>
        <div v-for="(value,key) in cardParentValues" class="detail_content">
          <p class="thick">{{key.charAt(0).toUpperCase() + key.slice(1)}}: </p> <p>{{value}}</p>
        </div>
      </md-card-content>
    </md-card>

    <md-card md-with-hover  v-for="card in cardValues">
      <md-card-header>
        <div class="md-title">{{card[0].toUpperCase()}}</div>
      </md-card-header>
      <md-card-content>
        <div v-for="(value,key) in card[1]" class="detail_content">
          <p class="thick">{{key.charAt(0).toUpperCase() + key.slice(1)}}: </p> <p>{{value}}</p>
        </div>
      </md-card-content>
    </md-card>
    <br/>
  </div>
</template>
<style lang="scss" scoped>
  .md-card {
    width: 100%;
    max-width: 1000px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .detail_content p {
    display: inline-block;
  }

  p.thick {
  font-weight: bold;
  }
</style>

<script>
import {detailUrl} from "../helpers/util"

export default {
  name: 'detail',
  mounted () {
      this.$store.dispatch('loadData',{url: detailUrl(this.$route.params.type, this.$route.params.pk), type: "detail"})
  },
  computed: {
    cardValues () {
      return this.$store.getters.cardValues
    },
    cardParentValues () {
      return this.$store.getters.cardParentValues
    }
  },
}
</script>