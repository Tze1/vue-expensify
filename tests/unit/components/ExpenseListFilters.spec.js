import { mount } from '@vue/test-utils';
import ExpenseListFilters from '@/components/ExpenseListFilters';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import { defaultFilters, altFilters } from '../../fixtures/testFilters';

describe('ExpenseListFilters.vue', () => {
  const onTextInputStub = jest.fn();
  const onStartDateChangeStub = jest.fn();
  const onEndDateChangeStub = jest.fn();
  const onSortByChangeStub = jest.fn();
  const wrapper = mount(ExpenseListFilters, {
    propsData: {
      filters: defaultFilters,
    },
  });
  wrapper.setMethods({
    onTextInput: onTextInputStub,
    onStartDateChange: onStartDateChangeStub,
    onEndDateChange: onEndDateChangeStub,
    onSortByChange: onSortByChangeStub,
  });

  it('renders ExpenseListFilters component properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders ExpenseListFilters component properly with altered filters', () => {
    wrapper.setProps({ filters: altFilters });

    expect(wrapper).toMatchSnapshot();
  });

  it('calls onTextInput correctly on text input', () => {
    const testText = 'a';
    const textInput = wrapper.find('input[name="text"]');

    textInput.setValue(testText);

    // expect(onTextInputStub).toHaveBeenCalled();
    expect(onTextInputStub).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: testText })
      })
    );
  });

  it('calls onStartDateChange correctly on datepicker selection', () => {
    const testDate = new Date('2018-10-01');
    const startDatepicker = wrapper.find(Datepicker);

    startDatepicker.vm.$emit('selected', testDate);

    expect(onStartDateChangeStub).toHaveBeenCalledWith(testDate);
  });

  it('calls onStartDateChange correctly on datepicker clear', () => {
    const startDatepicker = wrapper.find(Datepicker);

    startDatepicker.vm.$emit('cleared', null);

    expect(onStartDateChangeStub).toHaveBeenCalledWith(null);
  });

  it('calls onEndDateChange correctly on datepicker selection', () => {
    const testDate = new Date('2018-11-01');
    const endDatepicker = wrapper.findAll(Datepicker).at(1);

    endDatepicker.vm.$emit('selected', testDate);

    expect(onEndDateChangeStub).toHaveBeenCalledWith(testDate);
  });

  it('calls onEndDateChange correctly on datepicker clear', () => {
    const endDatepicker = wrapper.findAll(Datepicker).at(1);

    endDatepicker.vm.$emit('cleared', null);

    expect(onEndDateChangeStub).toHaveBeenCalledWith(null);
  });

  it('calls onSortByChange correctly on sort-by select change', () => {
    const testSortBy = 'amount';
    const sortSelect = wrapper.find('select[name="sortBy"]');

    sortSelect.setValue(testSortBy);

    expect(onSortByChangeStub).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: testSortBy })
      })
    );
  });
});
