import { appActions } from '../app';

describe('app action', () => {
  describe('exported actions', () => {
    it('should have a `HAS_ERROR` actions', () => {
      expect(appActions.HAS_ERROR).toBeTruthy();
    });

    it('should have a `START_LOADING` actions', () => {
      expect(appActions.START_LOADING).toBeTruthy();
    });

    it('should have a `STOP_LOADING` actions', () => {
      expect(appActions.STOP_LOADING).toBeTruthy();
    });
  });
});
