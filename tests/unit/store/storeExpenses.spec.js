import storeExpenses from '@/store/storeExpenses';
import {
  loggedInStateAuth,
} from '../../fixtures/testStateAuth';
import testExpenses from '../../fixtures/testExpenses';
import { defaultFilters } from '../../fixtures/testFilters';
import moment from 'moment';
import db from '@/firebase/firebase';

const { getters, mutations, actions } = storeExpenses;
const defaultRootState = {
  auth: loggedInStateAuth,
  expenses: [],
};
const loadedRootState = {
  auth: loggedInStateAuth,
  expenses: testExpenses,
  filters: defaultFilters,
};
const commitStub = jest.fn();
const defaultContext = {
  rootState: defaultRootState,
  commit: commitStub,
};
// clone testExpenses and pop clone.
const myTestExpenses = testExpenses.filter((expense) => !!expense);
const myTestExpense = myTestExpenses.pop();  // for adding/editing.
// myTestExpenses now have only the 1st two expenses from original testExpenses.

// getters
describe('filteredExpenses getter', () => {
  it('returns default-filtered expenses properly', () => {
    // defaultFilters have only startDate (moment(0)).
    const received = getters.filteredExpenses(
      testExpenses,
      undefined,
      loadedRootState
    );

    expect(received).toEqual([
      testExpenses[2],
      testExpenses[0],
      testExpenses[1]
    ]);
  });

  it('returns text-filtered expenses properly', () => {
    const filters2 = {
      text: 'rent',
      startDate: undefined,
      endDate: undefined,
      sortBy: 'date',
    };
    const loadedRootState2 = {
      ...loadedRootState,
      filters: filters2,
    };

    const received = getters.filteredExpenses(
      testExpenses,
      undefined,
      loadedRootState2
    );

    expect(received).toEqual([
      testExpenses[1]
    ]);
  });

  // no need to test startDate-filtered -- already in default-filtered test above.

  it('returns endDate-filtered expenses properly', () => {
    const filters3 = {
      text: '',
      startDate: undefined,
      endDate: moment(0),
      sortBy: 'date',
    };
    const loadedRootState3 = {
      ...loadedRootState,
      filters: filters3,
    };

    const received = getters.filteredExpenses(
      testExpenses,
      undefined,
      loadedRootState3
    );

    expect(received).toEqual([
      testExpenses[0],
      testExpenses[1]
    ]);
  });

  it('returns data-range-filtered expenses properly', () => {
    const filters4 = {
      text: '',
      startDate: moment(0).subtract(3, 'days'),
      endDate: moment(0).add(3, 'days'),
      sortBy: 'date',
    };
    const loadedRootState4 = {
      ...loadedRootState,
      filters: filters4,
    };

    const received = getters.filteredExpenses(
      testExpenses,
      undefined,
      loadedRootState4
    );

    expect(received).toEqual([
      testExpenses[0]
    ]);
  });

  // No need to test sorted by date -- already in default-filtered test above.

  it('returns expenses sorted by amount properly', () => {
    const filters5 = {
      text: '',
      startDate: undefined,
      endDate: undefined,
      sortBy: 'amount',
    };
    const loadedRootState5 = {
      ...loadedRootState,
      filters: filters5,
    };

    const received = getters.filteredExpenses(
      testExpenses,
      undefined,
      loadedRootState5
    );

    expect(received).toEqual([
      testExpenses[1],
      testExpenses[2],
      testExpenses[0]
    ]);
  });
});


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
    const id = myTestExpenses[0].id;
    const updates = {
      createdAt: myTestExpenses[0].createdAt,
      description: 'new test description',
      amount: myTestExpenses[0].amount,
      note: 'new test note'
    };

    mutations.EDIT_EXPENSE(
      state,
      { id, updates }
    );

    expect(state).toEqual([
      {
        id,
        ...updates
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
    const id = myTestExpenses[0].id;
    const updates = {
      createdAt: myTestExpenses[0].createdAt,
      description: 'new test description',
      amount: myTestExpenses[0].amount,
      note: 'new test note'
    };

    await actions.editExpense(defaultContext, { id, updates });

    expect(commitStub).toHaveBeenCalledWith(
      'EDIT_EXPENSE',
      { id, updates }
    );
  });

  it('removeExpense action: commits REMOVE_EXPENSE mutation with expense id', async () => {
    const id = '2';

    await actions.removeExpense(defaultContext, id);

    expect(commitStub).toHaveBeenCalledWith('REMOVE_EXPENSE', id);
  });
});
