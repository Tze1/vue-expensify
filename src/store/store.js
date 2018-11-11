import Vue from 'vue'
import Vuex from 'vuex'
import storeAuth from './storeAuth';
import storeExpenses from './storeExpenses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      auth: storeAuth,
      expenses: storeExpenses,
  },
});
