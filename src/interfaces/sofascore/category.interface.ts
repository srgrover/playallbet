import { Sport } from "./sport.interface";
import { Country } from "./country.interface";
import { FieldTranslations } from "./field-translations.interface";

export interface Category {
    name: string
    slug: string
    sport: Sport
    country: Country
    id: number
    flag: string
    alpha2?: string
    fieldTranslations: FieldTranslations
  }