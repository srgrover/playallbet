import { Category } from "./category.interface";
import { UniqueTournament } from "./unique-tournament.interface";
import { FieldTranslations } from "./field-translations.interface";

export interface Tournament {
    name: string
    slug: string
    category: Category
    uniqueTournament: UniqueTournament
    priority: number
    isLive: boolean
    id: number
    fieldTranslations: FieldTranslations
  }