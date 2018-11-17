<template>
  <div class="login component">
    <p class="login-byline">by <a href="http://tze1.com/" title="Tze-chiu Lei's portfolio site" target="_blank">Tze-chiu Lei</a></p>
    <p class="login-instructions">Please log in [no sign-up needed]:</p>
    <div class="login-btns">
      <button class="button login-btn third-party google" @click="startLoginGoogle" title="Log in with Google">Login with Google</button>
      <button class="button login-btn third-party facebook" @click="startLoginFacebook" title="Log in with Facebook">Continue with Facebook</button>
      <button class="button login-btn third-party twitter" @click="startLoginTwitter" title="Log in with Twitter">Login with Twitter</button>
      <button class="button login-btn third-party github" @click="startLoginGithub" title="Log in with GitHub">Login with GitHub</button>
    </div>
    <p class="login-credits">This DEMO app uses <a href="https://firebase.google.com/" target="_blank">Google Firebase</a> Authentication & Databases.<br />NOTE: If testing different sign-in providers, beware that each creates a separate account.  OAuth accounts-linking is beyond the scope of this demo.</p>
    <p class="login-appinfo">See source-code and unit-tests in the <a href="https://github.com/tze1/vue-expensify" target="_blank">GitHub project</a>.</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { firebase, googleAuthProvider, facebookAuthProvider, twitterAuthProvider, githubAuthProvider } from '../firebase/firebase';

	export default {
    name: 'Login',
    computed: mapState({
      user: state => state.auth.user,
    }),
    methods: {
      startLoginGoogle: function () {
        firebase.auth().signInWithPopup(googleAuthProvider).
          catch((err) => {
            // eslint-disable-next-line
            console.error('Firebase auth error: %s', err);
          });
      },
      startLoginFacebook: function () {
        firebase.auth().signInWithPopup(facebookAuthProvider).
          catch((err) => {
            // eslint-disable-next-line
            console.error('Firebase auth error: %s', err);
          });
      },
      startLoginTwitter: function () {
        firebase.auth().signInWithPopup(twitterAuthProvider).
          catch((err) => {
            // eslint-disable-next-line
            console.error('Firebase auth error: %s', err);
          });
      },
      startLoginGithub: function () {
        firebase.auth().signInWithPopup(githubAuthProvider).
          catch((err) => {
            // eslint-disable-next-line
            console.error('Firebase auth error: %s', err);
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../styles/app.scss';

.login.component {
  .login-title {
    color: $red;
    margin-bottom: 0;
  }

  .login-byline {
    font-size: 1.2rem;
    margin-bottom: $space-sm;
    margin-top: -2.5rem;
  }

  .login-btns {
    display: flex;
    flex-flow: column nowrap;

    @include mq("tablet-wide") {
      flex-flow: row nowrap;
    }
  }

  .login-btn.third-party {
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    color: transparent;
    height: 41px;
    margin: 0 auto $space-sm;
    overflow: visible;
    padding: 0;

    @include mq("tablet-wide") {
      margin: 0 2rem 0 0;
    }

    &:last-of-type {
      margin-bottom: 0;

      @include mq("tablet-wide") {
        margin-right: 0;
      }
    }

    &:hover {
      box-shadow: 0 0 1rem 0 #c66;
    }

    &.google {
      background-image: url('/img/btn-google-login.png');
      width: 186px;
    }

    &.facebook {
      background-image: url('/img/btn-facebook-login.png');
      width: 222px;
    }

    &.twitter {
      background-image: url('/img/btn-twitter-login.png');
      width: 176px;
    }

    &.github {
      background-image: url('/img/btn-github-login.png');
      width: 176px;
    }
  }

  .login-credits,
  .login-appinfo {
    font-size: 1.4rem;
  }
}
</style>
