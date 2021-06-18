import * as yup from 'yup';

const customerValidationSchema = yup.object({
  firstName: yup.string().required('Enter First Name'),
  lastName: yup.string().required('Enter Last Name'),
  phoneNumber: yup.string().required('Enter Phone Number'),
  address: yup.string().required().max(200, 'Address not over 200 characters').required('Enter your address'),
  notes: yup.string().optional().max(300, 'Address not over than 300 characters'),
});

const validateCustomerData = (data: any) => {
  return customerValidationSchema.validateSync(data);
};

export { validateCustomerData };
