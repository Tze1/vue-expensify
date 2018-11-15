import Vue from 'vue'
import Vuex from 'vuex'
import storeAuth from './storeAuth';
import storeFilters from './storeFilters';
import storeExpenses from './storeExpenses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: storeAuth,
    filters: storeFilters,
    expenses: storeExpenses,
  },
});
