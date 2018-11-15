import moment from 'moment';

const defaultFilters = {
  text: '',
  sortBy: 'date',
  startDate: moment(0).subtract(30, 'days'),
  endDate: undefined
};

const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { defaultFilters, altFilters };
