<template>
  <div class="notfound component">
    <h2>Not Found</h2>
    <p>Sorry!  The resource you requested was not found.</p>
    <p>Please go back to:</p>
    <router-link v-if="!userLoggedIn" to="/">Login</router-link>
    <router-link v-else to="/home">Home</router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState({
      userLoggedIn () {
        return this.$store.getters.userLoggedIn;
      },
    }),
  };
</script>

<style lang="scss">
  @import '../styles/app.scss';
</style>
