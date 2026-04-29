import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { PatientCard } from '../features/patients/PatientCard'
import { PatientViewToggle } from '../features/patients/PatientViewToggle'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import type { RootState } from '../redux/store'
import { setPatientSearch, type PatientsState } from '../redux/slices/patientsSlice'

export function PatientsPage() {
  const dispatch = useAppDispatch()
  const { items, search, viewMode } = useAppSelector((state: RootState) => state.patients as PatientsState)

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return items
    }

    return items.filter((patient) =>
      [patient.name, patient.id, patient.condition, patient.assignedDoctor]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [items, search])

  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="section-heading patient-toolbar">
          <div>
            <p className="eyebrow">Patient details</p>
            <h2>Patient management</h2>
            <p>Switch between grid and list views while keeping state in Redux.</p>
          </div>
          <PatientViewToggle />
        </div>

        <div className="search-row">
          <Search size={17} />
          <input
            aria-label="Search patients"
            placeholder="Search by patient, condition, ID, or doctor"
            value={search}
            onChange={(event) => dispatch(setPatientSearch(event.target.value))}
          />
        </div>
      </section>

      <section className={viewMode === 'grid' ? 'patients-grid' : 'patients-list'}>
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} compact={viewMode === 'list'} />
        ))}
      </section>
    </div>
  )
}
