import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/views/Dashboard'

const $store = {
  state: {
    auth: {
      user: {
        displayName: 'Test User',
        photoUrl: '/img/avatar-default.png',
      },
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
