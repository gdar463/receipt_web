import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Settings = {
  streamerMode: boolean;
};

export interface SettingsContext {
  setSetting: <T extends keyof Settings>(key: T, value: Settings[T]) => void;
  options: Settings | null;
}

const SettingsContext = createContext<SettingsContext | null>(null);

const key = "receipts.settings";

function getStoreSettings() {
  const val = localStorage.getItem(key);
  if (val == null) {
    return null;
  }
  return JSON.parse(val);
}

function setStoreSettings(options: Settings | null) {
  if (options) {
    localStorage.setItem(key, JSON.stringify(options));
  } else {
    localStorage.removeItem(key);
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({ streamerMode: false });

  const setSetting = useCallback(
    <T extends keyof Settings>(key: T, value: Settings[T]) => {
      setSettings({ ...settings, [key]: value });
      setStoreSettings({ ...settings, [key]: value });
    },
    [],
  );

  useEffect(() => {
    setSettings(getStoreSettings());
  }, []);

  return (
    <SettingsContext.Provider value={{ setSetting, options: settings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("use in context");
  }
  return context;
}
