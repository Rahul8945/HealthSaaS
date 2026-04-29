import { Bell, ChartNoAxesCombined, HeartPulse, LayoutDashboard, LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import type { AuthState } from '../../features/auth/authTypes'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import type { NotificationsState } from '../../redux/slices/notificationsSlice'
import type { RootState } from '../../redux/store'
import { logoutUser } from '../../redux/slices/authSlice'
import { showToast } from '../../redux/slices/toastSlice'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
  { to: '/patients', label: 'Patients', icon: Users },
]

export function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => (state.auth as AuthState).user)
  const notificationCount = useAppSelector(
    (state: RootState) => (state.notifications as NotificationsState).events.length,
  )

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      dispatch(showToast({ message: 'Signed out successfully.', variant: 'success' }))
      navigate('/login', { replace: true })
    } catch {
      dispatch(showToast({ message: 'Unable to sign out. Please try again.', variant: 'error' }))
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Application navigation">
        <div className="brand">
          <div className="brand-mark">
            <HeartPulse size={26} />
          </div>
          <div>
            <strong>HealthSaaS</strong>
            <span>Care command center</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">B2B Healthcare Platform</p>
            <h1>Clinical operations workspace</h1>
          </div>

          <div className="topbar-actions">
            <div className="notification-pill" aria-label={`${notificationCount} notifications sent`}>
              <Bell size={16} />
              {notificationCount}
            </div>
            <div className="user-chip">
              <span>{user?.name}</span>
              <small>{user?.role}</small>
            </div>
            <button className="icon-button" type="button" onClick={handleLogout} aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
