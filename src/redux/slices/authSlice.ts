import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, AuthUser } from '../../features/auth/authTypes'
import { isFirebaseConfigured } from '../../shared/services/firebase'
import { loginUser, logoutUser } from '../thunks/authThunks'

const initialState: AuthState = {
  user: null,
  status: isFirebaseConfigured ? 'checking' : 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
    authSessionResolved: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
      state.status = action.payload ? 'authenticated' : 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.user = action.payload
        state.status = 'authenticated'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload || 'Unable to sign in'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = 'idle'
        state.error = null
      })
  },
})

export const { authSessionResolved, clearAuthError } = authSlice.actions
export { loginUser, logoutUser }
export default authSlice.reducer
