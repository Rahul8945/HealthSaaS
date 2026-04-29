import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { dismissToast, type ToastState } from '../../redux/slices/toastSlice'

const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export function ToastHost() {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector((state) => (state.toasts as ToastState).items)

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => dispatch(dismissToast(toast.id)), 4000),
    )

    return () => {
      timers.forEach(window.clearTimeout)
    }
  }, [dispatch, toasts])

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-stack" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.variant]

        return (
          <div className={`toast toast-${toast.variant}`} key={toast.id} role="status">
            <Icon size={18} />
            <span>{toast.message}</span>
            <button
              aria-label="Dismiss notification"
              className="toast-dismiss"
              type="button"
              onClick={() => dispatch(dismissToast(toast.id))}
            >
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
