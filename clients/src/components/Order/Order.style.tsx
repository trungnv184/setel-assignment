import styled from 'styled-components';

export const OrderContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export const OrderText = styled.div<{ bold?: boolean }>`
  flex: 1;
  font-weight: ${({ bold }) => (bold ? 700 : 300)};
  margin-top: 3px;
`;

export const TextItem = styled.div`
  width: 100%;
  margin: 12px;

  > .title {
    font-weight: bold;
    margin-right: 8px;
  }

  > .content {
    font-weight: 300;
  }
`;
