import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { fieldErrors, newPasswordSchema } from '../authValidation';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ResetPasswordPage: React.FC = () => {
  const { user, loading, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = newPasswordSchema.safeParse({ password, confirmPassword });
    if (!parsed.success) { setErrors(fieldErrors(parsed.error)); return; }
    setErrors({});
    setFormError('');
    setIsSubmitting(true);
    try {
      const { error } = await updatePassword(parsed.data.password);
      if (error) setFormError(error.message);
      else {
        toast.success('Your password has been updated.');
        navigate({ to: '/dashboard', replace: true });
      }
    } catch {
      setFormError('Could not update your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#02000D] p-4">
      <Card className="w-full max-w-md space-y-5 bg-[#35333D]/50 p-8 text-white">
        <h1 className="text-3xl font-bold">Set a new password</h1>
        {loading ? <p>Checking your reset link...</p> : !user ? (
          <div className="space-y-4">
            <p>This reset link is invalid or has expired. Request a new link from the sign-in page.</p>
            <Button type="button" onClick={() => navigate({ to: '/auth' })}>Go to Sign In</Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-5">
            {formError && <p role="alert" className="rounded-md border border-red-400 p-3 text-sm text-red-200">{formError}</p>}
            <div>
              <label htmlFor="new-password" className="mb-1 block text-sm font-medium">New password</label>
              <div className="relative">
                <input id="new-password" type={visible ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={event => { setPassword(event.target.value); setErrors(previous => ({ ...previous, password: '' })); }} disabled={isSubmitting} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'new-password-error' : undefined} className="w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-[#0055FF]" />
                <button type="button" onClick={() => setVisible(value => !value)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} className="absolute inset-y-0 right-3 text-sm text-blue-300">{visible ? 'Hide' : 'Show'}</button>
              </div>
              {errors.password && <p id="new-password-error" role="alert" className="mt-1 text-sm text-red-300">{errors.password}</p>}
              <p className="mt-1 text-xs text-gray-300">Use at least 8 characters.</p>
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="mb-1 block text-sm font-medium">Confirm new password</label>
              <input id="confirm-new-password" type={visible ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={event => { setConfirmPassword(event.target.value); setErrors(previous => ({ ...previous, confirmPassword: '' })); }} disabled={isSubmitting} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-new-password-error' : undefined} className="w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0055FF]" />
              {errors.confirmPassword && <p id="confirm-new-password-error" role="alert" className="mt-1 text-sm text-red-300">{errors.confirmPassword}</p>}
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>Update Password</Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
