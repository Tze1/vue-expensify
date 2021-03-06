<template>
  <div class="expense component">
    <div class="expense-wrapper">
      <span class="expense-createdat">{{ createdAtDisplay }}</span>
      <span class="expense-description">{{ expense.description }}</span>
      <span class="expense-amount">{{ amountDisplay }}</span>
      <router-link :to="editExpenseLink" title="Edit Expense" aria-label="Edit Expense" class="expense-edit">
        <font-awesome-icon icon="edit" />
      </router-link>
      <button @click="onRemove" title="Remove Expense" aria-label="Remove Expense" class="expense-remove">
        <font-awesome-icon icon="trash-alt" />
      </button>
    </div>
    <b-modal
      :centered='true'
      :hide-header-close='true'
      :no-close-on-backdrop='true'
      @ok='startRemove'
      class="expense-confirm"
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
  import bModal from 'bootstrap-vue/es/components/modal/modal';
  import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';
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
        return '/edit/' + this.expense.id;
      },
      createdAtDisplay: function () {
        return moment(this.expense.createdAt).format('MM/DD/YYYY');
      },
      amountDisplay: function () {
        return numeral(this.expense.amount / 100).format('$0,0.00');
      },
    },
    methods: {
      onRemove () {
        this.$refs.confirmRemoveModal.show();
      },
      startRemove () {
        this.$refs.confirmRemoveModal.hide();
        this.$store.dispatch('removeExpense', this.expense.id);
      },
    },
    components: {
      'b-modal': bModal,
    },

    directives: {
      'b-modal': bModalDirective,
    },
  };
</script>

<style scope lang="scss">
  @import '../styles/app.scss';

  .expense.component {
    border-bottom: 1px dotted $gray4;
    font-size: $font-size-default;
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

    .expense-wrapper {
      display: flex;
      flex-flow: row nowrap;

      > * {
        flex: 0 0 auto;
        padding-right: .8rem;

        &.expense-description {
          @include text-truncate;
          flex: 1 1 auto;

          @include mq("tablet") {
            flex: 1 0 auto;
          }
        }

        &:last-child {
          padding-right: 0;
        }
      } // > *

      .expense-amount {
        margin-right: $space-xs;
      }

      .expense-edit {
        background: none;
        border: none;

        .svg-inline--fa {
          color: inherit;
        }
      }

      .expense-remove {
        background: none;
        border: none;
        color: $orange;
        font-size: 1rem;

        &:hover {
          color: lighten($orange, 25%);
        }

        .svg-inline--fa {
          color: inherit;
        }

      } // .expense-remove
    } // .expense-wrapper

  } // .expense.component

</style>
