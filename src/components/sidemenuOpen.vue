<template>
  <button :class"[open ? $style.active : '', $style.button]" @click="onButtonClick">   
  </button>
</template>

<script>
export default {
  name: 'sidemenuOpen',
  components: {
    open () {
      return this.$store.state.menuOpen
    }
  },
  methods: {
    onButtonClick () {
      this.$store.dispatch('toggleMenu')
    }
  }
}
</script>

