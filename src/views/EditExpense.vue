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
    <b-modal
      :centered='true'
      :hide-header-close='true'
      :no-close-on-backdrop='true'
      @ok='startRemove'
      class="editexpense-confirm"
      ok-title="Yes, remove"
      ok-variant="danger"
      ref="confirmRemoveModal"
      title="Confirm Remove"
    >
      <p class="confirm-message">Are you sure? Removing cannot be undone.</p>
    </b-modal>
  </div>
</template>

<script>
  import ExpenseForm from '../components/ExpenseForm';
  import bModal from 'bootstrap-vue/es/components/modal/modal';
  import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

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
        this.$refs.confirmRemoveModal.show();
      },
      startRemove () {
        this.$refs.confirmRemoveModal.hide();
        this.$store.dispatch('removeExpense', this.$route.params.id);
        this.$router.push('/dashboard');
      },
      onCancel () {
        this.$router.replace('/dashboard');
      }
    },

    components: {
      ExpenseForm,
      'b-modal': bModal,
    },

    directives: {
      'b-modal': bModalDirective,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
</style>
