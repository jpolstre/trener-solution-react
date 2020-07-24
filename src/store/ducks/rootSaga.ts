import { all, takeLatest } from 'redux-saga/effects'

import { ActionTypes } from './trener/actions'
// load,
// startDataBase
import { queryDbSaga, calcResultsSaga  } from './trener/sagas'


export default function* rootSaga() {
  return yield all([
    // takeLatest(ActionTypes.LOAD_REQUEST, load),
    // takeLatest(ActionTypes.START_DB, startDataBase),

    // esto interviene la accion ActionTypes.QUERY_DB, se procesa la saga y develve otras acciones(middleware).
    takeLatest(ActionTypes.QUERY_DB, queryDbSaga),
    takeLatest(ActionTypes.CALC_RESULTS, calcResultsSaga)
  ])
}