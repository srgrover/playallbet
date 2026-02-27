export interface Odd {
    persistentKey: string
    providerId: string
    logoUrl: string
    promoText: PromoText
    ongoing: boolean
    callToActionLink: string
    betBoostMarkets: any
    odds: Odds
    restrictions: Restrictions
  }
  
  export interface PromoText {
    lang: string
    text: string
    text2: string
    link: string
    linkIOS: string
    linkWeb: string
    callToAction: string
  }
  
  export interface Odds {
    matchfactMarkets: MatchfactMarket[]
    oddsTabMarkets: OddsTabMarket[]
    matchCouponKey: string
    oddsType: string
    provider: Provider
    resolvedOddsMarket: any
  }
  
  export interface MatchfactMarket {
    header: string
    headerTranslationKey: string
    selections: Selection[]
    fotMobMarketTypeId: FotMobMarketTypeId
  }
  
  export interface Selection {
    name: string
    oddsDecimal: string
    oddsAmerican: string
    oddsFraction: string
    couponKey: string
    team: any
    value: any
    link: string
  }
  
  export interface FotMobMarketTypeId {
    translationKey: string
  }
  
  export interface OddsTabMarket {
    category: string
    markets: Market[]
    multiMarketHeaders?: string[]
    multiMarkets?: MultiMarket[]
    inlineHeader?: boolean
    numStaticItems?: number
  }
  
  export interface Market {
    header: string
    headerTranslationKey: string
    selections: Selection2[]
    fotMobMarketTypeId: FotMobMarketTypeId2
  }
  
  export interface Selection2 {
    name: string
    oddsDecimal: string
    oddsAmerican: string
    oddsFraction: string
    couponKey: string
    team: any
    value?: string
    link?: string
  }
  
  export interface FotMobMarketTypeId2 {
    translationKey: string
  }
  
  export interface MultiMarket {
    name: string
    teamId: any
    teamName: any
    markets: Market2[]
  }
  
  export interface Market2 {
    selections: Selection3[]
  }
  
  export interface Selection3 {
    name: any
    oddsDecimal: string
    oddsAmerican: string
    oddsFraction: string
    couponKey: string
    team: any
    value: any
    link: string
  }
  
  export interface Provider {
    id: number
  }
  
  export interface Restrictions {
    country: string
    disableLiveOdds: boolean
    gambleAwareMsg: string
    showAgeGate: boolean
    ageLimit: number
    showOddsTab: boolean
    excludedLeagueIds: string[]
    excludedMatchIds: string[]
  }
  