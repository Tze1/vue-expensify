import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  const $store = {
    state: {
      auth: {
        user: {
          displayName: 'Test User',
          photoURL: '/img/avatar-default.png',
        },
      },
    },
    getters: {
      userLoggedIn: state => {
        return (state.auth.user !== undefined);
      },
    }
  }
  const appTitle = 'Test-App'
  const startLogoutStub = jest.fn();
  const wrapper = shallowMount(Header, {
    mocks: {
      $store,
    },
    stubs: [
      'router-link',
      'font-awesome-icon',
    ],
    propsData: {
      appTitle,
      startLogout: startLogoutStub,
    },
  })

  it('renders Header component properly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('calls startLogout properly when logout-btn is clicked', () => {
    wrapper.find('.logout-btn').trigger('click');

    expect(startLogoutStub).toHaveBeenCalled();
  });
})
