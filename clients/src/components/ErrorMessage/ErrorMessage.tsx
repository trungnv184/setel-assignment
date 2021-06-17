import { Message } from 'semantic-ui-react';
const ErrorMessage = () => {
  return (
    <Message>
      <Message.Header>Something Went Wrong</Message.Header>
      <p>Dear customer, our system got some trouble issues. Please try again later</p>
    </Message>
  );
};

export default ErrorMessage;
