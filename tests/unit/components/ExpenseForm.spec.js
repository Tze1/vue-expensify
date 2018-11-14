import { mount } from '@vue/test-utils';
import ExpenseForm from '@/components/ExpenseForm';
import testExpenses from '../../fixtures/testExpenses';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

describe('ExpenseForm.vue', () => {
  const onDateChangeStub = jest.fn();
  const onDescriptionChangeStub = jest.fn();
  const onAmountChangeStub = jest.fn();
  const onNoteChangeStub = jest.fn();
  const submitExpenseStub = jest.fn();
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
    propsData: {
      submitExpense: submitExpenseStub,
      expense: undefined,
    },
  });

  wrapper.setMethods({
    onDateChange: onDateChangeStub,
    onDescriptionChange: onDescriptionChangeStub,
    onAmountChange: onAmountChangeStub,
    onNoteChange: onNoteChangeStub,
  });

  it('renders ExpenseForm properly for add-expense', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders ExpenseForm properly for edit-expense', () => {
    wrapper.setProps({ expense: {
        ...testExpenses[0]
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders error-message on invalid submission', () => {
    wrapper.setProps({ expense: undefined });

    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').trigger('submit');

    expect(wrapper.vm.errorMessage.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls parent submitExpense properly on valid submission', () => {
    const testExpense = {...testExpenses[0]};
    console.log('testExpense:', testExpense);
    wrapper.setData({ errorMessage: '' });
    wrapper.setProps({ expense: testExpense });

    expect(wrapper).toMatchSnapshot();
    console.log('description display:', 
      wrapper.find('[name="description"]').element.value
    );

    wrapper.find('form').trigger('submit');

    expect(wrapper).toMatchSnapshot();
    expect(submitExpenseStub).toHaveBeenCalledWith(testExpense);
  });
});
