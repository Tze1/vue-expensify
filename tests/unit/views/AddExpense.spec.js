import { shallowMount } from '@vue/test-utils'
import AddExpense from '@/views/AddExpense'
import testExpenses from '../../fixtures/testExpenses'

describe('AddExpense.vue', () => {
  const wrapper = shallowMount(AddExpense);
  const submitExpenseStub = jest.fn();

  wrapper.setMethods({
    submitExpense: submitExpenseStub,
  });

  it('renders AddExpense view properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls submitExpense method properly with pass expense object', () => {
    wrapper.vm.submitExpense(testExpenses[2]);

    expect(submitExpenseStub).toHaveBeenCalledWith(testExpenses[2]);
  });
})

