import { shallowMount } from '@vue/test-utils'
import router from '@/router'
import NotFound from '@/views/NotFound'

describe('NotFound.vue', () => {
  it('renders NotFound view properly', () => {
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
    const wrapper = shallowMount(NotFound, {
      mocks: {
        $store,
      },
    });

    expect(wrapper).toMatchSnapshot();
  })
})
