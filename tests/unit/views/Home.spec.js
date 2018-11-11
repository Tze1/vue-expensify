import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('renders Home view properly', () => {
    const $store = {
      state: {
        auth: {
          user: {
            displayName: 'Test',
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
    const wrapper = shallowMount(Home, {
      mocks: {
        $store,
      },
    });

    expect(wrapper).toMatchSnapshot();
  })
})
