import { shallowMount } from '@vue/test-utils';
import testExpenses from '../../fixtures/testExpenses';
import Expense from '@/components/Expense';

describe('Expense.vue', () => {
  const testExpense = testExpenses[0];
  const testEditLinkPath = '/edit/' + testExpenses[0].id;
  const wrapper = shallowMount(Expense, {
    stubs: [ 'router-link' ],
    propsData: {
      expense: testExpense,
    },
  });

  it('renders Expense component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders editExpenseLink path properly', () => {
    expect(wrapper.find('router-link-stub').attributes('to')).
      toBe(testEditLinkPath);
  });
});
