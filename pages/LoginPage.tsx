import React, { useCallback, useEffect, useRef, useState } from 'react';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useAuth } from '../contexts/AuthContext';
import { fieldErrors, resetRequestSchema, signInSchema, signUpSchema } from '../authValidation';
import { safeAuthRedirect } from '../authRedirect';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

type AuthView = 'signin' | 'signup' | 'forgot' | 'check-email' | 'reset-sent';
type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'email' | 'password';
  autoComplete?: string;
  disabled?: boolean;
};

function TextField({ id, label, value, onChange, error, type = 'text', autoComplete, disabled }: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-200">{label}</label>
      <div className="relative">
        <input
          id={id} name={id} type={isPassword && visible ? 'text' : type} value={value}
          onChange={event => onChange(event.target.value)} autoComplete={autoComplete}
          disabled={disabled} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
          className="block w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 pr-16 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0055FF] disabled:opacity-60"
        />
        {isPassword && <button type="button" onClick={() => setVisible(value => !value)} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} aria-pressed={visible} className="absolute inset-y-0 right-3 text-sm text-blue-300 hover:text-white">{visible ? 'Hide' : 'Show'}</button>}
      </div>
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}

const AuthPage: React.FC = () => {
  const [view, setView] = useState<AuthView>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const isRedirecting = useRef(false);
  const { signUp, signIn, sendPasswordReset, user, loading } = useAuth();

  const goToDestination = useCallback(() => {
    if (isRedirecting.current) return;
    isRedirecting.current = true;
    const requested = new URLSearchParams(window.location.search).get('redirect');
    window.location.replace(safeAuthRedirect(requested, window.location.origin));
  }, []);

  useEffect(() => {
    if (!loading && user) goToDestination();
  }, [loading, user, goToDestination]);

  const switchView = (next: AuthView) => {
    setView(next);
    setErrors({});
    setFormError('');
    setPassword('');
    setConfirmPassword('');
  };

  const updateField = (field: string, value: string, setter: (value: string) => void) => {
    setter(value);
    setErrors(previous => ({ ...previous, [field]: '' }));
    setFormError('');
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = signInSchema.safeParse({ email, password });
    if (!parsed.success) { setErrors(fieldErrors(parsed.error)); return; }
    setIsLoading(true);
    setErrors({});
    setFormError('');
    try {
      const { error } = await signIn(parsed.data.email, parsed.data.password);
      if (error) setFormError(error.message.toLowerCase().includes('invalid login') ? 'Invalid email or password.' : error.message);
    } catch {
      setFormError('Could not sign in. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = signUpSchema.safeParse({ fullName, email, password, confirmPassword, category });
    if (!parsed.success) { setErrors(fieldErrors(parsed.error)); return; }
    setIsLoading(true);
    setErrors({});
    setFormError('');
    try {
      const { error, session } = await signUp(parsed.data.email, parsed.data.password, parsed.data.fullName, parsed.data.category);
      if (error) setFormError(error.message);
      else if (session) goToDestination();
      else {
        setPassword('');
        setConfirmPassword('');
        setView('check-email');
      }
    } catch {
      setFormError('Could not create your account. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = resetRequestSchema.safeParse({ email });
    if (!parsed.success) { setErrors(fieldErrors(parsed.error)); return; }
    setIsLoading(true);
    setErrors({});
    setFormError('');
    try {
      const { error } = await sendPasswordReset(parsed.data.email);
      if (error) setFormError(error.message);
      else setView('reset-sent');
    } catch {
      setFormError('Could not send the reset link. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#02000D] p-4">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0055FF]/10 to-[#0055FF]/10" />
      <Card className="relative z-10 w-full max-w-md space-y-6 bg-[#35333D]/50 p-8">
        <div className="text-center">
          <div className="mx-auto my-3 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#0055FF]"><SchoolOutlinedIcon fontSize="large" className="text-white" /></div>
          <h1 className="text-3xl font-bold text-[#5B91FF]">iWanPass</h1>
          <p className="mt-2 text-sm text-gray-200">
            {view === 'signin' && 'Sign in to continue studying'}
            {view === 'signup' && 'Create your student account'}
            {view === 'forgot' && 'Reset your password'}
            {(view === 'check-email' || view === 'reset-sent') && 'Check your email'}
          </p>
        </div>

        {(view === 'signin' || view === 'signup') && <div className="flex justify-center" role="group" aria-label="Account access">
          <button type="button" aria-pressed={view === 'signin'} onClick={() => switchView('signin')} disabled={isLoading} className={`rounded-l-md px-4 py-2 text-sm font-medium ${view === 'signin' ? 'bg-[#0055FF] text-white' : 'bg-white text-[#003BB5]'}`}>Sign In</button>
          <button type="button" aria-pressed={view === 'signup'} onClick={() => switchView('signup')} disabled={isLoading} className={`rounded-r-md px-4 py-2 text-sm font-medium ${view === 'signup' ? 'bg-[#0055FF] text-white' : 'bg-white text-[#003BB5]'}`}>Sign Up</button>
        </div>}

        {formError && <p role="alert" className="rounded-md border border-red-400 bg-red-950/40 p-3 text-sm text-red-200">{formError}</p>}

        {view === 'signin' && <form noValidate onSubmit={handleSignIn} className="space-y-5">
          <TextField id="signin-email" label="Email" type="email" autoComplete="email" value={email} onChange={value => updateField('email', value, setEmail)} error={errors.email} disabled={isLoading} />
          <TextField id="signin-password" label="Password" type="password" autoComplete="current-password" value={password} onChange={value => updateField('password', value, setPassword)} error={errors.password} disabled={isLoading} />
          <div className="text-right"><button type="button" onClick={() => switchView('forgot')} className="text-sm text-blue-300 hover:underline">Forgot password?</button></div>
          <Button type="submit" className="w-full" isLoading={isLoading}>Sign In</Button>
        </form>}

        {view === 'signup' && <form noValidate onSubmit={handleSignUp} className="space-y-5">
          <TextField id="signup-name" label="Full name" autoComplete="name" value={fullName} onChange={value => updateField('fullName', value, setFullName)} error={errors.fullName} disabled={isLoading} />
          <TextField id="signup-email" label="Email" type="email" autoComplete="email" value={email} onChange={value => updateField('email', value, setEmail)} error={errors.email} disabled={isLoading} />
          <TextField id="signup-password" label="Password" type="password" autoComplete="new-password" value={password} onChange={value => updateField('password', value, setPassword)} error={errors.password} disabled={isLoading} />
          <p className="-mt-4 text-xs text-gray-300">Use at least 8 characters.</p>
          <TextField id="signup-confirm-password" label="Confirm password" type="password" autoComplete="new-password" value={confirmPassword} onChange={value => updateField('confirmPassword', value, setConfirmPassword)} error={errors.confirmPassword} disabled={isLoading} />
          <div>
            <label htmlFor="signup-category" className="mb-1 block text-sm font-medium text-gray-200">Category</label>
            <select id="signup-category" name="category" value={category} onChange={event => updateField('category', event.target.value, setCategory)} disabled={isLoading} aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? 'category-error' : undefined} className="block w-full rounded-md border border-gray-500 bg-[#272631] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0055FF]">
              <option value="">Select your category</option>
              <option value="Junior_Secondary_School">Junior Secondary School</option>
              <option value="Senior_Secondary_School">Senior Secondary School</option>
              <option value="University">University</option>
            </select>
            {errors.category && <p id="category-error" role="alert" className="mt-1 text-sm text-red-300">{errors.category}</p>}
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>Create Account</Button>
        </form>}

        {view === 'forgot' && <form noValidate onSubmit={handleResetRequest} className="space-y-5">
          <p className="text-sm text-gray-200">Enter your email and we will send you a password reset link.</p>
          <TextField id="reset-email" label="Email" type="email" autoComplete="email" value={email} onChange={value => updateField('email', value, setEmail)} error={errors.email} disabled={isLoading} />
          <Button type="submit" className="w-full" isLoading={isLoading}>Send Reset Link</Button>
          <button type="button" onClick={() => switchView('signin')} className="w-full text-sm text-blue-300 hover:underline">Back to sign in</button>
        </form>}

        {(view === 'check-email' || view === 'reset-sent') && <div className="space-y-5 text-center text-gray-200">
          <p>{view === 'check-email' ? 'Check for a confirmation link at' : 'If an account exists, we sent a password reset link to'} <strong className="break-all text-white">{email}</strong>.</p>
          <p className="text-sm">{view === 'check-email' ? 'Confirm your email address, then sign in.' : 'Open the link to choose a new password.'} Check your spam folder if you do not see it.</p>
          <Button type="button" onClick={() => switchView('signin')} className="w-full">Back to Sign In</Button>
        </div>}
      </Card>
    </div>
  );
};

export default AuthPage;
