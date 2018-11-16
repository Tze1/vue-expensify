<template>
  <div id="app">
    <div class="container">
      <Header :appTitle="appTitle" :startLogout="startLogout"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import * as firebase from 'firebase';
import 'firebase/auth';

export default {
  name: 'App',
  data () {
    return {
      appTitle: 'Vue-Expensify'
    }
  },
  computed: mapState({
    userLoggedIn () {
      return this.$store.getters.userLoggedIn;
    },
    user: state => state.auth.user,
  }),
  created () {
    const vm = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        vm.$store.dispatch('login', user);
        vm.$store.dispatch('setExpenses').
          then(() => {
            if (vm.$route.query.redirect) {
              vm.$router.push(vm.$route.query.redirect);
            } else if (vm.$route.name === 'Login') {
              vm.$router.push('/dashboard');
            }
          });
      } else {
        const currRoute = vm.$router.currentRoute;
        if (currRoute !== 'Login' &&
          currRoute.meta.requiresAuth) {
          vm.$router.replace({
            name: 'Login',
            query: { redirect: vm.$route.fullPath }
          });
        }
      }
    });
  },
  mounted () {
    // All secure routes must be defined in router.js with
    // meta { requiresAuth: true }
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!this.user) {
          alert('Sorry!  The resource you requested is secure.  Please log in first.');
          next({
            path: '/',
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      } else {
        // redirect Login view to Home if user's logged-in.
        if (to.name === 'Login' && this.user) {
          next('/dashboard');
        } else {
          next();
        }
      }
    });
  },
  methods: {
    startLogout () {
      firebase.auth().signOut();
      this.$store.dispatch('logout').
        then(() => {
          this.$store.dispatch('resetExpenses');
          this.$router.push('/');
        });
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import './styles/app.scss';
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  .container {
    padding: 0 $space-lg $space-lg;

    @include mq("tablet-wide") {
      margin-left: auto;
      margin-right: auto;
      max-width: 980px;
    }
  }
}
</style>
