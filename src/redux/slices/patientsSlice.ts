import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { patients } from '../../data/patients'
import type { Patient } from '../../shared/types/patient'

type PatientViewMode = 'grid' | 'list'

export type PatientsState = {
  items: Patient[]
  search: string
  viewMode: PatientViewMode
}

const initialState: PatientsState = {
  items: patients,
  search: '',
  viewMode: 'grid',
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatientViewMode: (state, action: PayloadAction<PatientViewMode>) => {
      state.viewMode = action.payload
    },
    setPatientSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setPatientSearch, setPatientViewMode } = patientsSlice.actions
export default patientsSlice.reducer
