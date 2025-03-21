'use client'

import Link from 'next/link';
import { useFormState } from 'react-dom';

import { signUp } from '@/actions/auth-actions';

export default function AuthForm({ mode }) {
  const [formState, formAction, isPending] = useFormState(signUp, {})
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        {formState.email && <p id='form-errors'>{formState.email}</p>}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {formState.password && <p id='form-errors'>{formState.password}</p>}
      </p>
      <p>
        <button type="submit">
          {mode === 'signup' && (isPending ? 'Creating...' : 'Create Account')}
          {mode === 'login' && (isPending ? 'Logging in...' : 'Login')}
        </button>
      </p>
      <p>
        {mode === 'signup' && <Link href="/?mode=login">Login with existing account.</Link>}
        {mode === 'login' && <Link href="/?mode=signup">Create an account.</Link>}
      </p>
    </form>
  );
}
