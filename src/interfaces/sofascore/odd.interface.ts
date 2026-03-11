export interface Odd {
    featured: Featured
    hasMoreOdds: boolean
  }
  
  export interface Featured {
    default: DefaultOdd
    asian: Asian
    fullTime: FullTime
  }
  
  export interface DefaultOdd {
    sourceId: number
    structureType: number
    marketId: number
    marketName: string
    isLive: boolean
    fid: number
    suspended: boolean
    id: number
    marketGroup: string
    marketPeriod: string
    choices: Choice[]
  }
  
  export interface Choice {
    initialFractionalValue: string
    fractionalValue: string
    sourceId: number
    name: string
    winning: boolean
    change: number
  }
  
  export interface Asian {
    sourceId: number
    structureType: number
    marketId: number
    marketName: string
    isLive: boolean
    fid: number
    suspended: boolean
    id: number
    marketGroup: string
    marketPeriod: string
    choices: Choice[]
  }
  
  export interface FullTime {
    sourceId: number
    structureType: number
    marketId: number
    marketName: string
    isLive: boolean
    fid: number
    suspended: boolean
    id: number
    marketGroup: string
    marketPeriod: string
    choices: Choice[]
  }