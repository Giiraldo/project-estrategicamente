import type { AuthResponse, SignInData, SignUpData, User } from '../types'
import { request } from './http'

export async function signUp(data: SignUpData): Promise<User> {
  const response = await request<{ user: User }>('/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return response.user
}

export async function signIn(data: SignInData): Promise<AuthResponse> {
  return request<AuthResponse>('/signin', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
