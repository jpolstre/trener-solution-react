import { InanoSQLTableConfig } from "@nano-sql/core/lib/interfaces";

export interface IHoliday {
  code: number

  fecha: string
}

export interface IUser {
  code: number

  name: string
  category: string

}
export interface ISchedule {
  code: number

  origin: number
  destination: number
  day: number
  time: number
}

export interface IRange {
  id:number

  code: number
  name: string
  start: number
  end: number
  category: string
}

export interface IFare {
  code:number

  from: number
  to: number
  ranges: number
  user: number
  cost: number
}

export interface IStation {
  code: number

  name: string
  section: number
  time: number
  type: number
}

export const tables: InanoSQLTableConfig[] = [
  {
    name: 'stations',
    model: {
      'code:int': { ai: true, pk: true },
      'name:string': { default: '', notNull: true },
      'section:number': { default: 0, notNull: true },
      'time:number': { default: 0, notNull: true },
      'type:number': { default: 0, notNull: true }
    }
  },

  {
    name: 'fares',
    model: {
      'code:int': { ai: true, pk: true },

      'from:number': { default: 0, notNull: true },
      'to:number': { default: 0, notNull: true },
      'ranges:number': { default: 0, notNull: true },
      'user:number': { default: 0, notNull: true },
      'cost:number': { default: 0, notNull: true }
    }
  },

  {
    name: 'ranges',
    model: {
      'id:int': { ai: true, pk: true },

      'code:number': { default: 0, notNull: true },
      'name:string': { default: '', notNull: true },
      'start:number': { default: 0, notNull: true },
      'end:number': { default: 0, notNull: true },
      'category:string': { default: 0, notNull: true },

    }
  },

  {
    name: 'schedules',
    model: {
      'code:int': { ai: true, pk: true },

      'origin:number': { default: 0, notNull: true },
      'destination:number': { default: 0, notNull: true },
      'day:number': { default: 0, notNull: true },
      'time:number': { default: 0, notNull: true },
    }
  },
  {
    name: 'users',
    model: {
      'code:int': { ai: true, pk: true },
      'name:string': { default: '', notNull: true },
      'category:string': { default: '', notNull: true },
    }
  },

  {
    name: 'holidays',
    model: {
      'code:int': { ai: true, pk: true },
      'date:string': { default: '', notNull: true },
    }
  },
]