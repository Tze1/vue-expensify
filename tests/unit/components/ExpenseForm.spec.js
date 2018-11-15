import { mount } from '@vue/test-utils';
import ExpenseForm from '@/components/ExpenseForm';
import testExpenses from '../../fixtures/testExpenses';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

describe('ExpenseForm.vue', () => {
  const onDateChangeStub = jest.fn();
  const submitExpenseStub = jest.fn();
  const addExpensePropsData = {
    submitExpense: submitExpenseStub,
    expense: undefined,
  };
  const testExpense = { ...testExpenses[2] };
  const editExpensePropsData = {
    submitExpense: submitExpenseStub,
    expense: { ...testExpense },
  };
  const wrapperMethods = {
    onDateChange: onDateChangeStub,
  };

  it('renders ExpenseForm properly for add-expense', () => {
    const wrapper = mount(ExpenseForm, {
      data () {
        return {
          date: moment().toDate(),
          description: '',
          amount: '',
          note: '',
          errorMessage: '',
        }
      },
      propsData: addExpensePropsData,
    });

    wrapper.setMethods(wrapperMethods);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders ExpenseForm properly for edit-expense', () => {
    const wrapper = mount(ExpenseForm, {
      data () {
        return {
          date: moment().toDate(),
          description: '',
          amount: '',
          note: '',
          errorMessage: '',
        }
      },
      propsData: editExpensePropsData,
    });

    wrapper.setMethods(wrapperMethods);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().expense.description).toEqual(testExpense.description);
  });

  it('renders error-message on invalid submission', () => {
    const wrapper = mount(ExpenseForm, {
      data () {
        return {
          date: moment().toDate(),
          description: '',
          amount: '',
          note: '',
          errorMessage: '',
        }
      },
      propsData: addExpensePropsData,
    });

    wrapper.setMethods(wrapperMethods);

    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').trigger('submit');

    expect(wrapper.vm.errorMessage.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls parent submitExpense properly on valid submission', () => {
    const wrapper = mount(ExpenseForm, {
      data () {
        return {
          date: moment(testExpense.createdAt).toDate(),
          description: testExpense.description,
          amount: (testExpense.amount / 100).toString(),
          note: testExpense.note,
          errorMessage: '',
        }
      },
      propsData: editExpensePropsData,
    });

    wrapper.setMethods(wrapperMethods);

    expect(wrapper).toMatchSnapshot();
    
    wrapper.find('form').trigger('submit');

    expect(submitExpenseStub).toHaveBeenCalledWith({
      createdAt: testExpense.createdAt,
      description: testExpense.description,
      amount: testExpense.amount,
      note: testExpense.note,
    });
  });
});
