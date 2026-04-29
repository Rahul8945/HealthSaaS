import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export function useAppSelector<TSelected>(selector: (state: RootState) => TSelected): TSelected {
  return useSelector(selector)
}
