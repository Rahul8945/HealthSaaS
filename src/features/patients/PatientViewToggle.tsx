import { Grid2X2, List } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import type { RootState } from '../../redux/store'
import { setPatientViewMode } from '../../redux/slices/patientsSlice'

export function PatientViewToggle() {
  const dispatch = useAppDispatch()
  const viewMode = useAppSelector((state: RootState) => state.patients.viewMode)

  return (
    <div className="segmented-control" aria-label="Patient view mode">
      <button
        className={viewMode === 'grid' ? 'active' : ''}
        type="button"
        onClick={() => dispatch(setPatientViewMode('grid'))}
      >
        <Grid2X2 size={16} />
        Grid
      </button>
      <button
        className={viewMode === 'list' ? 'active' : ''}
        type="button"
        onClick={() => dispatch(setPatientViewMode('list'))}
      >
        <List size={16} />
        List
      </button>
    </div>
  )
}
