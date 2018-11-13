import { shallowMount } from '@vue/test-utils';
import testExpenses from '../../fixtures/testExpenses';
import ExpenseList from '@/components/ExpenseList';

const $store = {
  state: {
    auth: {
      user: {
        displayName: 'Test',
        photoUrl: '/img/avatar-default.png',
      },
    },
    expenses: testExpenses,
  },
  getters: {
    userLoggedIn: state => {
      return (state.auth.user !== undefined);
    },
    filteredExpenses: state => {
      return state.expenses;
    }
  },
};
const wrapper = shallowMount(ExpenseList, {
  mocks: {
    $store,
  },
});

describe('ExpenseList.vue', () => {
  it('renders ExpenseList component properly', () => {
    expect(wrapper).toMatchSnapshot();
  })
});
