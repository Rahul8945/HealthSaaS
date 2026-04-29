import { TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { useAppSelector } from '../redux/hooks'
import type { RootState } from '../redux/store'
import { StatCard } from '../shared/components/StatCard'
import type { Patient } from '../shared/types/patient'

const monthlyRisk = [
  { label: 'Jan', value: 38 },
  { label: 'Feb', value: 44 },
  { label: 'Mar', value: 41 },
  { label: 'Apr', value: 56 },
  { label: 'May', value: 49 },
  { label: 'Jun', value: 64 },
]

export function AnalyticsPage() {
  const patients = useAppSelector(
    (state: RootState) => (state.patients as { items: Patient[] }).items,
  )

  const statusCounts = useMemo<Record<string, number>>(
    () =>
      patients.reduce<Record<string, number>>((accumulator, patient) => {
        accumulator[patient.status] = (accumulator[patient.status] || 0) + 1
        return accumulator
      }, {}),
    [patients],
  )
  const statusEntries: Array<[string, number]> = Object.entries(statusCounts)

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Analytics</p>
            <h2>Population health insights</h2>
            <p>Operational trends for patient risk, follow-up load, and remote monitoring.</p>
          </div>
        </div>

        <div className="stats-grid analytics-stats">
          <StatCard icon={<TrendingUp size={22} />} label="Care plan adherence" value="87%" trend="+4.8%" />
          <StatCard icon={<TrendingUp size={22} />} label="Avg response time" value="14m" trend="-6m" />
          <StatCard icon={<TrendingUp size={22} />} label="Remote vitals captured" value="2.8k" trend="+18%" />
        </div>
      </section>

      <section className="analytics-grid">
        <article className="section-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Risk trend</p>
              <h2>Monthly monitored episodes</h2>
            </div>
          </div>
          <div className="bar-chart" aria-label="Monthly monitored episodes chart">
            {monthlyRisk.map((item) => (
              <div className="bar-column" key={item.label}>
                <span style={{ height: `${item.value}%` }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="section-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Patient mix</p>
              <h2>Status distribution</h2>
            </div>
          </div>
          <div className="status-list">
            {statusEntries.map(([status, count]) => (
              <div key={status}>
                <span>{status}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
