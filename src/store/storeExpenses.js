// This state module becomes state.expenses at store-root (see ./store.js).
import Vue from 'vue';
import moment from 'moment';
import db, { arrayFromSnapshot } from '../firebase/firebase';
import EventBus from '../components/EventBus';

export default {
  state: [],

  getters: {
    filteredExpenses: (state, getters, rootState) => {
      const {text, startDate, endDate, sortBy} = rootState.filters;

      return state.filter(expense => {
        const createdAtMoment = moment(expense.createdAt);
        const textMatch = text ?
          expense.description.toLowerCase().includes(text.toLowerCase()) :
          true;
        const startDateMatch = startDate ?
          startDate.isSameOrBefore(createdAtMoment, 'day') :
          true;
        const endDateMatch = endDate ?
          endDate.isSameOrAfter(createdAtMoment, 'day') :
          true;

        return textMatch && startDateMatch && endDateMatch;
      }).sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return a.createdAt < b.createdAt ? 1 : -1;
          case 'amount':
            return a.amount < b.amount ? 1 : -1;
        }
      });
    },
    filteredCount: (state, getters) => {
      const fltrdExpenses = getters.filteredExpenses;
      return fltrdExpenses.length;
    },
    filteredSum: (state, getters) => {
      const fltrdExpenses = getters.filteredExpenses;
      const fltrdAmounts = fltrdExpenses.map(expense => expense.amount);
      const reducer = (sum, currValue) => sum + currValue;
      
      return fltrdAmounts.reduce(reducer, 0);
    },
    totalCount: (state) => {
      return state.length;
    }
  },

  mutations: {
    SET_EXPENSES (state, expenses) {
      expenses.forEach((expense) => {
        state.push(expense);
      });
    },
    ADD_EXPENSE (state, expense) {
      state.push(expense);
      EventBus.$emit('showDismissableAlert', {
        content: 'Expense Added.',
        variant: 'success',
      });
    },
    EDIT_EXPENSE (state, payload) {
      // When filtering an array, you MUST use Vue.set on the object,
      // in order to trigger state-update.
      // See Change Detection Caveats under Reactivity in Depth
      // at https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
      const { id, updates } = payload;
      state = state.map((expense) => {
        if (expense.id === id) {
          Vue.set(expense, 'createdAt', updates.createdAt);
          Vue.set(expense, 'description', updates.description);
          Vue.set(expense, 'amount', updates.amount);
          Vue.set(expense, 'note', updates.note);
          return expense;
        } else {
          return expense;
        }
      });
      EventBus.$emit('showDismissableAlert', {
        content: 'Expense Edited.',
        variant: 'success',
      });
    },
    REMOVE_EXPENSE (state, id) {
      // Use array.splice to trigger state-update.
      // See observed Mutation Methods
      // at https://vuejs.org/v2/guide/list.html#Mutation-Methods
      const idx = state.findIndex(expense => expense.id === id);
      state = state.splice(idx, 1);
      EventBus.$emit('showDismissableAlert', {
        content: 'Expense Removed.',
        variant: 'success',
      });
    },
    RESET_EXPENSES (state) {
      // Since SET_EXPENSES use array.push to trigger state-update,
      // state needs to be explicitly wiped on Logout.
      const initialStateLength = state.length;
      for (let a = 0; a < initialStateLength; a++) {
        state.pop();
      }
    },
  },

  actions: {
    setExpenses (context) {
      const uid = context.rootState.auth.user.uid;
      return db.ref(`users/${uid}/expenses`).once('value').
        then((snapshot) => {
          return context.commit('SET_EXPENSES', arrayFromSnapshot(snapshot));
        }).
        catch((err) => {
          // eslint-ignore-next-line
          console.error('ERROR: Could not read expenses data:', err);
        });
    },
    addExpense (context, expense = {}) {
      const uid = context.rootState.auth.user.uid;
      const {
        createdAt = 0,
        description = '',
        amount = 0,
        note = '',
      } = expense;
      const newExpense = { createdAt, description, amount, note };

      return db.ref(`users/${uid}/expenses`).push(newExpense).
        then((ref) => {
          return context.commit('ADD_EXPENSE', {
            id: ref.key,
            ...newExpense,
          });
        }).
        catch((err) => {
          // eslint-ignore-next-line
          console.error('ERROR: Could not create expense data:', err);
        });
    },
    editExpense (context, payload) {
      const uid = context.rootState.auth.user.uid;
      const { id, updates } = payload;

      return db.ref(`users/${uid}/expenses/${id}`).set(updates).
        then(() => {
          return context.commit('EDIT_EXPENSE', { id, updates });
        }).
        catch((err) => {
          // eslint-ignore-next-line
          console.error('ERROR: Could not update expense data:', err);
        });
    },
    removeExpense (context, id) {
      const uid = context.rootState.auth.user.uid;

      return db.ref(`users/${uid}/expenses/${id}`).remove().
        then(() => {
          return context.commit('REMOVE_EXPENSE', id);
        }).
        catch((err) => {
          // eslint-ignore-next-line
          console.error('ERROR: Could not delete expense data:', err);
        });
    },
    resetExpenses ({ commit }) {
      return commit('RESET_EXPENSES');
    },
  },
};
