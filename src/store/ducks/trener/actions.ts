
import { EQueries } from "../../../services/queries";

export enum ActionTypes {

  LOAD_SUCCESS = '@session/LOAD_SUCCESS',
  LOAD_FAILURE = '@session/LOAD_FAILURE',

  QUERY_DB = '@session/QUERY_DB',
  SET_STATE_VALUE = '@session/SET_STATE_VALUE',
  CALC_RESULTS = '@session/CALC_RESULTS',
}


export const loadSuccess = ( ) => ({ type: ActionTypes.LOAD_SUCCESS})
export const loadFailure = () => ({ type: ActionTypes.LOAD_FAILURE })


export const queryDb = (query: EQueries, params?:string) => ({ type: ActionTypes.QUERY_DB, query, params })

export const setStateValue = (keyState?: string, valueState?: any) => ({ type: ActionTypes.SET_STATE_VALUE, keyState, valueState })

export const calcResults = () => ({ type: ActionTypes.CALC_RESULTS })

