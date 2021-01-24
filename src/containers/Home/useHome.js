import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPorts } from '../../store/actions/ports';

/**
 * Hook to support `Home`container.
 */
export const useHome = () => {
  const dispatch = useDispatch();

  useMemo(() => (
    dispatch(getPorts())
  ), [dispatch]);

  const ports = useSelector(({ ports }) => ports.ports);

  return {
    ports
  };
};
