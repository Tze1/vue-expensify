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

  it('displays confirm-modal on remove-button click', () => {
    const wrapper = mount(EditExpense, {
      mocks: {
        $store,
        $router,
        $route,
      },
    });

    wrapper.vm.$refs.confirmRemoveModal.hide();

    Vue.nextTick(() => {
      wrapper.find('.editexpense-remove').trigger('click');
    });

    Vue.nextTick(() => {
      // modal should no longer have style="display:none;" once displayed.
      expect(wrapper.find('.editexpense-confirm .modal').
        attributes('style')).toMatch('');
      wrapper.vm.$refs.confirmRemoveModal.hide();
    });

  });

  it('hides confirm-modal on modal-cancel-button click', () => {
    const wrapper = mount(EditExpense, {
      mocks: {
        $store,
        $router,
        $route,
      },
    });

    wrapper.vm.$refs.confirmRemoveModal.show();
    // modal should no longer have style="display:none;" once displayed.

    Vue.nextTick(() => {
      wrapper.find('.modal-footer .btn-secondary').trigger('click');
      // modal should now have style="display:none;" once displayed.
    });

    Vue.nextTick(() => {
      expect(wrapper.find('.editexpense-confirm .modal').
        attributes('style')).toMatch('display: none');
    });
  });

  it('hides confirm-modal & dispatches removeExpense action properly on modal-remove-button click', () => {
    const id = $route.params.id;
    const wrapper = mount(EditExpense, {
      localVue,
      mocks: {
        $store,
        $router,
        $route
      }
    });

    wrapper.vm.onRemove();  // displays confirm-modal.

    Vue.nextTick(() => {
      wrapper.find('.modal-footer .btn-danger').trigger('click');
      // confirm-modal should now be hidden.
    });

    Vue.nextTick(() => {
      expect(wrapper.find('.editexpense-confirm .modal').
        attributes('style')).toMatch('display: none');
      expect(dispatchStub).toHaveBeenCalledWith('removeExpense', id);
    });
  });
});
