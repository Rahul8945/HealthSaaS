import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../features/auth/authService'
import type { AuthUser, LoginCredentials } from '../../features/auth/authTypes'

export const loginUser = createAsyncThunk<AuthUser, LoginCredentials, { rejectValue: string }>(
  'auth/loginUser',
  async (credentials, thunkApi) => {
    try {
      return await authService.login(credentials.email, credentials.password)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in'
      return thunkApi.rejectWithValue(message)
    }
  },
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authService.logout()
})
