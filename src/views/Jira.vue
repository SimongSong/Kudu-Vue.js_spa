<template>
    <v-dialog v-model="isModal" max-width="600px">
        <credentialsComponent title="Authenticate Jira Credentials" submit="Authenticate" :reroute="rerouteURL" :rules="rules" :action="action"></credentialsComponent>
    </v-dialog>
</template>

<script>
import credentialsComponent from "../components/credentialsComponent";
export default {
  components: {
    credentialsComponent,
  },
  name: "Jira",
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