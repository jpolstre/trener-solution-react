import { all, takeLatest } from 'redux-saga/effects'

import { ActionTypes } from './trener/actions'
import { queryDbSaga, calcResultsSaga  } from './trener/sagas'


export default function* rootSaga() {
  return yield all([

    takeLatest(ActionTypes.QUERY_DB, queryDbSaga),
    takeLatest(ActionTypes.CALC_RESULTS, calcResultsSaga)
  
  ])
}