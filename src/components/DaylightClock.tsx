import styled from "styled-components"

const StyledDaylightClock = styled.section`
  color: #fff;
  display: flex;
  font-size: 1rem;
  height: 10vh;
  margin-top: 20%;
  width: 65%;
  justify-content: space-around;
`
interface DaylightClockProps {
  location: string
  daylightTimes: { sunrise: number; sunset: number }
}

type LocaleTimezone = { locale: string; timezone: string }

const CITY_LOCALE_TIMEZONE_MAP: Record<string, LocaleTimezone> = {
  Lisbon: {
    locale: "pt-PT",
    timezone: "Europe/Lisbon",
  },
  London: {
    locale: "en-GB",
    timezone: "Europe/London",
  },
  Madrid: {
    locale: "es-ES",
    timezone: "Europe/Madrid",
  },
  Miami: {
    locale: "en-US",
    timezone: "America/New_York",
  },
  "New York": {
    locale: "en-US",
    timezone: "America/New_York",
  },
  Paris: {
    locale: "fr-FR",
    timezone: "Europe/Paris",
  },
  "Rio de Janeiro": {
    locale: "pt-BR",
    timezone: "America/Sao_Paulo",
  },
  Sydney: {
    locale: "en-AU",
    timezone: "Australia/Sydney",
  },
  Tokyo: {
    locale: "ja-JP",
    timezone: "Asia/Tokyo",
  },
}

export const DaylightClock = ({
  location,
  daylightTimes: { sunrise, sunset },
}: DaylightClockProps) => {
  const unixTimestampToCityLocalTime = (timestamp: number) => {
    const numericFormat = "2-digit" as const
    const options = {
      hour: numericFormat,
      minute: numericFormat,
      timeZone: CITY_LOCALE_TIMEZONE_MAP[location].timezone,
    }
    return `${new Intl.DateTimeFormat(
      CITY_LOCALE_TIMEZONE_MAP[location].locale,
      options
    ).format(new Date(timestamp * 1000))}`
  }

  return (
    <StyledDaylightClock>
      <p>{"Sunrise: " + unixTimestampToCityLocalTime(sunrise)}</p>
      <p>{"Sunset: " + unixTimestampToCityLocalTime(sunset)}</p>
    </StyledDaylightClock>
  )
}
