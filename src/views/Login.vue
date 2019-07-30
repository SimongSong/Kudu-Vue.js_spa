<template>
<div style="text-align: center;">
  <div class="login-focus">
      <div class="title">
        <img src="../assets/temporarylogo.png">
        <div class="md-title">LOGIN</div>
        <div class="md-body-1">Life is like a hair loss, it just gets progressively worse.</div>
      </div>
      <div class="login-form">
        <md-field>
          <label>Username</label>
          <md-input v-model="account.username" autofocus required></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="account.password"  required type="password" v-on:keyup.enter="login"></md-input>
        </md-field>
      </div>
    <md-button class="login-button md-raised md-primary" @click="login" >Sign In</md-button>
  </div>
</div>
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
      account : {
        username: "",
        password: "",
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login-focus {
  display: inline-block;
  .title {
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;
    img {
      margin-bottom: 5px;
      max-width: 100px;
    }
  }
}

.login-form {
  margin-bottom : 40px;
}

.md-field {
  max-width: 30vw;
}

.login-button {
  float : right;
}

</style>