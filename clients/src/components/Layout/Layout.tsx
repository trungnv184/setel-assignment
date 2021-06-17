import { StyledAppContainer } from 'components';
import Header from 'components/Header/Header';
import React from 'react';
type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledAppContainer>{children}</StyledAppContainer>
    </>
  );
};

export default Layout;
