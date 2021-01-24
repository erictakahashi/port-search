import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPorts, getRates, selectDestination, selectOrigin } from '../../store/actions/ports';

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
    selectedDestination,
    selectedOrigin
  } = portsState;

  useMemo(() => (
    dispatch(getRates(selectedOrigin, selectedDestination))
  ), [dispatch, selectedDestination, selectedOrigin]);

  /**
   * Handle when destination field change.
   */
  const handleDestinationChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(selectDestination(value));
  }, [dispatch]);

  /**
   * Handle when origin field change.
   */
  const handleOriginChange = useCallback((e) => {
    const value = e.target.value;
    dispatch(selectOrigin(value));
  }, [dispatch]);

  return {
    handleDestinationChange,
    handleOriginChange,
    destinationPorts,
    originPorts,
    selectedDestination,
    selectedOrigin
  };
};
