<template>
  <div v-if="userLoggedIn" class="dashboard component">
    <h2 class="dashboard-title">Dashboard</h2>
    <ExpenseList />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ExpenseList from '../components/ExpenseList'

  export default {
    name: 'Dashboard',
    computed: mapState({
      userLoggedIn () {
        return this.$store.getters.userLoggedIn;
      },
      user: state => state.auth.user,
    }),
    components: {
      ExpenseList
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

  .dashboard.component {
    .dashboard-title {
      margin-bottom: 0;
    }
  }
</style>
