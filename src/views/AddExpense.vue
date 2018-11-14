<template>
  <div class="addexpense component">
    <h2 class="addexpense-title">Add Expense</h2>
    <ExpenseForm :submitExpense="addExpense"/>
    <button class="addexpense-cancel button exit" @click="onCancel">Cancel</button>
  </div>
</template>

<script>
  import ExpenseForm from '../components/ExpenseForm';

  export default {
    name: 'AddExpense',
    methods: {
      onCancel () {
        this.$router.push('/dashboard');
      },
      addExpense (expense) {
        this.$store.dispatch('addExpense', expense);
        this.$router.push('/dashboard');
      },
    },
    components: {
      ExpenseForm,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
