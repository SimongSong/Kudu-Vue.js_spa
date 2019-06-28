<template>
  <div class="centre-focus">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="../assets/temporarylogo.png">
        <div class="md-title">Kudu - Colossus</div>
        <div class="md-body-1">Life is like a hair loss, it just gets progressively worse.</div>
      </div>

      <div class="login-form">
        <md-field>
          <label>Username</label>
          <md-input v-model="account.username" autofocus></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="account.password" autofocus type="password"></md-input>
        </md-field>
      </div>

      <md-button class="md-raised md-primary" @click="login">Sign In</md-button>

    </md-content>
  </div>
</template>

<script>

export default {
  name: 'login',
  props: { 
    toggleLogin: {type: Function},
    spinnerLoading: {type: Function},
  },
  methods: {
    login () {
      this.spinnerLoading()
      this.$store.dispatch('login',this.account).then(
        response => {console.log(response);
        this.spinnerLoading()
        this.toggleLogin()},
        error => {})
    }
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

<style lang="scss">
.centre-focus {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
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

.md-content {
  z-index: 1;
  width: 100%;
  padding: 25px;
  max-width: 350px;
  position: relative;
}

.md-button {
  float : right;
}

</style>