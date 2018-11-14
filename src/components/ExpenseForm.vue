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
        :value="description"
        @change="onDescriptionChange"
      />
      <input
        class="expenseform-amount"
        type="text"
        name="amount"
        placeholder="Amount"
        :value="amount"
        @change="onAmountChange"
      />
      <textarea
        class="expenseform-note"
        name="note"
        placeholder="Add a note.  (optional)"
        :value="note"
        @change="onNoteChange"
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
    methods: {
      onDateChange (e) {
        this.date = e;
      },
      onDescriptionChange (e) {
        const value = e.target.value;
        if (value) {
          this.description = value;
          if (this.amount) {
            this.errorMessage = '';
          }
        }
      },
      onAmountChange (e) {
        const value = e.target.value;
        if (value) {
          this.amount = value;
          if (this.description) {
            this.errorMessage = '';
          }
        }
      },
      onNoteChange (e) {
        this.note = e.target.value;
      },
      onSubmit (e) {
        const vm = this;
        e.preventDefault();  // don't navigate!

        if (!vm.description || !vm.amount) {
          // Set error message.
          vm.errorMessage = 'ERROR: Missing description or amount.';
        } else {
          // Clear error message and call parent submit method (from props).
          vm.errorMessage = '';
          vm.submitExpense({
            createdAt: moment(vm.date.getTime()).valueOf(),
            description: vm.description,
            amount: parseFloat(vm.amount * 100),
            note: vm.note,
          });
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

        &.expenseform-datepicker {

          // .DateInput--with-caret.DateInput--open-down::after,
          // .DateInput--with-caret.DateInput--open-down::before {
          //   top: 47px;
          // }

          // .SingleDatePicker__picker--open-down {
          //   top: 57px;
          // }
        }
      }  // > *

      > input,
      > textarea {
        border: 0;
        padding: $space-xs;
        width: calc(100% - #{$space-lg});

        @include mq("tablet") {
          min-width: 38rem;
          width: auto;
        }

        &.expenseform-amount {
          text-align: right;
        }
      }  // > .input, > .textarea
    }  // form
  }  // .expenseform.component
</style>
