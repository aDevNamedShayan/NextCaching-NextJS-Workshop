'use server'

import { redirect } from "next/navigation"

import { hashUserPassword } from "@/lib/hash"
import { createUser } from "@/lib/user"
import { createAuthSession } from "@/lib/auth"

export async function signUp(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  let errors = {}

  if(!email.includes('@')) errors.email = 'Please enter a valid email address.'
  
  if(password.trim().length < 8) errors.password = 'Please enter a password which is atleast 8 characters long.'

  if(Object.keys(errors).length > 0) return errors

  const hashedPassword = hashUserPassword(password)
  try {
    const userId = createUser(email, hashedPassword)
    await createAuthSession(userId)
    redirect('/training')
  } catch (error) {
    if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      errors.email = 'It seems like an account for the chosen email already exists'
      return errors
    }
    throw error
  }
}