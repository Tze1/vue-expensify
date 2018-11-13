// This state module becomes state.expenses at store-root (see ./store.js).
import moment from 'moment';
import db, { arrayFromSnapshot } from '../firebase/firebase';
import Vue from 'vue';

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
  },

  mutations: {
    SET_EXPENSES (state, expenses) {
      expenses.forEach((expense) => {
        state.push(expense);
      });
    },
    ADD_EXPENSE (state, expense) {
      state.push(expense);
    },
    EDIT_EXPENSE (state, payload) {
      // When filtering an array, you MUST use Vue.set on the object,
      // in order to trigger state-update.
      // See Change Detection Caveats under Reactivity in Depth
      // at https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
      const { editedExpenseId, editedExpense } = payload;
      state = state.map((expense) => {
        if (expense.id === editedExpenseId) {
          Vue.set(expense, 'createdAt', editedExpense.createdAt);
          Vue.set(expense, 'description', editedExpense.description);
          Vue.set(expense, 'amount', editedExpense.amount);
          Vue.set(expense, 'note', editedExpense.note);
          return expense;
        } else {
          return expense;
        }
      });
    },
    REMOVE_EXPENSE (state, id) {
      // Use array.splice to trigger state-update.
      // See observed Mutation Methods
      // at https://vuejs.org/v2/guide/list.html#Mutation-Methods
      const idx = state.findIndex(expense => expense.id === id);
      state = state.splice(idx, 1);
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
          console.error('ERROR: Could not create expense data:', err);
        });
    },
    editExpense (context, editedExpenseId, editedExpense) {
      const uid = context.rootState.auth.user.uid;

      return db.ref(`users/${uid}/expenses/${editedExpenseId}`).set(editedExpense).
        then(() => {
          return context.commit('EDIT_EXPENSE', {editedExpenseId, editedExpense});
        }).
        catch((err) => {
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
          console.error('ERROR: Could not delete expense data:', err);
        });
    },
  },
};
