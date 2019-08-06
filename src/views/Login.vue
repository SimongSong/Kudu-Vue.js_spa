<template>

<v-container >
  <v-layout >
    <v-flex style="text-align: center;">
    <img src="../assets/temporarylogo.png">
      <v-text-field
        v-model="account.username"
        label="Account"
      ></v-text-field>
      <v-text-field
        v-model="account.password"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 5 characters"
        counter
        @click:append="show = !show"
      ></v-text-field>
      <br>
      <v-btn style="float:right;" color="secondary" @click="login">Login</v-btn>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>

export default {
  name: 'login',
  computed: {
  },  
  methods: {
    login () {
      console.log("E")
      this.$store.dispatch('login',this.account)
      .then(
        response => {console.log(response);
        this.$router.push('/') 
        },
        error => {
          console.log("ERROR")
        })
    },
  },
  data() {
    return {
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
        },
      account : {
        username: "",
        password: "",
      }
    }
  },
}

// <div style="text-align: center;">
//   <div class="login-focus">
//       <div class="title">
//         <img src="../assets/temporarylogo.png">
//         <div class="md-title">LOGIN</div>
//         <div class="md-body-1">Life is like a hair loss, it just gets progressively worse.</div>
//       </div>
//       <div class="login-form">
//         <md-field>
//           <label>Username</label>
//           <md-input v-model="account.username" autofocus required></md-input>
//         </md-field>
//         <md-field>
//           <label>Password</label>
//           <md-input v-model="account.password"  required type="password" v-on:keyup.enter="login"></md-input>
//         </md-field>
//       </div>
//     <md-button class="login-button md-raised md-primary" @click="login" >Sign In</md-button>
//   </div>
// </div>
</script>

<style lang="scss" scoped>
img {
      margin-bottom: 5px;
      max-width: 100px;
      text-align: center;  
    }

</style>