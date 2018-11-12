// This state module becomes state.auth at store-root (see ./store.js).
export default {
  state: {
    user: undefined
  },
  getters: {
    userLoggedIn: state => {
      return (state.user !== undefined);
    },
  },
  mutations: {
    LOGIN (state, user) {
      state.user = {
        ...state.user,
        uid: user.uid,
        displayName: user.providerData[0].displayName,
        photoURL: user.providerData[0].photoURL,
      }
    },
    LOGOUT (state) {
      state.user = undefined;
    }
  },
  actions: {
    login ({ commit }, user) {
      return commit('LOGIN', user);
    },
    logout ({ commit }) {
      return commit('LOGOUT');
    },
  },
};
