import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon';
import Login from '@/views/Login'

describe('Login.vue', () => {
  const $store = {
    state: {
      auth: {
        user: undefined,
      },
    },
    getters: {
      userLoggedIn: state => {
        return (state.auth.user !== undefined);
      },
    },
  };
  const wrapper = shallowMount(Login, {
    mocks: {
      $store,
    },
  });
  const startLoginGoogleStub = jest.fn();
  const startLoginFacebookStub = jest.fn();
  const startLoginTwitterStub = jest.fn();
  const startLoginGithubStub = jest.fn();

  wrapper.setMethods({
    startLoginGoogle: startLoginGoogleStub,
    startLoginFacebook: startLoginFacebookStub,
    startLoginTwitter: startLoginTwitterStub,
    startLoginGithub: startLoginGithubStub,
  });

  it('renders Login view properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls startLoginGoogle properly when login-button is clicked', () => {
    wrapper.find('.login-btn.google').trigger('click');

    expect(startLoginGoogleStub).toHaveBeenCalled();
  });

  it('calls startLoginFacebook properly when login-button is clicked', () => {
    wrapper.find('.login-btn.facebook').trigger('click');

    expect(startLoginFacebookStub).toHaveBeenCalled();
  });

  it('calls startLoginTwitter properly when login-button is clicked', () => {
    wrapper.find('.login-btn.twitter').trigger('click');

    expect(startLoginTwitterStub).toHaveBeenCalled();
  });

  it('calls startLoginGithub properly when login-button is clicked', () => {
    wrapper.find('.login-btn.github').trigger('click');

    expect(startLoginGithubStub).toHaveBeenCalled();
  });
})

