import styled from 'styled-components';

import mixins from '../../styles/mixins';
import variables from '../../styles/variables';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${variables.primaryColor};
`;

const Container = styled.div`
  ${mixins.container}
`;

const Title = styled.h1`
  margin: 0;
  color: ${variables.lightColor};
`;

const Styled = {
  Container,
  Title,
  Wrapper
};

export default Styled;
