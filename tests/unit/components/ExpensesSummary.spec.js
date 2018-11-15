import { shallowMount } from '@vue/test-utils';
import numeral from 'numeral';
import ExpensesSummary from '@/components/ExpensesSummary';

describe('ExpensesSummary', () => {
  const $store = {
    getters: {
      expensesFiltered () {
        return this.$store.getters.expensesFiltered;
      },
      expensesCount () {
        return this.$store.getters.filteredCount;
      },
      expensesSum () {
        return numeral(this.$store.getters.filteredSum / 100).format('$0,0.00');
      },
    },
  };
  const wrapper = shallowMount(ExpensesSummary, {
    mocks: {
      $store,
    },
  });

  it('renders ExpensesSummary component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
