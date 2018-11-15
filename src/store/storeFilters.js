import moment from 'moment';

export default {
  state: {
    text: '',
    startDate: moment().subtract(30, 'days'),
    endDate: undefined,
    sortBy: 'date',
  },

  getters: {
    expensesFiltered: state => {
      return !!state.text || !!state.startDate || !!state.endDate;
    },
  },

  mutations: {
    setFilterText (state, text) {
      state.text = text;
    },
    setFilterStartDate (state, startDate) {
      state.startDate = startDate;
    },
    setFilterEndDate (state, endDate) {
      state.endDate = endDate;
    },
    setFilterSortBy (state, sortBy) {
      state.sortBy = sortBy;
    },
  },

  actions: {
    setFilterText ({ commit }, text) {
      commit('setFilterText', text);
    },
    setFilterStartDate ({ commit }, startDate) {
      commit('setFilterStartDate', startDate);
    },
    setFilterEndDate ({ commit }, endDate) {
      commit('setFilterEndDate', endDate);
    },
    setFilterSortBy ({ commit }, sortBy) {
      commit('setFilterSortBy', sortBy);
    },
  }
};
