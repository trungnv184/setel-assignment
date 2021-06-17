import moment from 'moment';

export const getUUID = () => {
  return moment().unix();
};

export const getCurrentDate = (format = 'DD-MM-YYYY') => {
  return moment().format(format);
};
