export type PatientStatus = 'Stable' | 'Monitoring' | 'Critical'

export type Patient = {
  id: string
  name: string
  age: number
  gender: 'Female' | 'Male'
  condition: string
  assignedDoctor: string
  lastVisit: string
  nextAppointment: string
  status: PatientStatus
  vitals: {
    heartRate: number
    bloodPressure: string
    oxygenSaturation: number
  }
  carePlan: string
}
