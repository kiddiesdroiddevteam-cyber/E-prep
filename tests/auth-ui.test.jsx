import React from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthPage from '../pages/LoginPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const { auth, navigate } = vi.hoisted(() => ({
  auth: {
    user: null,
    loading: false,
    signUp: vi.fn(),
    signIn: vi.fn(),
    sendPasswordReset: vi.fn(),
    updatePassword: vi.fn(),
  },
  navigate: vi.fn(),
}));

vi.mock('../contexts/AuthContext', () => ({ useAuth: () => auth }));
vi.mock('@tanstack/react-router', () => ({ useNavigate: () => navigate }));
vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));

beforeEach(() => {
  vi.clearAllMocks();
  auth.user = null;
  auth.loading = false;
  auth.signUp.mockResolvedValue({ error: null, session: null });
  auth.signIn.mockResolvedValue({ error: null });
  auth.sendPasswordReset.mockResolvedValue({ error: null });
  auth.updatePassword.mockResolvedValue({ error: null });
});
afterEach(cleanup);

test('sign-up rejects invalid fields before calling Supabase', async () => {
  const user = userEvent.setup();
  render(<AuthPage />);
  await user.click(screen.getByRole('button', { name: 'Sign Up' }));
  await user.click(screen.getByRole('button', { name: 'Create Account' }));
  expect(screen.getByText('Enter at least 2 characters')).toBeTruthy();
  expect(screen.getByText('Select a category')).toBeTruthy();
  expect(auth.signUp).not.toHaveBeenCalled();
});

test('sign-up sends the category and shows the email confirmation state', async () => {
  const user = userEvent.setup();
  render(<AuthPage />);
  await user.click(screen.getByRole('button', { name: 'Sign Up' }));
  await user.type(screen.getByLabelText('Full name'), 'Ada Student');
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.type(screen.getByLabelText('Password'), 'long-enough-password');
  await user.type(screen.getByLabelText('Confirm password'), 'long-enough-password');
  await user.selectOptions(screen.getByLabelText('Category'), 'Senior_Secondary_School');
  await user.click(screen.getByRole('button', { name: 'Create Account' }));
  await waitFor(() => expect(auth.signUp).toHaveBeenCalledWith('ada@example.com', 'long-enough-password', 'Ada Student', 'Senior_Secondary_School'));
  expect(screen.getByText(/Check for a confirmation link at/)).toBeTruthy();
});

test('sign-in reports invalid credentials without redirecting', async () => {
  auth.signIn.mockResolvedValue({ error: { message: 'Invalid login credentials' } });
  const user = userEvent.setup();
  render(<AuthPage />);
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.type(screen.getByLabelText('Password'), 'wrong-password');
  const submit = screen.getAllByRole('button', { name: 'Sign In' }).find(button => button.type === 'submit');
  await user.click(submit);
  expect(await screen.findByText('Invalid email or password.')).toBeTruthy();
  expect(submit.disabled).toBe(false);
});

test('sign-in reports a network failure and lets the user retry', async () => {
  auth.signIn.mockRejectedValueOnce(new Error('offline'));
  const user = userEvent.setup();
  render(<AuthPage />);
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.type(screen.getByLabelText('Password'), 'long-enough-password');
  const submit = screen.getAllByRole('button', { name: 'Sign In' }).find(button => button.type === 'submit');
  await user.click(submit);
  expect(await screen.findByText('Could not sign in. Check your connection and try again.')).toBeTruthy();
  expect(submit.disabled).toBe(false);
});

test('forgot password sends a reset request and confirms it', async () => {
  const user = userEvent.setup();
  render(<AuthPage />);
  await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.click(screen.getByRole('button', { name: 'Send Reset Link' }));
  await waitFor(() => expect(auth.sendPasswordReset).toHaveBeenCalledWith('ada@example.com'));
  expect(screen.getByText(/password reset link to/)).toBeTruthy();
});

test('password reset requires matching passwords before updating', async () => {
  auth.user = { id: 'user-1' };
  const user = userEvent.setup();
  render(<ResetPasswordPage />);
  await user.type(screen.getByLabelText('New password'), 'long-enough-password');
  await user.type(screen.getByLabelText('Confirm new password'), 'different-password');
  await user.click(screen.getByRole('button', { name: 'Update Password' }));
  expect(screen.getByText('Passwords do not match')).toBeTruthy();
  expect(auth.updatePassword).not.toHaveBeenCalled();
  await user.clear(screen.getByLabelText('Confirm new password'));
  await user.type(screen.getByLabelText('Confirm new password'), 'long-enough-password');
  await user.click(screen.getByRole('button', { name: 'Update Password' }));
  await waitFor(() => expect(auth.updatePassword).toHaveBeenCalledWith('long-enough-password'));
  expect(navigate).toHaveBeenCalledWith({ to: '/dashboard', replace: true });
});

test('password reset page explains an invalid or expired link', () => {
  render(<ResetPasswordPage />);
  expect(screen.getByText(/This reset link is invalid or has expired/)).toBeTruthy();
  expect(auth.updatePassword).not.toHaveBeenCalled();
});
