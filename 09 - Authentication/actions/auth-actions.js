'use server'

import { createUser } from "@/lib/user"

export async function signUp(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  let errors = {}

  if(!email.includes('@')) errors.email = 'Please enter a valid email address.'
  
  if(password.trim().length < 8) errors.password = 'Please enter a password which is atleast 8 characters long.'

  if(Object.keys(errors).length > 0) return errors

  createUser(email, password)
}