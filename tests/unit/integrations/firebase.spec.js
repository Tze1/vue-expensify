/* IMPORTANT: This test-suite, and any other suite testing Firebase,
* WILL FAIL unless you have:
* 1. Set up your Firebase test & development projects/databases; and
* 2. Created .env.test & .env.development files to store the apps' configurations.
*/

/* As you build up your webapp, you should also test your store's
* mutations & actions, not just test Firebase directly.
* You can keep this test-suite, and add mutations.spec.js, actions.spec.js, etc.
*/

import db, { arrayFromSnapshot } from '../../../src/firebase/firebase'
import testExpenses from '../../fixtures/testExpenses';

const testUid = 'testAbc123';

beforeEach(() => {
  // Set up test data before each test.
  const expensesData = {};
  testExpenses.forEach(({ id, createdAt, description, amount, note }) => {
    expensesData[id] = { createdAt, description, amount, note };
  });

  return db.ref(`users/${testUid}/expenses`).set(expensesData);
});

afterAll(() => {
  // Clear the test data after all tests are done.
  return db.ref(`users/${testUid}/expenses`).remove().
    then(function () {
      // Log message about --forceExit jest option.
      console.log('[afterAll] All tests completed.  --forceExit used to work around Firebase promise issue.');
    }).
    catch(function (err) {
      console.error(err);
    });
});

test('Should fetch db expenses correctly', async () => {
  expect.assertions(1);

  const snapshot = await db.ref(`users/${testUid}/expenses`).once('value');
  const fetchedExpenses = arrayFromSnapshot(snapshot);
  expect(fetchedExpenses).toEqual(testExpenses);
});
