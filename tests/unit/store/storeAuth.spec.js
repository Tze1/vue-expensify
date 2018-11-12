import storeAuth from '@/store/storeAuth';
import {
  firebaseUser,
  stateUser,
  defaultStateAuth,
  loggedInStateAuth,
  commit
} from '../../fixtures/testStateAuth';

const { getters, mutations, actions} = storeAuth;

// console.log('firebaseUser:', firebaseUser);
// console.log('stateUser:', stateUser);
// console.log('defaultStateAuth:', defaultStateAuth);
// console.log('loggedInStateAuth:', loggedInStateAuth);

// getters
describe('userLoggedIn getter', () => {
  it('returns true if user is logged-in', () => {
    const received = getters.userLoggedIn(loggedInStateAuth);

    expect(received).toBeTruthy();
  })
});

// mutations
describe('LOGIN mutation', () => {
  it('adds user object to the state', () => {
    mutations.LOGIN(defaultStateAuth, firebaseUser);

    expect(defaultStateAuth.user).toEqual(stateUser);
  });
});

describe('LOGOUT mutation', () => {
  it('destroys user object in the state', () => {
    mutations.LOGOUT(loggedInStateAuth);

    expect(loggedInStateAuth.user).toBeUndefined();
  });
});

// actions
describe('login action', () => {
  it('commits LOGIN mutation with Firebase Auth user-object', () => {
    actions.login({ commit }, firebaseUser);

    expect(commit).toHaveBeenCalledWith('LOGIN', firebaseUser);
  });
});

describe('logout action', () => {
  it('commits LOGOUT mutation', () => {
    actions.logout({ commit });

    expect(commit).toHaveBeenCalledWith('LOGOUT');
  });
});

