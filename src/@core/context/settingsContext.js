// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

let initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
  selectedProject: ''
}


// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  try {
    const settingStr = localStorage.getItem("settings");
    if (settingStr) {
      initialSettings = JSON.parse(settingStr);
    }
  } catch (err) {
  }

  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings])

  const saveSettings = async updatedSettings => {
    setSettings(updatedSettings)

  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
