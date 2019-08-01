<template>
  <v-app >
    <!-- Topnav Bar START -->
    <v-app-bar
        fixed
        app
        clipped-left
        
        dense
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Kudu - Colossus</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout
        align-center
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-layout>
    </v-app-bar>
    <!-- Topnav Bar END -->

    <!-- Sidemenu START -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <SideMenu />
    </v-navigation-drawer>
    <!-- Sidemenu END -->

    <!-- Maincontent START -->
    <v-content>
      <v-container fluid>
        <v-layout
          child-flex
          
          
        >
            <router-view class="router-component" :key="$route.fullPath"/>
        </v-layout>
      </v-container>
    </v-content>
    <!-- Maincontent END -->

    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
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
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>