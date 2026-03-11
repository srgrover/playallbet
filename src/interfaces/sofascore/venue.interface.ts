import { Country } from "./country.interface"
import { FieldTranslations } from "./field-translations.interface"

export interface Venue {
    venueCoordinates: VenueCoordinates
    hidden: boolean
    slug: string
    name: string
    capacity: number
    country: Country
    id: number
    city: City
    fieldTranslations: FieldTranslations
    stadium: Stadium
  }
  
  export interface VenueCoordinates {
    latitude: number
    longitude: number
  }

  export interface City {
    name: string
  }

  export interface Stadium {
    name: string
    capacity: number
  }