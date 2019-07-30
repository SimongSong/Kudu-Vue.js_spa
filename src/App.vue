<template>
  <div>
  <Temp />
  <div class="loading-overlay" v-if="loading" >
    <md-progress-spinner md-mode="indeterminate">
    </md-progress-spinner>
  </div>
  </div>
</template>
 
<script>

import Temp from './views/Temp'
export default {
  name: 'app',
  components: {
    Temp
  },
  data() {
    return {
      auth: false
    }
  },
}
</script>

<style lang="scss">
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>