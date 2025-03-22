'use server'

import { redirect } from "next/navigation"

import { hashUserPassword, verifyPassword } from "@/lib/hash"
import { createUser, getUserByEmail } from "@/lib/user"
import { createAuthSession, destroyAuthSession } from "@/lib/auth"

export async function signUp(formData) {
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

export async function login(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const existingUser = getUserByEmail(email)
  if(!existingUser) return { email: 'Could not find a user with the provided email, Please check your credentials.' }

  const isValidPassword = verifyPassword(existingUser.password, password)
  if(!isValidPassword) return { password: 'Could not authenticate user, Please check your credentials.' }

  await createAuthSession(existingUser.id)
  redirect('/training')
}

export async function auth(mode, prevState, formData) {
  if(mode === 'signup') return signUp(formData)
  else if(mode === 'login') return login(formData) 
}

export async function logout() {
  await destroyAuthSession()
  redirect('/')
}