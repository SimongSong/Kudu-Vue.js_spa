<template>
  <v-app >
    <!-- Topnav Bar START -->
    <v-app-bar
        app
        clipped-left
        color="red"
        dense
      >
      <v-app-bar-nav-icon v-if="authorized" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Kudu - Colossus</span>
        {{authorized}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout
        align-center
        style="max-width: 650px"
      >
        <v-text-field
          v-show="authorized"
          :append-icon-cb="() => {}"
          placeholder="Search feature is not there yet..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-app-bar>
    <!-- Topnav Bar END -->

    <!-- Sidemenu START -->
    <v-navigation-drawer v-if="authorized"
      v-model="drawer"
      app
      clipped
    >
      <SideMenu />
    </v-navigation-drawer>
    <!-- Sidemenu END -->

    <!-- Maincontent START -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          child-flex
        >
          <v-flex >
            <router-view class="router-component" :key="$route.fullPath"/>
          </v-flex>
        </v-layout>
      </v-container>

    </v-content>
    <!-- Maincontent END -->

   

  </v-app>
</template>

<script>
  import SideMenu from "./views/SideMenu"
  export default {
    props: {
      source: String,
    },
    components: {
      SideMenu
    },
    data: () => ({
      drawer: null,
      authorized: false
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
    mounted: function() {
      this.authorized = !!localStorage.getItem('user-token')
      console.log(`authorized: ${this.authorized}`)
    },
  }
</script>