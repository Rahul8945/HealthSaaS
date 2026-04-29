import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import notificationsReducer from './slices/notificationsSlice'
import patientsReducer from './slices/patientsSlice'
import toastReducer from './slices/toastSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    patients: patientsReducer,
    toasts: toastReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
