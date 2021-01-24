import styled from 'styled-components';

import NavbarComp from '../../components/Navbar/Navbar';
import Select from '../../components/Select/Select';
import mixins from '../../styles/mixins';

const Wrapper = styled.div``;

const Navbar = styled(NavbarComp)``;

const Container = styled.div`
  ${mixins.container}
`;

const Fields = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;

  ${mixins.isMobile} {
    flex-direction: column;
  }
`;

const SelectOrigin = styled(Select)``;

const SelectGap = styled.div`
  width: 30px;

  ${mixins.isMobile} {
    height: 30px;
  }
`;

const SelectDestination = styled(Select)``;

const Styled = {
  Container,
  Fields,
  Navbar,
  SelectDestination,
  SelectGap,
  SelectOrigin,
  Wrapper
};

export default Styled;
