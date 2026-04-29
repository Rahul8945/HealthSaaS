import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  requestNotificationPermission,
  showCareNotification,
} from '../../shared/services/notificationService'

type NotificationEvent = {
  id: string
  message: string
  createdAt: string
}

export type NotificationsState = {
  permission: NotificationPermission | 'unsupported'
  status: 'idle' | 'loading' | 'sent' | 'error'
  error: string | null
  events: NotificationEvent[]
}

const getInitialPermission = (): NotificationsState['permission'] => {
  if (!('Notification' in window)) {
    return 'unsupported'
  }

  return Notification.permission
}

const initialState: NotificationsState = {
  permission: getInitialPermission(),
  status: 'idle',
  error: null,
  events: [],
}

export const sendPatientFollowUpNotification = createAsyncThunk<
  NotificationEvent,
  void,
  { rejectValue: string }
>('notifications/sendPatientFollowUpNotification', async (_, thunkApi) => {
  try {
    const permission = await requestNotificationPermission()

    if (permission !== 'granted') {
      return thunkApi.rejectWithValue('Notifications were not granted by the browser.')
    }

    await showCareNotification()

    return {
      id: crypto.randomUUID(),
      message: 'Patient follow-up notification sent',
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send notification'
    return thunkApi.rejectWithValue(message)
  }
})

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPatientFollowUpNotification.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(sendPatientFollowUpNotification.fulfilled, (state, action) => {
        state.status = 'sent'
        state.permission = 'granted'
        state.events.unshift(action.payload)
      })
      .addCase(sendPatientFollowUpNotification.rejected, (state, action) => {
        state.status = 'error'
        state.permission = getInitialPermission()
        state.error = action.payload || 'Unable to send notification'
      })
  },
})

export default notificationsSlice.reducer
