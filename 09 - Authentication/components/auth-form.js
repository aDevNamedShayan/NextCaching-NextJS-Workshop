'use client'

import Link from 'next/link';
import { useFormState } from 'react-dom';

import { signUp } from '@/actions/auth-actions';

export default function AuthForm() {
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
          {isPending ? 'Creating...' : 'Create Account'}
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>

    </form>
  );
}
