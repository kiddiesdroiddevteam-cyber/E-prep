import React from 'react';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const { authApi, navigate } = vi.hoisted(() => ({
  authApi: {
    onAuthStateChange: vi.fn(),
    getSession: vi.fn(),
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
  },
  navigate: vi.fn(),
}));

vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: authApi } }));
vi.mock('@tanstack/react-router', () => ({ useNavigate: () => navigate }));
vi.mock('sonner', () => ({ toast: { error: vi.fn(), info: vi.fn() } }));

beforeEach(() => {
  vi.clearAllMocks();
  authApi.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } });
  authApi.getSession.mockResolvedValue({ data: { session: null } });
  authApi.signUp.mockResolvedValue({ data: { session: null }, error: null });
  authApi.signOut.mockResolvedValue({ error: null });
  authApi.resetPasswordForEmail.mockResolvedValue({ error: null });
  authApi.updateUser.mockResolvedValue({ error: null });
});
afterEach(cleanup);

test('registration stores the selected category in Supabase user metadata', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  await waitFor(() => expect(result.current.loading).toBe(false));
  await act(async () => {
    await result.current.signUp('ada@example.com', 'long-enough-password', 'Ada Student', 'Senior_Secondary_School');
  });
  expect(authApi.signUp).toHaveBeenCalledWith({
    email: 'ada@example.com',
    password: 'long-enough-password',
    options: {
      emailRedirectTo: `${window.location.origin}/auth`,
      data: { full_name: 'Ada Student', category: 'Senior_Secondary_School' },
    },
  });
  expect(navigate).not.toHaveBeenCalled();
});

test('password reset email returns to the new-password page', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  await waitFor(() => expect(result.current.loading).toBe(false));
  await act(async () => { await result.current.sendPasswordReset('ada@example.com'); });
  expect(authApi.resetPasswordForEmail).toHaveBeenCalledWith('ada@example.com', {
    redirectTo: `${window.location.origin}/reset-password`,
  });
});

test('sign-out navigates only when Supabase confirms it', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  await waitFor(() => expect(result.current.loading).toBe(false));
  authApi.signOut.mockResolvedValueOnce({ error: { message: 'Network error' } });
  await act(async () => { await result.current.signOut(); });
  expect(navigate).not.toHaveBeenCalled();
  await act(async () => { await result.current.signOut(); });
  expect(navigate).toHaveBeenCalledWith({ to: '/' });
});

test('a stale session lookup cannot replace a newer sign-in event', async () => {
  let resolveInitialSession;
  let authListener;
  authApi.getSession.mockReturnValue(new Promise(resolve => { resolveInitialSession = resolve; }));
  authApi.onAuthStateChange.mockImplementation(listener => {
    authListener = listener;
    return { data: { subscription: { unsubscribe: vi.fn() } } };
  });
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
  act(() => authListener('SIGNED_IN', { user: { id: 'new-user' } }));
  expect(result.current.user.id).toBe('new-user');
  await act(async () => resolveInitialSession({ data: { session: null } }));
  expect(result.current.user.id).toBe('new-user');
});
