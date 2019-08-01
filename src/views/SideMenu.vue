<template>
  <div>
  <v-list dense >
 <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Kudu-Colossus
          </v-list-item-title>
          <v-list-item-subtitle>
            Welcome, Simong
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="">
        <v-list-item-action>
        <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-title>Account</v-list-item-title>
      </v-list-item>
      <v-list-item @click="">
        <v-list-item-action>
        <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-action>
        <v-list-item-title>API</v-list-item-title>
      </v-list-item>
      <v-list-item @click="">
        <v-list-item-action>
        <v-icon>mdi-church</v-icon>
        </v-list-item-action>
        <v-list-item-title>Admin</v-list-item-title>
      </v-list-item>

      <v-subheader class="mt-4 grey--text text--darken-1">FOLDERS</v-subheader>
      <v-list-group
        v-for="(value,key) in getStructure"
        :key="key"
        v-model="value.active"
        prepend-icon="mdi-folder"
        no-action
      >

        <template v-slot:activator>
        <v-list-item-content>
        <v-list-item-title v-text="key"></v-list-item-title>
        </v-list-item-content>
        </template>

        <v-list-item
        v-for="(s,k) in value"
        :key="k"
        @click="$router.push(s.link)"
        >
          <v-list-item-action>
            <v-icon>{{s.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="s.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list-group>

    <v-subheader class="mt-4 grey--text text--darken-1">KUDU</v-subheader>
    <v-list-item
    class="mt-4"
    @click=""
    >
    <v-list-item-action>
    <v-icon color="grey darken-1">mdi-help-box</v-icon>
    </v-list-item-action>
    <v-list-item-title class="grey--text text--darken-1">About</v-list-item-title>
    </v-list-item>
    <v-list-item @click="">
    <v-list-item-action>
    <v-icon color="grey darken-1">settings</v-icon>
    </v-list-item-action>
    <v-list-item-title class="grey--text text--darken-1">Settings</v-list-item-title>
    </v-list-item>
  </v-list>
  </div>
</template>

<script>
  export default {
    methods: {
      getRouterPath(model) {
        return "/list/" + model
      },
    },
    computed: {
      getStructure() {
        return this.$store.getters.getStructurekeys
      }
    },
  }
</script>