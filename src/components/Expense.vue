<template>
  <div class="expense component">
    <span class="expense-createdat">{{ createdAtDisplay }}</span>
    <span class="expense-description">{{ expense.description }}</span>
    <span class="expense-amount">{{ amountDisplay }}</span>
    <router-link :to="editExpenseLink">edit</router-link>
  </div>
</template>

<script>
  import moment from 'moment';
  import numeral from 'numeral';

  export default {
    name: 'Expense',
    props: {
      expense: {
        type: Object,
        required: true,
      },
    },
    computed: {
      editExpenseLink: function () {
        return '/edit/:' + this.expense.id;
      },
      createdAtDisplay: function () {
        return moment(this.expense.createdAt).format('MM/DD/YYYY');
      },
      amountDisplay: function () {
        return numeral(this.expense.amount / 100).format('$0,0.00');
      },
    },
  };
</script>

<style scope lang="scss">
  @import '../styles/app.scss';

  .expense.component {
    border-bottom: 1px dotted $gray4;
    display: flex;
    flex-flow: row nowrap;
    font-size: 1.6rem;
    justify-content: flex-start;
    margin-bottom: $space-sm / 2;
    padding-bottom: $space-sm / 2;

    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, .65);
    }

    &:first-child {
      border-top: 1px solid $gray4;
      padding-top: $space-sm / 2;
      margin-top: $space-sm / 2;
    }

    &:last-child {
      border-bottom: 1px solid $gray4;
    }

    > * {
      flex: 0 0 auto;
      padding-right: .8rem;

      &.expense-description {
        flex-grow: 1;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
</style>
