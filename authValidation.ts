import { z } from 'zod';

const email = z.email('Enter a valid email address');
const password = z.string().min(8, 'Use at least 8 characters');

export const signInSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password'),
});

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter at least 2 characters'),
  email,
  password,
  confirmPassword: z.string().min(1, 'Confirm your password'),
  category: z.string().min(1, 'Select a category'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const resetRequestSchema = z.object({ email });

export const newPasswordSchema = z.object({
  password,
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form');
    result[field] ??= issue.message;
  }
  return result;
}
