import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/views/Dashboard';
import moment from 'moment';

const $store = {
  state: {
    auth: {
      user: {
        displayName: 'Test User',
        photoUrl: '/img/avatar-default.png',
      },
    },
    filters: {
      text: '',
      startDate: moment().subtract(30, 'days'),
      endDate: undefined,
      sortBy: 'date',
    },
  },
  getters: {
    userLoggedIn: state => {
      return (state.user !== undefined);
    },
  },
};
const wrapper = shallowMount(Dashboard, {
  mocks: { $store },
});

describe('Dashboard.vue', () => {
  it('renders Dashboard view properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
