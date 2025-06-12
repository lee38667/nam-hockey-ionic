import { render } from '@testing-library/react';
import { RoleGuard } from './RoleGuard';
import * as useUserRoleHook from '../hooks/useUserRole';
import { vi } from 'vitest';

vi.mock('../hooks/useUserRole');

describe('RoleGuard', () => {
  it('renders children if role is allowed', () => {
    (useUserRoleHook.useUserRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ role: 'admin', loading: false });
    const { getByText } = render(
      <RoleGuard allowedRoles={['Admin']}>
        <div>Allowed Content</div>
      </RoleGuard>
    );
    expect(getByText('Allowed Content')).toBeInTheDocument();
  });

  it('renders nothing if role is not allowed', () => {
    (useUserRoleHook.useUserRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ role: 'Player', loading: false });
    const { container } = render(
      <RoleGuard allowedRoles={['Admin']}>
        <div>Not Allowed</div>
      </RoleGuard>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
