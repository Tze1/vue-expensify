<template>
  <div class="expenselist component">
    <div v-if="userLoggedIn">
      <p v-if="expenses.length === 0" class="expenselist-empty">[no expenses found]</p>
      <Expense v-else v-for="expense in expenses" :key="expense.id" :expense="expense"/>
    </div>
    <div v-else class="expenselist-public">
      <p>PRIVATE CONTENT!  Please <router-link to="/">Log in</router-link> first.</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Expense from './Expense';

  export default {
    name: 'ExpenseList',
    computed: mapState({
      userLoggedIn () {
        return this.$store.getters.userLoggedIn;
      },
      expenses: state => state.expenses,
    }),
    components: {
      Expense
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
