<template>
  <div class="editexpense component">
    <h2 class="editexpense-title">Edit Expense</h2>
    <ExpenseForm
      :expense="expense"
      :submitExpense="editExpense"
    />
    <div class="editexpense-actions">
      <button class="editexpense-cancel button exit" @click="onCancel">Cancel</button>&nbsp;
      <button class="editexpense-remove button danger" @click="onRemove">Remove Expense</button>
    </div>
  </div>
</template>

<script>
  import ExpenseForm from '../components/ExpenseForm';

  export default {
    name: 'EditExpense',
    computed: {
      expense () {
        return this.$store.state.expenses.find(
          expense => expense.id === this.$route.params.id
        )
      },
    },
    methods: {
      editExpense (updates) {
        this.$store.dispatch('editExpense', {
          id: this.$route.params.id,
          updates
        });
        this.$router.push('/dashboard');
      },
      onRemove () {
        this.$store.dispatch('removeExpense', this.$route.params.id);
        this.$router.push('/dashboard');
      },
      onCancel () {
        this.$router.replace('/dashboard');
      }
    },
    components: {
      ExpenseForm,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
