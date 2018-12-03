import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import EditExpense from '@/views/EditExpense';
import testExpenses from '../../fixtures/testExpenses';

/* Even though vue-test-utils docs says
* Vue.nextTick is not needed to wait for DOM updates,
* it's needed below for EditExpense method-calls that in turn call
* bootstrap-vue-components' show/hide methods.
*/

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
    const wrapper = mount(EditExpense, {
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
        $route,
      }
    });

    wrapper.vm.editExpense(updates);

    expect(dispatchStub).toHaveBeenCalledWith('editExpense', { id, updates });
    expect(pushStub).toHaveBeenCalledWith('/dashboard');
  });
});
