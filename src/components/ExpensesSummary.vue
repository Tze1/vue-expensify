<template>
  <div class="expensessummary component">
    <p>
      <span class="expensessummary-count">{{ expensesCount }}</span>&nbsp;expense(s)&nbsp;
      <span v-if="expensesFiltered" class="expensessummary-filtered">
        (filtered)&nbsp;
      </span>totalling&nbsp;
      <span class="expensessummary-amount">{{ expensesSum }}</span>
      <span v-if="expensesFiltered" class="expensessummary-hiddencount">
        &nbsp;[{{ hiddenCount }} hidden]
      </span>
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
      hiddenCount() {
        return this.$store.getters.totalCount - this.$store.getters.filteredCount;
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

      .expensessummary-count,
      .expensessummary-amount {
        font-size: $font-size-default;
        font-weight: bold;
      }
    }
  }
</style>
