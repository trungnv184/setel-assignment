import { Message } from 'semantic-ui-react';
const ErrorMessage = () => {
  return (
    <Message>
      <Message.Header>Something Went Wrong</Message.Header>
      <Message.Content>Dear customer, our system got some trouble issues. Please try again later</Message.Content>
    </Message>
  );
};

export default ErrorMessage;
