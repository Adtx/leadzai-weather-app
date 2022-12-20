export interface WeatherInfo {
  coord: Coordinates
  weather: Weather[]
  base: string
  main: MainInfo
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface Clouds {
  all: number
}

interface Wind {
  speed: number
  deg: number
  gust: number
}

interface MainInfo {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Coordinates {
  lon: number
  lat: number
}
