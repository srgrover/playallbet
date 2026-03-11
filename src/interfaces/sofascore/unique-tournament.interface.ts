import { Category } from "./category.interface";
import { Country } from "./country.interface";
import { FieldTranslations } from "./field-translations.interface";

export interface UniqueTournament {
    name: string
    slug: string
    primaryColorHex?: string
    secondaryColorHex: string
    category: Category
    userCount: number
    country: Country
    id: number
    displayInverseHomeAwayTeams: boolean
    fieldTranslations: FieldTranslations
  }