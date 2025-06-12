import { isPlayerAssigned } from './teamService';

describe('isPlayerAssigned', () => {
  it('returns true if player is assigned', () => {
    expect(isPlayerAssigned('1', ['1', '2', '3'])).toBe(true);
  });
  it('returns false if player is not assigned', () => {
    expect(isPlayerAssigned('4', ['1', '2', '3'])).toBe(false);
  });
});
