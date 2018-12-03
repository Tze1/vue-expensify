import { shallowMount, mount, createLocalVue, RouteLinkStub } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import testExpenses from '../../fixtures/testExpenses';
import Expense from '@/components/Expense';

/* Even though vue-test-utils docs says
* Vue.nextTick is not needed to wait for DOM updates,
* it's needed below for EditExpense method-calls that in turn call
* bootstrap-vue-components' show/hide methods.
*/

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Expense.vue', () => {
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
    name: 'Expense',
    params: { id: '1' },
  };
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

  it('displays confirm-modal on remove-button click', () => {
    const wrapper = mount(Expense, {
    stubs: [ 'router-link' ],
      mocks: {
        $store,
        $router,
        $route,
      },
      propsData: {
        expense: testExpense,
      },
    });

    wrapper.vm.$refs.confirmRemoveModal.hide();

    Vue.nextTick(() => {
      wrapper.find('.expense-remove').trigger('click');
    });

    Vue.nextTick(() => {
      // modal should no longer have style="display:none;" once displayed.
      expect(wrapper.find('.expense-confirm .modal').
        attributes('style')).toMatch('');
      wrapper.vm.$refs.confirmRemoveModal.hide();
    });

  });

  it('hides confirm-modal on modal-cancel-button click', () => {
    const wrapper = mount(Expense, {
    stubs: [ 'router-link' ],
      mocks: {
        $store,
        $router,
        $route,
      },
      propsData: {
        expense: testExpense,
      },
    });

    wrapper.vm.$refs.confirmRemoveModal.show();
    // modal should no longer have style="display:none;" once displayed.

    Vue.nextTick(() => {
      wrapper.find('.modal-footer .btn-secondary').trigger('click');
      // modal should now have style="display:none;" once displayed.
    });

    Vue.nextTick(() => {
      expect(wrapper.find('.expense-confirm .modal').
        attributes('style')).toMatch('display: none');
    });
  });

  it('hides confirm-modal & dispatches removeExpense action properly on modal-remove-button click', () => {
    const id = $route.params.id;
    const wrapper = mount(Expense, {
      localVue,
    stubs: [ 'router-link' ],
      mocks: {
        $store,
        $router,
        $route
      },
      propsData: {
        expense: testExpense,
      },
    });

    wrapper.vm.onRemove();  // displays confirm-modal.

    Vue.nextTick(() => {
      wrapper.find('.modal-footer .btn-danger').trigger('click');
      // confirm-modal should now be hidden.
    });

    Vue.nextTick(() => {
      expect(wrapper.find('.expense-confirm .modal').
        attributes('style')).toMatch('display: none');
      expect(dispatchStub).toHaveBeenCalledWith('removeExpense', id);
    });
  });
});
