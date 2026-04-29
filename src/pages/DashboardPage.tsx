import { Activity, CalendarClock, ShieldAlert, Users } from 'lucide-react'
import { PatientCard } from '../features/patients/PatientCard'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  sendPatientFollowUpNotification,
  type NotificationsState,
} from '../redux/slices/notificationsSlice'
import type { PatientsState } from '../redux/slices/patientsSlice'
import { showToast } from '../redux/slices/toastSlice'
import { StatCard } from '../shared/components/StatCard'

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const patients = useAppSelector((state) => (state.patients as PatientsState).items)
  const notifications = useAppSelector((state) => state.notifications as NotificationsState)
  const criticalPatients = patients.filter((patient) => patient.status === 'Critical').length

  const handleSendNotification = async () => {
    try {
      await dispatch(sendPatientFollowUpNotification()).unwrap()
      dispatch(showToast({ message: 'Follow-up notification sent.', variant: 'success' }))
    } catch (error) {
      const message = typeof error === 'string' ? error : 'Unable to send notification.'
      dispatch(showToast({ message, variant: 'error' }))
    }
  }

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Home / Dashboard</p>
          <h2>Today’s care operations</h2>
          <p>
            Monitor live patient risk, upcoming appointments, and service-worker powered care
            alerts in a single workflow.
          </p>
        </div>
        <button
          className="primary-button compact"
          type="button"
          onClick={handleSendNotification}
          disabled={notifications.status === 'loading'}
        >
          {notifications.status === 'loading' ? 'Sending alert...' : 'Send follow-up alert'}
        </button>
      </section>

      {notifications.error ? <div className="inline-alert">{notifications.error}</div> : null}

      <section className="stats-grid">
        <StatCard
          icon={<Users size={22} />}
          label="Active patients"
          value={String(patients.length)}
          trend="+12% this month"
        />
        <StatCard
          icon={<ShieldAlert size={22} />}
          label="Critical cases"
          value={String(criticalPatients)}
          trend="Needs review today"
        />
        <StatCard
          icon={<CalendarClock size={22} />}
          label="Appointments"
          value="18"
          trend="6 virtual consults"
        />
        <StatCard
          icon={<Activity size={22} />}
          label="Engagement"
          value="91%"
          trend="Remote monitoring adherence"
        />
      </section>

      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Priority queue</p>
            <h2>Patients needing attention</h2>
          </div>
        </div>
        <div className="dashboard-patient-grid">
          {patients.slice(0, 3).map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </div>
  )
}
