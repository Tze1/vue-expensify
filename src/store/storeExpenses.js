// This state module becomes state.expenses at store-root (see ./store.js).
import db, { arrayFromSnapshot } from '../firebase/firebase';

export default {
  state: [],
  mutations: {
    setExpenses (state, expenses) {
      expenses.forEach((expense) => {
        state.push(expense);
      });
    },
    addExpense (state, expense) {
      state.push(expense);
    },
    editExpense (state, id, editedExpense) {
      state = state.map((expense) => {
        if (expense.id === id) {
          return {
            ...expense,
            ...editedExpense
          };
        } else {
          return expense;
        }
      })
    },
    removeExpense (state, id) {
      state = state.filter(expense => expense.id !== id);
    }
  },
  actions: {
    setExpenses (context) {
      const uid = context.rootState.auth.user.uid;
      db.ref(`users/${uid}/expenses`).once('value').
        then((snapshot) => {
          return context.commit('setExpenses', arrayFromSnapshot(snapshot));
        }).
        catch((err) => {
          console.error('ERROR: Could not fetch expenses data:', err);
        });
    },
    addExpense ({ commit }, expense) {
      return commit('addExpense', expense);
    },
    editExpense ({ commit }, id, editedExpense) {
      return commit('editExpense', id, editedExpense);
    },
    removeExpense ({ commit }, id) {
      return commit('removeExpense', id);
    },
  },
};
