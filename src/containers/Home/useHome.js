import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { computeDestination, computeOrigin, getPorts } from '../../store/actions/ports';

/**
 * Hook to support `Home`container.
 */
export const useHome = () => {
  const dispatch = useDispatch();

  useMemo(() => (
    dispatch(getPorts())
  ), [dispatch]);

  const portsState = useSelector(({ ports }) => ports);
  const {
    destinationPorts,
    originPorts,
    ports
  } = portsState;

  /**
   * Handle when destination field change:
   * Dispatch a method to compute the array of origin ports.
   */
  const handleDestinationChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(computeOrigin(value))
  }, [dispatch]);

  /**
   * Handle when origin field change:
   * Dispatch a method to compute the array of destination ports.
   */
  const handleOriginChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(computeDestination(value))
  }, [dispatch]);

  return {
    handleDestinationChange,
    handleOriginChange,
    destinationPorts,
    originPorts,
    ports
  };
};
