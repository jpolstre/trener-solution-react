import { combineReducers } from 'redux'

import trener from './trener'

const rootReducer = combineReducers({
  trener
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer