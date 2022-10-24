import { configureStore } from '@reduxjs/toolkit'
import passReducer from './slices/passSlice'

export const store = configureStore({
  reducer: {
    password: passReducer,
  },
})
