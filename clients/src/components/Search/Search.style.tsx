import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledSearchWrapper = styled.div<any>`
  margin: 16px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled(Input)<{ onSearch: (e: any) => void }>`
  flex: 0.7;
`;
