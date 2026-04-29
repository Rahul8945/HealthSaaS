import { useMemo, useState, type FormEvent } from 'react'
import { HeartPulse, Lock, Mail } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import type { RootState } from '../redux/store'
import { clearAuthError, loginUser } from '../redux/slices/authSlice'
import type { AuthState } from '../features/auth/authTypes'
import { showToast } from '../redux/slices/toastSlice'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const firebaseCredentials = {
  email: 'charu@gmail.com',
  password: '12345678',
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const { user, status, error } = useAppSelector((state: RootState) => state.auth as AuthState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const validationError = useMemo(() => {
    if (!emailRegex.test(email)) {
      return 'Enter a valid business email address.'
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters.'
    }

    return null
  }, [email, password])

  if (user) {
    return <Navigate to="/" replace />
  }

  if (status === 'checking') {
    return <div className="full-page-loader">Checking secure session...</div>
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    dispatch(clearAuthError())

    if (validationError) {
      dispatch(showToast({ message: validationError, variant: 'error' }))
      return
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap()
      dispatch(showToast({ message: 'Signed in successfully.', variant: 'success' }))
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to sign in.'
      dispatch(showToast({ message, variant: 'error' }))
    }
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="brand large">
          <div className="brand-mark">
            <HeartPulse size={30} />
          </div>
          <div>
            <strong>HealthSaaS</strong>
            <span>Secure care operations for provider networks</span>
          </div>
        </div>
        <h1>Coordinate patients, insights, and follow-ups from one workspace.</h1>
        <p>
          A responsive B2B healthcare SaaS interface with Firebase Authentication, Redux state
          management, analytics, patient management, and notifications.
        </p>
        <div className="login-metrics">
          <span>98.7% care task SLA</span>
          <span>1,284 remote patients</span>
          <span>24/7 clinical alerts</span>
        </div>
      </section>

      <section className="login-card" aria-label="Login form">
        <p className="eyebrow">Firebase Auth</p>
        <h2>Sign in to workspace</h2>
        <p className="form-hint">
          Use a Firebase Authentication email/password user from your project.
        </p>
        <div className="login-credentials" aria-label="Firebase test credentials">
          <strong>Firebase test login</strong>
          <span>Email: {firebaseCredentials.email}</span>
          <span>Password: {firebaseCredentials.password}</span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label>
            Email address
            <span className="input-shell">
              <Mail size={17} />
              <input
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="clinician@example.com"
                type="email"
              />
            </span>
          </label>

          <label>
            Password
            <span className="input-shell">
              <Lock size={17} />
              <input
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                type="password"
              />
            </span>
          </label>

          {(touched && validationError) || error ? (
            <div className="form-error" role="alert">
              {touched && validationError ? validationError : error}
            </div>
          ) : null}

          <button className="primary-button" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  )
}
