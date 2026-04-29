import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ToastVariant = 'success' | 'error' | 'info'

export type ToastMessage = {
  id: string
  message: string
  variant: ToastVariant
}

export type ToastState = {
  items: ToastMessage[]
}

const initialState: ToastState = {
  items: [],
}

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    showToast: {
      reducer: (state, action: PayloadAction<ToastMessage>) => {
        state.items.unshift(action.payload)
      },
      prepare: (payload: Omit<ToastMessage, 'id'>) => ({
        payload: {
          ...payload,
          id: crypto.randomUUID(),
        },
      }),
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { dismissToast, showToast } = toastSlice.actions
export default toastSlice.reducer
