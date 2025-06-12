import { renderHook } from '@testing-library/react';
import { useUserRole } from './useUserRole';

describe('useUserRole', () => {
  it('fetches and returns user role', async () => {
    const { result, rerender } = renderHook(() => useUserRole());
    // Wait for the hook to update after async effect
    await Promise.resolve();
    rerender();
    // The expected value will depend on the actual user in your Firebase Auth
    // You may want to log or assert based on your test environment
    expect(result.current.role).toBeDefined();
    expect(result.current.loading).toBe(false);
  });
});
