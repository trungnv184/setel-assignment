import { Table } from 'semantic-ui-react';

const CartHeader: React.FC<any> = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine={true}>Image</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default CartHeader;
