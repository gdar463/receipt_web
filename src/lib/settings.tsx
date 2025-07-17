import { DateTime } from "luxon";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import z from "zod";

import { timezones } from "@/components/timezoneSelector";

export const settingsSchema = z.object({
  streamerMode: z.boolean().default(false),
  dateLocale: z.object({
    name: z.string().default("Rome"),
    key: z.string().default("Europe/Rome"),
  }),
});

export type Settings = z.infer<typeof settingsSchema>;

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
  return settingsSchema.parse(JSON.parse(val)!);
}

function setStoreSettings(options: Settings | null) {
  if (options) {
    localStorage.setItem(key, JSON.stringify(options));
  } else {
    localStorage.removeItem(key);
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    streamerMode: false,
    dateLocale: timezones.find((val) => {
      if (DateTime.local().zoneName === val.key) {
        return val;
      }
    })!,
  });

  const setSetting = useCallback(
    <T extends keyof Settings>(key: T, value: Settings[T]) => {
      setSettings({ ...settings, [key]: value });
      setStoreSettings({ ...settings, [key]: value });
    },
    [],
  );

  useEffect(() => {
    setSettings(getStoreSettings()!);
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
