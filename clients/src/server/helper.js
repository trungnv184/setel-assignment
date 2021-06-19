import moment from 'moment';

export const getUUID = () => {
  return moment().unix();
};

export const getCurrentDate = (format = 'DD-MM-YYYY') => {
  return moment().format(format);
};

export const mapResponseDataForOrder = (response) => {
  return {
    id: response._id,
    orderItems: response.orderItems,
    metadata: response.metadata,
    notes: response.notes,
    state: response.state,
    createdDate: response.createdDate,
    updatedDate: response.updatedDate,
  };
};
