<template>
  <div class="expenselistfilters component">
    <h4 class="expenselistfilters-title">Filters</h4>
    <div class="expenselistfilters-controls">
      <input
        type="text"
        name="text"
        placeholder="filter by text"
        v-model="filters.text"
        @input="onTextInput"
      />
      <Datepicker
        name="startDate"
        format="MM/dd/yyyy"
        :value="startDateValue"
        @selected="onStartDateChange"
        @cleared="onStartDateChange"
        input-class="datepciker-input"
        :clear-button="true"
      />
      <Datepicker
        name="endDate"
        format="MM/dd/yyyy"
        :value="endDateValue"
        @selected="onEndDateChange"
        @cleared="onEndDateChange"
        input-class="datepciker-input"
        :clear-button="true"
      />
      <select
        name="sortBy"
        v-model="filters.sortBy"
        @change="onSortByChange"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'ExpenseListFilters',
    props: {
      filters: {
        type: Object,
        required: true,
      },
    },
    computed: {
      startDateValue: function () {
        return this.filters.startDate ?
          moment(this.filters.startDate).toDate() :
          undefined;
      },
      endDateValue: function () {
        return this.filters.endDate ?
          moment(this.filters.endDate).toDate() :
          undefined;
      }
    },
    methods: {
      onTextInput (e) {
        console.log('[ExpenseListFilters onTextInput event:', e);
        this.$store.dispatch('setFilterText', e.target.value);
      },
      onStartDateChange (e) {
        if (e) {
          this.$store.dispatch('setFilterStartDate', moment(e.getTime()));
        } else {
          this.$store.dispatch('setFilterStartDate', undefined);
        }
      },
      onEndDateChange (e) {
        if (e) {
          this.$store.dispatch('setFilterEndDate', moment(e.getTime()));
        } else {
          this.$store.dispatch('setFilterEndDate', undefined);
        }
      },
      onSortByChange (e) {
        this.$store.dispatch('setFilterSortBy', e.target.value);
      }
    },
    components: {
      Datepicker
    }
  };
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';
  .expenselistfilters.component {
      font-size: 1.4rem;

    .expenselistfilters-title {
      margin-bottom: $space-xs;
      margin-top: $space-xs;
    }

    .expenselistfilters-controls {
      display: flex;
      flex-flow: column;
      font-size: 1.4rem;

      > * {
        margin-bottom: $space-xs;

        *:last-child {
          margin-bottom: 0;
        }
      }

      > input,
      > select {
        border: 0;
        font-size: 1.4rem;
        overflow: hidden;
        padding: $space-xs;

        > option {
          font-size: 1.4rem;
        }
      }

      @include mq("tablet") {
        flex-flow: row nowrap;
        justify-content: space-between;

        > input,
        > select {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
