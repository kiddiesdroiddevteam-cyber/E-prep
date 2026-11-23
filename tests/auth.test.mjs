import test from 'node:test';
import assert from 'node:assert/strict';
import { fieldErrors, newPasswordSchema, resetRequestSchema, signInSchema, signUpSchema } from '../authValidation.ts';
import { safeAuthRedirect } from '../authRedirect.ts';

const validSignUp = {
  fullName: 'Ada Student',
  email: 'ada@example.com',
  password: 'long-enough-password',
  confirmPassword: 'long-enough-password',
  category: 'Senior_Secondary_School',
};

test('sign-up accepts a complete student profile and trims the name', () => {
  const result = signUpSchema.safeParse({ ...validSignUp, fullName: '  Ada Student  ' });
  assert.equal(result.success, true);
  assert.equal(result.data.fullName, 'Ada Student');
  assert.equal(result.data.category, 'Senior_Secondary_School');
});

test('sign-up reports invalid email, weak password, missing category and mismatched confirmation', () => {
  const result = signUpSchema.safeParse({
    ...validSignUp,
    email: 'wrong',
    password: '1234567',
    confirmPassword: 'different',
    category: '',
  });
  assert.equal(result.success, false);
  const errors = fieldErrors(result.error);
  assert.ok(errors.email);
  assert.ok(errors.password);
  assert.ok(errors.category);

  const mismatch = signUpSchema.safeParse({ ...validSignUp, confirmPassword: 'another-password' });
  assert.equal(fieldErrors(mismatch.error).confirmPassword, 'Passwords do not match');
});

test('sign-in requires credentials and reset requires a valid email', () => {
  assert.ok(fieldErrors(signInSchema.safeParse({ email: '', password: '' }).error).email);
  assert.ok(fieldErrors(signInSchema.safeParse({ email: 'ada@example.com', password: '' }).error).password);
  assert.ok(fieldErrors(resetRequestSchema.safeParse({ email: 'bad-email' }).error).email);
});

test('new password requires enough characters and confirmation', () => {
  assert.ok(fieldErrors(newPasswordSchema.safeParse({ password: 'short', confirmPassword: 'short' }).error).password);
  assert.equal(fieldErrors(newPasswordSchema.safeParse({ password: 'long-enough', confirmPassword: 'different' }).error).confirmPassword, 'Passwords do not match');
});

test('post-login redirect stays on an allowed page and keeps quiz history search', () => {
  const origin = 'https://iwanpass.example';
  assert.equal(safeAuthRedirect('/quiz?quizId=123', origin), '/quiz?quizId=123');
  assert.equal(safeAuthRedirect('/settings', origin), '/settings');
  assert.equal(safeAuthRedirect('https://attacker.example', origin), '/dashboard');
  assert.equal(safeAuthRedirect('//attacker.example', origin), '/dashboard');
  assert.equal(safeAuthRedirect('/unknown', origin), '/dashboard');
});
