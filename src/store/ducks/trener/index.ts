import { Reducer } from 'redux'
import { ERoutes } from '../../../components/Content'
import { ActionTypes } from './actions'
import { IStation, IUser } from '../../../services/tables';
import { IItemList } from '../../../components/ItemList';
import { EQueries } from '../../../services/queries';


const __EMPTY_STRING__ = '______'

export interface StateTypes {
  activeTab: ERoutes
  titleHeader: string
  loading: boolean
  error: boolean

  origin: IStation
  destination: IStation

  next: string

  userType: IUser,
  cost: string

  travelTime: string

  stations: IStation[]
  users: IUser[]

  nextTrains: IItemList[]
  costs: IItemList[]
}

const appStateLocal = localStorage.getItem('appState')
let INITIAL_STATE: StateTypes
if (appStateLocal) {
  INITIAL_STATE = JSON.parse(appStateLocal)
} else {
  INITIAL_STATE = {
    activeTab: ERoutes.TRAVELS,
    titleHeader: 'TR5NR',
    loading: true,
    error: false,

    origin: { code: -1, name: __EMPTY_STRING__, section: -1, time: -1, type: -1 },
    destination: { code: -1, name: __EMPTY_STRING__, section: -1, time: -1, type: -1 },

    next: __EMPTY_STRING__,
    userType: { code: -1, name: __EMPTY_STRING__, category: '' },
    cost: __EMPTY_STRING__,

    travelTime: __EMPTY_STRING__,

    stations: [],
    users: [],

    nextTrains: [],
    costs: []
  }
  localStorage.setItem('appState', JSON.stringify(INITIAL_STATE))
}

function hasOwnProperty<O extends object, K extends PropertyKey>(
  obj: O,
  key: K,

): obj is O & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

const reducer: Reducer<StateTypes> = (state = INITIAL_STATE, action): StateTypes => {

  switch (action.type) {

    case ActionTypes.QUERY_DB:
      if (action.query === EQueries.INIT_DB)
        return { ...state, loading: true }
      return state
    case ActionTypes.CALC_RESULTS:

      return { ...state, loading: true }

    case ActionTypes.LOAD_SUCCESS:

      return { ...state, loading: false, error: false }

    case ActionTypes.LOAD_FAILURE:

      return { ...state, loading: false, error: true }

    case ActionTypes.SET_STATE_VALUE:

      const keyState = action.keyState

      return hasOwnProperty(state, keyState) ?
        { ...state, loading: false, error: true, [keyState]: action.valueState }
        : { ...state, loading: false, error: true }

    default:

      return state

  }
}

export default reducer

