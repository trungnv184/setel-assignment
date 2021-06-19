import { useMutation } from '@apollo/client';
import { CREATE_ORDER_PRODUCTS } from 'graphql/mutation';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Segment, Form, Input, TextArea, Message } from 'semantic-ui-react';
import { ProductCart } from 'types/product-cart';
import { buildOrderPayload, validateCustomerData } from 'utils';

type OrderFormProps = {
  carts: ProductCart[];
};
const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  notes: '',
};

const OrderForm: React.FC<OrderFormProps> = ({ carts }) => {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  const [createOrder, { data, loading }] = useMutation(CREATE_ORDER_PRODUCTS, {
    onCompleted: ({ createOrder: order }) => {
      history.push(`/order-detail/${order.id}`);
    },
  });

  const handleChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as any;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const orderInformation = await validateCustomerData(formState);
      if (errorMessage) {
        setErrorMessage(undefined);
      }

      createOrder({
        variables: {
          orderInput: buildOrderPayload(orderInformation, carts, formState.notes),
        },
      });
    } catch (error) {
      setErrorMessage(error?.message);
    }
  };

  return (
    <Segment secondary={true} loading={loading}>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Message error={true} header="Form Validation" content={errorMessage} />
        <Form.Group widths="equal">
          <Form.Field
            onChange={handleChangeValue}
            control={Input}
            value={formState.firstName}
            name="firstName"
            label="First name"
            placeholder="First name"
          />
          <Form.Field
            onChange={handleChangeValue}
            control={Input}
            value={formState.lastName}
            name="lastName"
            label="Last name"
            placeholder="Last name"
          />
          <Form.Field
            onChange={handleChangeValue}
            control={Input}
            value={formState.phoneNumber}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter Phone Number"
          />
        </Form.Group>
        <Form.Field
          onChange={handleChangeValue}
          control={Input}
          name="address"
          value={formState.address}
          label="Address"
          placeholder="Enter your address to deliver"
        />
        <Form.Field
          onChange={handleChangeValue}
          control={TextArea}
          value={formState.notes}
          name="notes"
          label="Notes"
          placeholder="Add your special notes"
        />
        <Form.Button color="blue">Submit</Form.Button>
      </Form>
    </Segment>
  );
};

//   customerName: string;
//   address: string;
//   phoneNumber: string;
//   payMethod: PayMethod;

export default OrderForm;
