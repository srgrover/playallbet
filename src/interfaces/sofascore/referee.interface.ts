import { Country } from "./country.interface"
import { FieldTranslations } from "./field-translations.interface"
import { Sport } from "./sport.interface"

export interface Referee {
    name: string
    slug: string
    yellowCards: number
    redCards: number
    yellowRedCards: number
    games: number
    sport: Sport
    country: Country
    id: number
    fieldTranslations: FieldTranslations
  }