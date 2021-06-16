import { StyledAppContainer } from 'components';
import Header from 'components/Header/Header';
import React from 'react';
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledAppContainer>
      <Header />
      <main>{children}</main>
    </StyledAppContainer>
  );
};

export default Layout;
