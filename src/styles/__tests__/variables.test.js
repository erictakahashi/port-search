import variables from '../variables';

describe('variables', () => {
  describe('exported variables', () => {
    it('should have a `lightColor`', () => {
      expect(variables.lightColor).toBeTruthy();
    });

    it('should have a `primaryColor`', () => {
      expect(variables.primaryColor).toBeTruthy();
    });
  });
});
