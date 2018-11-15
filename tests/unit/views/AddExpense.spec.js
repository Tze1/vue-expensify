import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AddExpense from '@/views/AddExpense';
import testExpenses from '../../fixtures/testExpenses';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddExpense.vue', () => {

  it('renders AddExpense view properly', () => {
    const wrapper = shallowMount(AddExpense);
    expect(wrapper).toMatchSnapshot();
  });

  it('dispatches addExpense action properly', () => {
    const dispatchStub = jest.fn();
    const pushStub = jest.fn();
    const $store = {
      state: {},
      dispatch: dispatchStub,
    };
    const $router = {
      push: pushStub,
    };

    const testExpense = {
      createdAt: testExpenses[0].createdAt,
      description: testExpenses[0].description,
      amount: testExpenses[0].amount,
      note: testExpenses[0].note,
    };
    const wrapper = shallowMount(AddExpense, {
      localVue,
      mocks: {
        $store,
        $router,
      },
    });

    wrapper.vm.addExpense(testExpense);

    expect(dispatchStub).toHaveBeenCalledWith('addExpense', testExpense);
    expect(pushStub).toHaveBeenCalledWith('/dashboard');
  });
});
