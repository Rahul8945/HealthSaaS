import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authService } from './features/auth/authService'
import type { AuthState } from './features/auth/authTypes'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { authSessionResolved } from './redux/slices/authSlice'
import { ToastHost } from './shared/components/ToastHost'
import { AppLayout } from './shared/layouts/AppLayout'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { PatientsPage } from './pages/PatientsPage'

function ProtectedRoute() {
  const { user, status } = useAppSelector((state) => state.auth as AuthState)

  if (status === 'checking') {
    return <div className="full-page-loader">Checking secure session...</div>
  }

  return user ? <AppLayout /> : <Navigate to="/login" replace />
}

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return authService.subscribeToSession((user) => {
      dispatch(authSessionResolved(user))
    })
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastHost />
    </>
  )
}

export default App
