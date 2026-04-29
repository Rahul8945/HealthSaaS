export type AuthUser = {
  id: string
  name: string
  email: string
  role: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthState = {
  user: AuthUser | null
  status: 'checking' | 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
}
