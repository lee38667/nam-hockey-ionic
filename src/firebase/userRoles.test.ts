import { getUserRole, setUserRole } from './userRoles';
import * as firestore from 'firebase/firestore';
import { vi } from 'vitest';

vi.mock('firebase/firestore');

(firestore.getDoc as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ exists: () => true, data: () => ({ role: 'admin' }) });

describe('userRoles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns role if user document exists', async () => {
    (firestore.getDoc as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ exists: () => true, data: () => ({ role: 'Admin' }) });
    const role = await getUserRole('testuid');
    expect(role).toBe('Admin');
  });

  it('returns null if user document does not exist', async () => {
    (firestore.getDoc as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({ exists: () => false });
    const role = await getUserRole('nouser');
    expect(role).toBe('fan');
  });

  it('calls setDoc with correct arguments', async () => {
    await setUserRole('testuid', 'coach');
    expect(firestore.setDoc).toHaveBeenCalled();
  });
});
