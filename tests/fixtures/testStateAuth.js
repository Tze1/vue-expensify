const testUid = 'abc123!';
const testDisplayName = 'Test User';
const testPhotoURL = '/img/avatar-default.png';
export const firebaseUser = {
  uid: testUid,
  providerData: [{
    displayName: testDisplayName,
    photoURL: testPhotoURL,
  }],
};
export const stateUser = {
  uid: testUid,
  displayName: testDisplayName,
  photoURL: testPhotoURL,
};
export const defaultStateAuth = {
  user: undefined,
};
export const loggedInStateAuth = {
  user: {
    uid: testUid,
    displayName: testDisplayName,
    photoURL: testPhotoURL,
  },
};
export const commit = jest.fn();
