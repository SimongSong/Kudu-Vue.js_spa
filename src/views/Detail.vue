<template>
  <div v-if='cardValues !== null'>
      <md-dialog-alert
      :md-active.sync="deleteAlert"
      md-title="DELETELTELDELDLELTEL!"
      md-content="DELETE DELETE DELETE??????DELETE ." />
    
    <editForm :showForm="showForm" :toggleEditForm="toggleEditForm" />

    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">{{$route.params.type.toUpperCase()}}</div>
      </md-card-header>
      <md-card-actions>
        <md-button @click="toggleEditForm">Edit</md-button>
        <md-button @click="deleteAlert = true">Delete</md-button>
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
import editForm from "../components/editForm"
export default {
  name: 'detail',
  components: {
    editForm,
  },
  data: () => ({
    deleteAlert: false,
    showForm: false,
  }),
  methods: {
    toggleEditForm: function () {
      this.showForm = !this.showForm
    }
  },
  mounted () {
      this.$store.dispatch('loadData',{app: this.$route.params.app, type: "detail", pk: this.$route.params.pk,  model: this.$route.params.type })
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