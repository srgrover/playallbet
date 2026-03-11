import { Country } from "./country.interface"
import { FieldTranslations } from "./field-translations.interface"
import { Sport } from "./sport.interface"

export interface Team {
    name: string
    slug: string
    shortName: string
    gender: string
    sport: Sport
    userCount: number
    nameCode: string
    disabled: boolean
    national: boolean
    type: number
    country: Country
    id: number
    teamColors: TeamColors
    fieldTranslations: FieldTranslations
  }

  export interface TeamColors {
    primary: string
    secondary: string
    text: string
  }