import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { getPorts } from '../../store/actions/ports';
import Styled from './Home.styled';

/**
 * Home container.
 */
const Home = () => {
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getPorts())
  }, [dispatch]);

  return (
    <Styled.Wrapper>
      <Styled.Navbar />
    </Styled.Wrapper>
  );
};

export default Home;
