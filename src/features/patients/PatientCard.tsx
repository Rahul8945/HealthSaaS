import { CalendarDays, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react'
import type { Patient } from '../../shared/types/patient'

type PatientCardProps = {
  patient: Patient
  compact?: boolean
}

export function PatientCard({ patient, compact = false }: PatientCardProps) {
  return (
    <article className={compact ? 'patient-card patient-card-list' : 'patient-card'}>
      <div className="patient-card-header">
        <div>
          <span className="patient-id">{patient.id}</span>
          <h3>{patient.name}</h3>
          <p>
            {patient.age} years · {patient.gender}
          </p>
        </div>
        <span className={`status-badge status-${patient.status.toLowerCase()}`}>
          {patient.status}
        </span>
      </div>

      <div className="patient-condition">
        <Stethoscope size={16} />
        {patient.condition}
      </div>

      <div className="patient-meta">
        <span>
          <ShieldCheck size={15} />
          {patient.assignedDoctor}
        </span>
        <span>
          <CalendarDays size={15} />
          Next: {patient.nextAppointment}
        </span>
        <span>
          <HeartPulse size={15} />
          HR {patient.vitals.heartRate} · BP {patient.vitals.bloodPressure} · SpO2{' '}
          {patient.vitals.oxygenSaturation}%
        </span>
      </div>

      <p className="care-plan">{patient.carePlan}</p>
    </article>
  )
}
