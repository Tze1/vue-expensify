import storeExpenses from '@/store/storeExpenses';
import {
  loggedInStateAuth,
} from '../../fixtures/testStateAuth';
import testExpenses from '../../fixtures/testExpenses';
import db from '@/firebase/firebase';

const { mutations, actions } = storeExpenses;
const defaultRootState = {
  auth: loggedInStateAuth,
  expenses: [],
};
const commitStub = jest.fn();
const defaultContext = {
  rootState: defaultRootState,
  commit: commitStub,
};
const myTestExpenses = testExpenses.filter((expense) => !!expense);
const myTestExpense = myTestExpenses.pop();  // for adding/editing.
// myTestExpenses now have only the 1st two expenses from original testExpenses.

// mutations
describe('SET_EXPENSES mutation', () => {
  it('adds expenses to the state', () => {
    let state = [];
    mutations.SET_EXPENSES(state, myTestExpenses);

    expect(state).toEqual(myTestExpenses);
  });
});

describe('ADD_EXPENSE mutation', () => {
  it('adds new expense to the state', () => {
    let state = [];
    mutations.ADD_EXPENSE(state, myTestExpense);

    expect(state).toEqual([myTestExpense]);
  });
});

describe('EDIT_EXPENSE mutation', () => {
  it('edits existing expense in the state', () => {
    let state = [{ ...myTestExpenses[0] }];
    const editedExpenseId = myTestExpenses[0].id;
    const editedExpense = {
      createdAt: myTestExpenses[0].createdAt,
      description: 'new test description',
      amount: myTestExpenses[0].amount,
      note: 'new test note'
    };

    mutations.EDIT_EXPENSE(
      state,
      { editedExpenseId, editedExpense }
    );

    expect(state).toEqual([
      {
        id: editedExpenseId,
        ...editedExpense
      }
    ]);
  });
});

describe('REMOVE_EXPENSE mutation', () => {
    let state = [ ...myTestExpenses ];
    const id = myTestExpenses[1].id;

    mutations.REMOVE_EXPENSE(state, id);

    expect(state).toEqual([myTestExpenses[0]]);
});

// actions
describe('expenses actions', () => {
  beforeEach(() => {
    // Set up test data before each test.
    const expensesData = {};
    myTestExpenses.forEach(({ id, createdAt, description, amount, note }) => {
      expensesData[id] = { createdAt, description, amount, note };
    });

    return db.ref(`users/${defaultRootState.auth.user.uid}/expenses`).set(expensesData);
  });

  afterAll(() => {
    // Clear test data after all tests complete.
    return db.ref(`users/${defaultRootState.auth.user.uid}/expenses`).remove();
  });

  it('setExpenses action: commits SET_EXPENSES mutation with retrieved expenses', async () => {
    await actions.setExpenses(defaultContext);

    expect(commitStub).toHaveBeenCalledWith('SET_EXPENSES', myTestExpenses);
  });

  it('addExpense action: commits ADD_EXPENSE mutation with new expense', async () => {
    const newExpense = {
      createdAt: myTestExpense.createdAt,
      description: myTestExpense.description,
      amount: myTestExpense.amount,
      note: myTestExpense.note,
    };

    await actions.addExpense(defaultContext, newExpense);

    expect(commitStub).toHaveBeenCalledWith(
      'ADD_EXPENSE',
      {
        id: expect.any(String),
        ...newExpense
      }
    );
  });

  it('editExpense action: commits EDIT_EXPENSE mutation with edited expense', async () => {
    const editedExpenseId = myTestExpenses[0].id;
    const editedExpense = {
      createdAt: myTestExpenses[0].createdAt,
      description: 'new test description',
      amount: myTestExpenses[0].amount,
      note: 'new test note'
    };

    await actions.editExpense(defaultContext, editedExpenseId, editedExpense);

    expect(commitStub).toHaveBeenCalledWith(
      'EDIT_EXPENSE',
      { editedExpenseId, editedExpense }
    );
  });

  it('removeExpense action: commits REMOVE_EXPENSE mutation with expense id', async () => {
    const id = '2';

    await actions.removeExpense(defaultContext, id);

    expect(commitStub).toHaveBeenCalledWith('REMOVE_EXPENSE', id);
  });
});
