<template>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
          <v-alert
            dense
            outlined
            type="error"
            v-if="!credentialsValid"
          >
            Invalid username or password
          </v-alert>
            <v-card class="elevation-12" style="align: center">
              <v-toolbar
                color="#E91E63"
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    v-model="account.username"
                    label="Account"
                    v-on:keyup.enter="login"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    v-model="account.password"
                    :rules="[rules.required, rules.min]"
                    hint="At least 5 characters"
                    counter
                    @click:append="show = !show"
                    v-on:keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

export default {
  name: 'login',
  computed: {
  },  
  methods: {
    login () {
      this.$store.dispatch('login',this.account)
      .then(
        response => {console.log(response);
        this.$router.push('/kudu') 
        },
        error => {
          this.credentialsValid = false
        })
    },
  },
  data() {
    return {
      show: false,
      rules: {
        required: value => !!value || 'Required',
        min: v => v.length >= 5 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
        },
      account : {
        username: "",
        password: "",
      },
      credentialsValid: true
    }
  },
}

</script>

<style lang="scss" scoped>
img {
      margin-bottom: 5px;
      max-width: 100px;
      text-align: center;  
    }

</style>