<template>
    <!-- <v-dialog v-model="isModal" max-width="600px"> -->
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <!-- Showcard: {{showCard}} -->
        <credentialsComponent title="Authenticate Jira Credentials" submit="Authenticate" :reroute="rerouteURL" :rules="rules" :action="action"></credentialsComponent>
    <!-- </v-dialog> -->
        </v-flex>
        </v-layout>
     </v-container>
</template>

<script>
import credentialsComponent from "../components/credentialsComponent";
export default {
  name: "Jira",
  components: {
    credentialsComponent,
  },
  props: ["showCard"],
  data() {
    return {
      action: "jiraLogin",
      isModal: true,
      credentialsValid: true,
      rerouteURL: "",
      rules: {
        username: [],
        password: []
      },
    };
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-bottom: 5px;
  max-width: 100px;
  text-align: center;
}
</style>