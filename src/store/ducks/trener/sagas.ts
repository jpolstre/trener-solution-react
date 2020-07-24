import { put, call, all, select, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { loadSuccess, loadFailure, setStateValue, calcResults } from './actions'
import Queries, { EQueries } from '../../../services/queries'
import { AppState } from '../rootReducer'
import { IItemList } from '../../../components/ItemList'
import { getCostItemLists, getNextTimes, makeNextLabel, makeTimeTravelLabel, __EMPTY_STRING__ } from '../../../services/operations'


// ref : https://stackoverflow.com/questions/48044439/using-redux-saga-with-setinterval-how-and-when-to-yield?rq=1
function countdown(time: number) {
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      emitter('ok')
    }, time);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv)
    }
  }
  )
}

const intervalCalcNexTrain = function* () {
  const { trener } = (yield select()) as AppState
  const { origin, destination, userType } = trener

  if (origin.time !== -1 && destination.time !== -1) {

    const nextTimes = (yield call(getNextTimes, origin, destination)) as { time: number }[]

    let nextLabel = __EMPTY_STRING__
    if (nextTimes.length > 0) {
      const { minAprox, timeString } = makeNextLabel(nextTimes[0].time)
      nextLabel = `${minAprox} (${timeString})`
    }

    if (nextLabel === __EMPTY_STRING__) {
      yield all([
        // put(setStateValue('travelTime', __EMPTY_STRING__)),
        // put(setStateValue('costo', __EMPTY_STRING__)),
        put(setStateValue('next', __EMPTY_STRING__)),
        put(setStateValue('nextTrains', [])),
      ])
    } else {

      const nextTrains = nextTimes.map(nextTime => {
        const { minAprox, timeString } = makeNextLabel(nextTime.time)
        return { label: minAprox, labelLink: timeString }
      })

      const { costs, labelCostUser } = (yield call(getCostItemLists, origin, destination, userType)) as { costs: IItemList, labelCostUser: string }

      yield all([

        put(setStateValue('next', nextLabel)),
        put(setStateValue('cost', labelCostUser)),
        put(setStateValue('costs', costs)),
        put(setStateValue('nextTrains', nextTrains))

      ])
    }
    localStorage.setItem('appState', JSON.stringify(trener))

  }
}

export function* calcResultsSaga() {
  try {
    // getState in redux-saga?, ref: https://stackoverflow.com/questions/38405700/getstate-in-redux-saga
    //How to get the new state with Redux-Saga?, ref: https://stackoverflow.com/questions/57698825/how-to-get-the-new-state-with-redux-saga
    const { trener } = (yield select()) as AppState
    const { origin, destination, userType } = trener

    if (origin.time === -1 || destination.time === -1) {
      yield put(loadSuccess())

    } else {
      const travelTimeLabel = makeTimeTravelLabel(origin.time, destination.time)
      const nextTimes = (yield call(getNextTimes, origin, destination)) as { time: number }[]

      let nextLabel = __EMPTY_STRING__
      if (nextTimes.length > 0) {
        const label = makeNextLabel(nextTimes[0].time)
        nextLabel = `${label.minAprox} (${label.timeString})`
      }

      const nextTrains = nextTimes.map(nextTime => {
        const { minAprox, timeString } = makeNextLabel(nextTime.time)
        return { label: minAprox, labelLink: timeString }
      })

      const { costs, labelCostUser } = (yield call(getCostItemLists, origin, destination, userType)) as { costs: IItemList, labelCostUser: string }

      yield all([

        put(setStateValue('travelTime', travelTimeLabel)),
        put(setStateValue('next', nextLabel)),
        put(setStateValue('cost', labelCostUser)),
        put(setStateValue('costs', costs)),
        put(setStateValue('nextTrains', nextTrains))

      ])

      localStorage.setItem('appState', JSON.stringify(trener))


      const channel = yield call(countdown, 1000);
      yield takeEvery(channel, intervalCalcNexTrain);
    }

  } catch (err) {
    console.log(err);
    yield put(loadFailure())
  }
}


export function* queryDbSaga(action: any) {
  try {

    const query = action.query as EQueries
    let res, params: string = ''
    if (query === EQueries.GET_ALL) {
      params = action.params as string
      //aqui params es name table ej: 'stations' or 'users'
      res = yield call(Queries[query], params)
    } else {
      res = yield call(Queries[query])
    }

    if (query === EQueries.INIT_DB) {

      yield all([

        put(calcResults()),
        put(loadSuccess())

      ])

    } else {

      yield all([
        //Aquí params es cualquier key del objeto INITIAL_STATE(interface StateTypes)
        //y res el valor que se asigna 
        put(setStateValue(params, res))
      ])
    }

  } catch (err) {
    yield put(loadFailure())
  }
}

