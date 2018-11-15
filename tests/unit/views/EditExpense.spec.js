import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import EditExpense from '@/views/EditExpense';
import testExpenses from '../../fixtures/testExpenses';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EditExpense.vue', () => {
  const dispatchStub = jest.fn();
  const pushStub = jest.fn();
  const $store = {
    state: {
      expenses: testExpenses,
    },
    dispatch: dispatchStub,
  };
  const $router = {
    push: pushStub,
  };
  const $route = {
    params: { id: '1' },
  };

  it('renders EditExpense view properly', () => {
    const wrapper = shallowMount(EditExpense, {
      mocks: {
        $store,
        $router,
        $route,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('dispatches editExpense action properly', () => {
    const id = testExpenses[0].id
    const updates = {
      createdAt: testExpenses[0].createdAt,
      description: testExpenses[0].description,
      amount: testExpenses[0].amount,
      note: testExpenses[0].note,
    };
    const wrapper = shallowMount(EditExpense, {
      localVue,
      mocks: {
        $store,
        $router,
        $route
      }
    });

    wrapper.vm.editExpense(updates);

    expect(dispatchStub).toHaveBeenCalledWith('editExpense', { id, updates });
    expect(pushStub).toHaveBeenCalledWith('/dashboard');
  });
});
