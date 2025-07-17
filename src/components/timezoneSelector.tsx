import { getTimeZones } from "@vvo/tzdb";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const timezones = getTimeZones().map((value) => {
  return {
    name: value.mainCities[0],
    key: value.name,
    abbreviation: value.abbreviation,
    offset: value.currentTimeOffsetInMinutes,
  };
});

export type Timezone = {
  name: string;
  key: string;
};

function formatOffset(minutes: number) {
  return `UTC${minutes >= 0 ? "+" : ""}${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, `0`)}`;
}

export function TimezoneSelector({
  tz,
  setTimezone,
}: {
  tz: Timezone;
  setTimezone: (val: Timezone) => void;
}) {
  const [open, setOpen] = useState(false);

  console.log(tz);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {tz.name}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList className="overflow-y-scroll">
            <CommandEmpty>No timezones found.</CommandEmpty>
            <CommandGroup heading="Select a timezone">
              {timezones.map((value) => {
                return (
                  <CommandItem
                    key={value.key}
                    value={JSON.stringify({ name: value.name, key: value.key })}
                    onSelect={(val) => {
                      setTimezone(JSON.parse(val));
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <div>
                        {value.name} ({value.abbreviation})
                      </div>
                      <div className="text-gray-400">
                        {formatOffset(value.offset)}
                      </div>
                    </div>
                    <Check
                      className={`ml-auto ${value.key === tz.key ? "opacity-100" : "opacity-0"}`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
