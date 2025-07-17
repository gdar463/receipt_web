import { useSettings } from "@/lib/settings";

import { TimezoneSelector } from "../timezoneSelector";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

export function SettingsTab() {
  const settings = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <div className="font-dm flex flex-row justify-between items-center px-4">
        <div className="flex flex-col">
          <div className="text-base font-medium">Streamer Mode</div>
          <div className="text-base font-light">
            Hides your email in the dashboard.
          </div>
        </div>
        <Switch
          id="streamerMode"
          onCheckedChange={(val) => settings.setSetting("streamerMode", val)}
          checked={settings.options?.streamerMode}
        />
      </div>
      <Separator />
      <div className="font-dm flex flex-row justify-between items-center px-4">
        <div className="flex flex-col">
          <div className="text-base font-medium">Time Locale</div>
          <div className="text-base font-light">
            The locale used to display times.
          </div>
        </div>
        <TimezoneSelector
          tz={settings.options?.dateLocale!}
          setTimezone={(val) => settings.setSetting("dateLocale", val)}
        />
      </div>
    </div>
  );
}
