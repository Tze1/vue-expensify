// This state module becomes state.auth at store-root (see ./store.js).
export default {
  state: {
    user: undefined
    // user: {
    //   displayName: 'Tze Lei',
    //   photoURL: '/img/avatar-default.png'
    // }
  },
  getters: {
    userLoggedIn: state => {
      return (state.user !== undefined);
    },
  },
  mutations: {
    login (state, user) {
      state.user = {
        ...state.user,
        uid: user.uid,
        displayName: user.providerData[0].displayName,
        photoURL: user.providerData[0].photoURL,
      }
    },
    logout (state) {
      state.user = undefined;
    }
  },
  actions: {
    login ({ commit }, user) {
      return commit('login', user);
    },
    logout ({ commit }) {
      return commit('logout');
    },
  },
};
