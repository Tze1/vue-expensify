<template>
  <div v-if="userLoggedIn" class="home component">
    <h2>Home</h2>
    <p>This is the Home view.</p>
    <HelloWorld :msg="`Hello, ${user.displayName.split(' ')[0]}`"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import HelloWorld from '../components/HelloWorld';

  export default {
    name: 'Home',
    computed: mapState({
      userLoggedIn () {
        return this.$store.getters.userLoggedIn;
      },
      user: state => state.auth.user,
    }),
    components: {
      HelloWorld
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
