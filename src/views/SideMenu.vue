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

      <v-list-item @click="$router.push('/')">
        <v-list-item-action>
        <v-icon>mdi-pine-tree</v-icon>
        </v-list-item-action>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item @click.stop="picker = true">
        <v-list-item-action>
        <v-icon>mdi-palette</v-icon>
        </v-list-item-action>
        <v-list-item-title>Colour</v-list-item-title>
        <ColourPicker :picker='picker' :pickerClose='pickerClose' />
      </v-list-item>
      <v-list-item @click="" disabled>
        <v-list-item-action>
        <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-title>Account(NOTHIGN ATM)</v-list-item-title>
      </v-list-item>
      <v-list-item @click="toAPI">
        <v-list-item-action>
        <v-icon>mdi-format-list-bulleted</v-icon>
        </v-list-item-action>
        <v-list-item-title>API</v-list-item-title>
      </v-list-item>
      <v-list-item @click="" disabled>
        <v-list-item-action>
        <v-icon>mdi-account-key</v-icon>
        </v-list-item-action>
        <v-list-item-title>Admin(NOTHIGN ATM)</v-list-item-title>
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
    disabled
    >
    <v-list-item-action>
    <v-icon color="grey darken-1">mdi-help-box</v-icon>
    </v-list-item-action>
    <v-list-item-title class="grey--text text--darken-1" >About(NOTHING ATM)</v-list-item-title>
    </v-list-item>
    <v-list-item @click="" disabled>
    <v-list-item-action>
    <v-icon color="grey darken-1" >settings</v-icon>
    </v-list-item-action>
    <v-list-item-title class="grey--text text--darken-1">Settings(NOTHING ATM)</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$store.commit('LOGOUT')" >
    <v-list-item-action>
    <v-icon color="grey darken-1">mdi-logout</v-icon>
    </v-list-item-action>
    <v-list-item-title class="grey--text text--darken-1">Logout(I ACTUALLY WORK)</v-list-item-title>
    </v-list-item>
  </v-list>
  </div>
</template>

<script>
  import ColourPicker from '../components/colourPickerComponent'
  import {BASE_URL} from "../helpers/util"
  export default {
    components : {
      ColourPicker
    },
    methods: {
      getRouterPath(model) {
        return "/list/" + model
      },
      toAPI() {
        window.location.href = BASE_URL
      },
      pickerClose() {
        this.picker = false
      }
    },
    data() {
      return {
        picker : false,
      }
    },
    computed: {
      getStructure() {
        return this.$store.getters.getStructurekeys
      }
    },
  }
</script>