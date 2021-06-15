import React from 'react';
import { Input } from 'semantic-ui-react';
type HeaderProps = any;
const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <Input icon="search" placeholder="Search..." />
    </header>
  );
};

export default Header;
