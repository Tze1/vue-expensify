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
    const id = $route.params.id;  // '1' (testExpenses[0])
    const updates = {
      createdAt: testExpenses[0].createdAt,
      description: 'updated description',
      amount: testExpenses[0].amount,
      note: 'updated note',
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

  it('dispatches removeExpense action properly on remove-button click', () => {
    const id = $route.params.id;
    const wrapper = shallowMount(EditExpense, {
      localVue,
      mocks: {
        $store,
        $router,
        $route
      }
    });

    wrapper.find('.editexpense-remove').trigger('click');

    expect(dispatchStub).toHaveBeenCalledWith('removeExpense', id);
  });
});
