import {
  browserLocalPersistence,
  type AuthError,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { getFirebaseAuth, isFirebaseConfigured } from '../../shared/services/firebase'
import type { AuthUser } from './authTypes'

const mapFirebaseUser = (user: User): AuthUser => ({
  id: user.uid,
  name: user.displayName || user.email?.split('@')[0] || 'Clinical User',
  email: user.email || '',
  role: 'Clinical Operations',
})

const firebaseAuthErrorMessages: Record<string, string> = {
  'auth/configuration-not-found':
    'Firebase Authentication is not enabled for this project. In Firebase Console, open Build > Authentication, click Get started, enable Email/Password, then create a user.',
  'auth/operation-not-allowed':
    'Firebase rejected Email/Password login for the project used by this app. Confirm the provider status shows Enabled after saving, restart Vite after .env changes, and verify the .env config belongs to the same Firebase project.',
  'auth/invalid-credential': 'Invalid Firebase email or password.',
  'auth/user-not-found': 'No Firebase user exists with this email address.',
  'auth/wrong-password': 'The Firebase password is incorrect.',
  'auth/too-many-requests': 'Firebase temporarily blocked this login. Please wait and try again.',
  'auth/unauthorized-domain':
    'This domain is not authorized in Firebase Authentication settings. Add localhost or your deployed domain under Authentication > Settings > Authorized domains.',
}

const getAuthErrorMessage = (error: unknown) => {
  const authError = error as Partial<AuthError>

  if (authError.code && firebaseAuthErrorMessages[authError.code]) {
    return firebaseAuthErrorMessages[authError.code]
  }

  return error instanceof Error ? error.message : 'Unable to sign in'
}

export const authService = {
  isFirebaseConfigured,
  async login(email: string, password: string): Promise<AuthUser> {
    const auth = getFirebaseAuth()

    if (!auth) {
      throw new Error('Firebase is not configured. Add Firebase env values and restart the app.')
    }

    try {
      await setPersistence(auth, browserLocalPersistence)
      const credential = await signInWithEmailAndPassword(auth, email, password)
      return mapFirebaseUser(credential.user)
    } catch (error) {
      throw new Error(getAuthErrorMessage(error), { cause: error })
    }
  },
  subscribeToSession(callback: (user: AuthUser | null) => void) {
    const auth = getFirebaseAuth()

    if (!auth) {
      callback(null)
      return () => undefined
    }

    return onAuthStateChanged(auth, (user) => {
      callback(user ? mapFirebaseUser(user) : null)
    })
  },
  async logout() {
    const auth = getFirebaseAuth()

    if (auth) {
      await signOut(auth)
    }
  },
}
