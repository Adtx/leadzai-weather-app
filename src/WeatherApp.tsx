import * as S from "./styles"
import { useEffect, useRef, useState } from "react"
import { fetchWeatherInfo } from "./apiUtils"
import { TemperatureDisplay } from "./components/TemperatureDisplay/TemperatureDisplay"
import { LocationPicker } from "./components/LocationPicker/LocationPicker"
import { UNITS, UnitsToggle } from "./components/UnitsToggle/UnitsToggle"
import { WeatherIcon } from "./components/WeatherIcon/WeatherIcon"
import { DaylightClock } from "./DaylightClock/DaylightClock"
import { displayDataType } from "./types"

export const WeatherApp = () => {
  const [displayData, setDisplayData] = useState<displayDataType>({
    location: "Lisbon",
    temperature: null,
    weatherIcon: {
      icon: "",
      description: "",
    },
    daylightTimes: {
      sunrise: 0,
      sunset: 0,
    },
  })
  const [unit, setUnit] = useState(0)
  const [openLocationPicker, setOpenLocationPicker] = useState(false)

  const locationPickerRef = useRef(null)

  useEffect(() => {
    fetchWeatherInfo(displayData.location, unit).then((weatherInfo) => {
      const { temp, description, icon, sunrise, sunset } = weatherInfo!
      setDisplayData((displayData) => ({
        ...displayData,
        temperature:
          temp.toFixed() + " " + (unit === UNITS.CELSIUS ? "ºC" : "ºF"),
        weatherIcon: { icon, description },
        daylightTimes: { sunrise, sunset },
      }))
    })
  }, [displayData.location, unit])

  const closeLocationPicker = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (
      locationPickerRef.current &&
      !(locationPickerRef.current as HTMLDivElement).contains(
        e.target as HTMLElement
      )
    )
      setOpenLocationPicker(false)
  }

  const locationPickerProps = {
    setDisplayData,
    locationPickerRef,
    displayLocationsMenu: openLocationPicker,
    setDisplayLocationsMenu: setOpenLocationPicker,
  }

  return (
    <S.StyledWeatherApp onClick={closeLocationPicker}>
      <S.Header>
        <S.Title>Weather app</S.Title>
      </S.Header>
      <S.InputArea>
        <LocationPicker {...locationPickerProps} />
        <UnitsToggle setUnit={setUnit} />
      </S.InputArea>
      <TemperatureDisplay temperature={displayData.temperature!} />
      <WeatherIcon icon={displayData.weatherIcon} />
      <DaylightClock daylightTimes={displayData.daylightTimes} />
    </S.StyledWeatherApp>
  )
}
