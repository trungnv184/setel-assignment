import { Segment, Container } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 60px);
`;

const StyledSegment = styled(Segment)`
  margin: 16px 0;
`;

const StyledContainer = styled(Container)`
  margin: 16px 0;
`;

export { StyledAppContainer, StyledSegment, StyledContainer };
