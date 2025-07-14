import { useSettings } from "@/lib/settings";

import { Switch } from "../ui/switch";

export function SettingsTab() {
  const settings = useSettings();

  return (
    <div className="flex flex-col">
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
    </div>
  );
}
