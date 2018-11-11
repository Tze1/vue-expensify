import Vue from 'vue'
import Vuex from 'vuex'
import storeAuth from './storeAuth';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      auth: storeAuth,
  },
});
