import { resetPassword } from './auth';
import * as auth from 'firebase/auth';
import { vi } from 'vitest';

vi.mock('firebase/auth');

(auth.getAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue('authInstance');
(auth.sendPasswordResetEmail as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

describe('resetPassword', () => {
  it('calls sendPasswordResetEmail with correct arguments', async () => {
    await resetPassword('test@example.com');
    expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith('authInstance', 'test@example.com');
  });
});
