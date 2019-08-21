<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-alert dense outlined type="error" v-if="!credentialsValid">Invalid username or password</v-alert>
          <v-card class="elevation-12" style="align: center">
            <v-toolbar color="#E91E63" flat>
              <v-toolbar-title>Authenticate Jira Credentials</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="person"
                  v-model="account.username"
                  label="Jira Username"
                  v-on:keyup.enter="login"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Jira Password"
                  name="password"
                  prepend-icon="lock"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  v-model="account.password"
                  hint="At least 5 characters"
                  counter
                  @click:append="show = !show"
                  v-on:keyup.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="info" @click="login">Authenticate</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// import { JIRA } from "../jira";
export default {
  name: "Jira",
  created() {
    // console.log("JIRAAA");
    // console.log(JIRA);
    // this.test()
  },
  data() {
    return {
      show: false,
      account: {
        username: "",
        password: ""
      },
      credentialsValid: true
    };
  },
  methods: {
    // test() {
    //   JIRA.findIssue("MIS-322")
    //     .then(issue => {
    //       console.log(`Status: ${issue.fields.status.name}`);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    // },

    login() {
      this.$store.dispatch("jiraLogin", this.account).then(
        response => {
          console.log("jira success");
          console.log(response);
          this.$router.push('/')
        },
        error => {
          console.log("failed to authenticate");
          this.credentialsValid = false;
        }
      );
    }
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