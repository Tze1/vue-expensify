<template>
  <div class="expenseform component">
    <p v-if="!!errorMessage" class="expenseform-error">{{ errorMessage }}</p>
    <form @submit="onSubmit">
      <Datepicker
        :clear-button="false"
        @selected="onDateChange"
        calendar-class="expenseform-datepicker"
        format="MM/dd/yyyy"
        input-class="datepicker-input"
        name="createdAt"
        :value="date"
      />
      <input
        class="expenseform-description"
        type="text"
        name="description"
        placeholder="Description"
        autoFocus
        v-model="description"
      />
      <input
        class="expenseform-amount"
        type="text"
        name="amount"
        placeholder="Amount"
        v-model="amount"
      />
      <textarea
        class="expenseform-note"
        name="note"
        placeholder="Add a note.  (optional)"
        v-model="note"
      />
      <button class="expenseform-submit button" type="submit">
        {{ expense ? 'Update' : 'Save' }} Expense
      </button>
    </form>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';

  export default {
    name: 'ExpenseForm',
    data () {
      return {
        date: this.expense ?
          moment(this.expense.createdAt).toDate() :
          moment().toDate(),
        description: this.expense ?
          this.expense.description :
          '',
        amount: this.expense ?
          (this.expense.amount / 100).toString() :
          '',
        note: this.expense ?
          this.expense.note :
          '',
        errorMessage: '',
      }
    },
    props: {
      submitExpense: {
        type: Function,
        required: true,
      },
      expense: {
        type: Object,
        required: false,
      },
    },
    watch: {
      expense: function () {
        /* After any manual page-refresh, if an expense does get passed in for edit, populate form-fields (set data) with expense-info. */
        const expense = this.expense;
        if (expense) {
          this.date = moment(expense.createdAt).toDate();
          this.description = expense.description;
          this.amount = (expense.amount / 100).toString();
          this.note = expense.note;
        }
      },
    },
    methods: {
      onDateChange (e) {
        this.date = e;
      },
      onSubmit (e) {
        const vm = this;
        e.preventDefault();  // don't navigate!

        if (!!vm.description && !!vm.amount) {
          // Clear error message and call parent submit method (from props).
          vm.errorMessage = '';
          vm.submitExpense({
            createdAt: moment(vm.date.getTime()).valueOf(),
            description: vm.description,
            amount: parseFloat(vm.amount * 100),
            note: vm.note,
          });
        } else {
          // Set error message.
          vm.errorMessage = 'ERROR: Missing description or amount.';
        }
      },
    },
    components: {
      Datepicker,
    },
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

  .expenseform.component {
    form {
      > * {
        display: block;
        margin-bottom: $space-sm;
      }

      > input,
      > textarea {
        border: 0;
        padding: $space-xs;
        width: calc(100% - #{$space-lg});

        @include mq("tablet") {
          min-width: 23.75rem;
          width: auto;
        }

        &.expenseform-amount {
          text-align: right;
        }
      }  // > .input, > .textarea
    }  // form
  }  // .expenseform.component
</style>
