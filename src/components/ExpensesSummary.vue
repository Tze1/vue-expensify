<template>
  <div class="expensessummary component">
    <p>
      <span class="expensessummary-showing">Showing&nbsp;</span>
      <span class="expensessummary-count">{{ expensesCount }}</span>&nbsp;expense(s)
      <span v-if="expensesFiltered" class="expensessummary-filtered">(filtered)&nbsp;</span>&nbsp;totalling
      <span class="expensessummary-amount">{{ expensesSum }}</span>
    </p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import numeral from 'numeral';

  export default {
    name: 'ExpensesSummary',
    computed: mapState({
      expensesFiltered () {
        return this.$store.getters.expensesFiltered;
      },
      expensesCount () {
        return this.$store.getters.filteredCount;
      },
      expensesSum () {
        return numeral(this.$store.getters.filteredSum / 100).format('$0,0.00');
      },
    }),
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

  .expensessummary.component {
    > p {
      font-size: $font-size-sm;
      margin-bottom: $space-sm;
      margin-top: $space-xs;

      .expensessummary-showing {
        display: none;

        @include mq("tablet") {
          display: inline;
        }
      }

      .expensessummary-count,
      .expensessummary-amount {
        font-size: $font-size-default;
        font-weight: bold;
      }
    }
  }
</style>
