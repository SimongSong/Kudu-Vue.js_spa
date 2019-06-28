<template>
<div class="title" >
  <img src="../assets/temporarylogo.png">
  <div class="md-title">Kudu - Colossus</div>
  <div class="md-body">Hello {{username}}!</div>
</div>
</template>

<script>
export default {
  name: 'sidemenuTop',
  computed : {
    username () {
      return this.$store.getters.getUsername
    }
  },
}
</script>

