<template>
  <div class="expenselist component">
    <div v-if="userLoggedIn">
      <p v-if="filteredExpenses.length === 0" class="expenselist-empty">
        [no expenses found]
      </p>
      <Expense v-else
        v-for="expense in filteredExpenses"
        :key="expense.id"
        :expense="expense"
      />
    </div>
    <div v-else class="expenselist-public">
      <p>
        PRIVATE CONTENT!  Please&nbsp;
        <router-link to="/">Log in</router-link>&nbsp;
        first.
      </p>
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
      filteredExpenses () {
        return this.$store.getters.filteredExpenses;
      },
    }),
    components: {
      Expense
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
