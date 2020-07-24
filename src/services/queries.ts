import { nSQL } from '@nano-sql/core'
import { IStation, tables } from './tables'
import trener from './trener.json'
import feriados from './feriado.json'
import { ETypeDay } from './operations'




export enum EQueries {
  GET_ALL = 'getAll',
  INIT_DB = 'initDataBase',
  GET_STATION_WHIT_NAME = 'getStationWhitName',
  GET_NEXT_TIMES_SCHEDULES = 'getNexTimesSchedules',
  GET_RANGE_NOW = 'getRangeNow',
  GET_FARE_USER = 'getFareUser'
}



export default {
  async initDataBase() {
    const dbList = nSQL().listDatabases()
    if (dbList.length <= 0) {
      await nSQL().createDatabase({
        id: 'TR5NR',
        // mode: new LevelDB(path.join(__dirname, '/db'), false),
        mode: 'PERM',
        tables
      })
      const rows = await nSQL('stations').query('select').exec()
      if (rows.length === 0) {
        return Promise.all([

          nSQL().rawImport({ ranges:(() => trener.ranges.map((range, index) => ({ ...range, id: index })))() }, false, (progress: number) => { console.log('ranges progress:' + progress) }),

          nSQL().rawImport({ stations: trener.stations }, false, (progress: number) => { console.log('station progress: ' + progress) }),

          nSQL().rawImport({ fares: (() => trener.fares.map((fare, index) => ({ ...fare, code: index })))() }, false, (progress: number) => { console.log('fares progress:' + progress) }),
        
          nSQL().rawImport({ schedules: (() => trener.schedules.map((schedule, index) => ({ ...schedule, code: index })))() }, false, (progress: number) => { console.log('schedules progress:' + progress) }),

          nSQL().rawImport({ users: trener.users }, false, (progress: number) => { console.log('users progress:' + progress) }),

          nSQL().rawImport({ holidays: (() => feriados.RECORDS.map((holiday, index) => ({ ...holiday, code: index })))() }, false, (progress: number) => { console.log('holidays progress:' + progress) }),

        ])
      }
      return []//queryResult en este es necesario retornar un array vacio.
    } else {
      return []//queryResult en este es necesario retornar un array vacio.
    }
  },
  getAll(tableName: string) {
    return nSQL(tableName).query('select').exec()
  },

  getStationWhitName(nameStation: string) {
    return nSQL('stations').query('select').where(['name', '=', nameStation]).exec()
  },

  getNexTimesSchedules(stationDirection: IStation, typeDay: ETypeDay, origin: IStation, time: number, limache?: IStation) {

    const destinationQuery = limache ? [['destination', '=', stationDirection.code], 'OR', ['destination', '=', limache.code]] : ['destination', '=', stationDirection.code]

    return nSQL('schedules').query('select', ['time']).where(
      [
        ['time', '>=', time], 'AND', ['day', '=', typeDay], 'AND', ['origin', '=', origin.code], 'AND', destinationQuery

      ]
    ).orderBy(['time ASC']).exec()

  },

  getRangeNow(nowInCheduleFormat: number) {
    return nSQL('ranges').query('select').where(
      [
        ['start', '<=', nowInCheduleFormat], 'AND', ['end', '>=', nowInCheduleFormat]
        // [nowInCheduleFormat, '>=', 'start' ], 'AND', [nowInCheduleFormat, '<=','end' ]
      ]
    ).exec()
  },

  // section = tramo
  getFareUser(originSection: number, destinationSection: number, rangeCode: number, userCode: number) {
    return nSQL('fares').query('select').where(
      [
        ['from', '=', originSection], 'AND', ['to', '=', destinationSection], 'AND',
        ['range', '=', rangeCode], 'AND', ['user', '=', userCode]

      ]
    ).exec()
  }

}

