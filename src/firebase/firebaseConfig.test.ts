import { requestFCMPermission, subscribeToNotifications } from './firebaseConfig';
import { vi } from 'vitest';

describe('firebaseConfig FCM', () => {
  it('requestFCMPermission returns token', async () => {
    vi.mock('firebase/messaging', () => ({
      getMessaging: vi.fn(),
      getToken: vi.fn(() => Promise.resolve('token123')),
    }));
    const token = await requestFCMPermission();
    expect(token).toBe('token123');
  });

  it('subscribeToNotifications calls onMessage', () => {
    const onMessageMock = vi.fn();
    vi.mock('firebase/messaging', () => ({
      getMessaging: vi.fn(),
      onMessage: vi.fn((_, cb) => cb({ notification: 'test' })),
    }));
    subscribeToNotifications(onMessageMock);
    expect(onMessageMock).toHaveBeenCalledWith({ notification: 'test' });
  });
});
