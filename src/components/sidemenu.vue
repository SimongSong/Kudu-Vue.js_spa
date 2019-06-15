
<template>
<div>
<md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link to="/">Home</router-link></span>
          </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link to="/detail">Detail</router-link></span>
          </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link to="/list">TENXList</router-link></span>
          </md-list-item>       
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link to="/list/dlplibrary">DLPList</router-link></span>
          </md-list-item>         
        </md-list>
        </div>
</template>

<script>
export default {
  name: 'sidemenu',
  components: {
  }
}
</script>


