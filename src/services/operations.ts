import { IItemList } from '../components/ItemList'
import Queries, { EQueries } from './queries'
import { IFare, IHoliday, IRange, IStation, IUser } from './tables'

export const __EMPTY_STRING__ = '______'

export enum ETypeDay {
  SEMANA = 0,
  DOMINGOoFESTIVO = 1,
  SABADO = 2
}

const makeDateFormatDayMonth = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  // const yyyy = today.getFullYear();
  return dd + '-' + mm
}

export const makeDateFormatSchedule = () => {
  const now = new Date()
  return parseInt(
    String(now.getHours()) + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0')
  )
}

export const isNowHoliday = async () => {
  const now = makeDateFormatDayMonth()
  const holidays = (await Queries[EQueries.GET_ALL]('holidays')) as IHoliday[]
  return holidays.every((holiday) => holiday.fecha === now)
}

// Entrega si hoy es dia de semana
// domingo o festivo o sabado
// necesario por que las frecuencias de los trenes
// cambian dependiendo del dia
export const getTypeDay = async () => {
  const nowDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  let typeDay = ETypeDay.SEMANA
  if (nowDay === 'Sunday' || (await isNowHoliday())) {
    typeDay = ETypeDay.DOMINGOoFESTIVO
  } else if (nowDay === 'Saturday') {
    typeDay = ETypeDay.SABADO
  }
  return typeDay
}

// Dado el origen y el destino
// se calcula la direccion del tren
// si va hacia Limache o Hacia Puerto
export const getDirection = (origin: IStation, destination: IStation) => {
  const goesToPuerto = origin.code >= destination.code
  let direction = 'Puerto'

  // Ahora hay que verificar si va a una estacion menor o igual a Sgto
  // Aldea. Si va a una estacion superior a Stgo Aldea solo serviran los trenes hacia Limache. Si es menor sirven los trenes a Stgo Aldea o Limache.
  if (!goesToPuerto) {
    // Obtiene todas las estaciones que solo pueden ser alcanzadas por un tren que llegue a Limache

    const stationsLimacheDirection = ['Peñablanca', 'Limache', 'Olmué', 'Quillota', 'La Calera', 'Limache Viejo']

    direction = stationsLimacheDirection.indexOf(origin.name) > -1 ? 'Limache' : 'Sargento Aldea'
  }
  return direction
}

// * = async, yield = await
export const getNextTimes = async (origin: IStation, destination: IStation) => {
  try {
    const directionName = getDirection(origin, destination)
    const stationDirection = (await Queries[EQueries.GET_STATION_WHIT_NAME](directionName))[0] as IStation

    // console.log(directionName);

    const typeDay = await getTypeDay()

    const timeFormat = makeDateFormatSchedule()
    // console.log(timeFormat);
    let nextTimes

    // En fines de semana y feriados, solo hay trenes a limache
    if (directionName === 'Sargento Aldea' && typeDay === ETypeDay.SEMANA) {
      // Si va Sargento Aldea, Sirven los trenes a Limache y Sargento Aldea
      const limache = (await Queries[EQueries.GET_STATION_WHIT_NAME]('Limache'))[0] as IStation

      nextTimes = await Queries[EQueries.GET_NEXT_TIMES_SCHEDULES](
        stationDirection,
        typeDay,
        origin,
        timeFormat,
        limache
      )
    } else {
      nextTimes = await Queries[EQueries.GET_NEXT_TIMES_SCHEDULES](stationDirection, typeDay, origin, timeFormat)
    }
    return nextTimes
  } catch (err) {
    return err
  }
}

export const makeTimeTravelLabel = (timeOrigin: number, timeDestination: number) => {
  return `${Math.abs(timeOrigin - timeDestination)} Minutos`
}

export const makeNextLabel = (time: number) => {
  const now = new Date()

  const timeString = String(time)
  let labelTime,
    hString,
    mString,
    type,
    h,
    m,
    s = 0
  if (timeString.length === 5) {
    hString = `0${timeString[0]}`
    mString = `${timeString[1]}${timeString[2]}`
  } else {
    hString = `${timeString[0]}${timeString[1]}`
    mString = `${timeString[2]}${timeString[3]}`
  }

  h = parseInt(hString)
  m = parseInt(mString)
  type = h > 12 || (h === 12 && m > 0) ? 'PM' : 'AM'
  labelTime = `${hString}:${mString} ${type}`

  const dateSchedule = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s)
  // dateSchedule.setHours(h, m, s)

  let diff = dateSchedule.getTime() - now.getTime()
  const hh = Math.floor(diff / 1000 / 60 / 60)

  diff -= hh * 1000 * 60 * 60
  const mm = Math.ceil(diff / 1000 / 60)

  return {
    minAprox: `~ ${hh > 1 ? hh + ' Horas y' : hh === 1 ? '1 Hora y' : ''} ${mm > 1
      ? mm + ' Minutos'
      : mm === 1 ? ' 1 Minuto' : ''}`,
    timeString: `${labelTime}`
  }
}

export const getCostItemLists = async (origin: IStation, destination: IStation, userType: IUser) => {
  try {
    const range = (await Queries[EQueries.GET_RANGE_NOW](makeDateFormatSchedule()))[0] as IRange

    const users = (await Queries[EQueries.GET_ALL]('users')) as IUser[]

    const costs: IItemList[] = []
    let labelCostUser = __EMPTY_STRING__

    for (let user of users) {
      const fare = (await Queries[EQueries.GET_FARE_USER](
        origin.section,
        destination.section,
        range.code,
        user.code
      ))[0] as IFare

      costs.push({ label: user.name, labelLink: `$ ${fare.cost}` })

      if (user.code === userType.code) labelCostUser = `$ ${fare.cost}`
    }
    return { costs, labelCostUser }
  } catch (err) {
    console.log(err)
    return { costs: [], labelCostUser: __EMPTY_STRING__ }
  }
}
