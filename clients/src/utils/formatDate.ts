import moment from 'moment';

const formatDate = (value: string | Date, formatType: string = 'DD-MM-YYYY') => {
  return moment(value).format(formatType);
};

export { formatDate };
