"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput, CommandEmpty } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Habit } from "@/types/data";

interface HabitFilterProps {
  habits: Habit[];
  selected: number[];
  onChange: (values: number[]) => void;
}

export function HabitFilter({ habits, selected, onChange }: HabitFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleHabit = (id: number) => {
    const updated = selected.includes(id)
      ? selected.filter(h => h !== id)
      : [...selected, id];

    onChange(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Filter Habit
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="Search habit..." />
          <CommandEmpty>No habits found.</CommandEmpty>

          <CommandGroup>
            {habits.map((habit) => (
              <CommandItem
                key={habit.id}
                value={habit.name}
                onSelect={() => toggleHabit(habit.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded" style={{ backgroundColor: habit.color }} />
                  <span>{habit.name}</span>
                </div>

                {selected.includes(habit.id) && (
                  <Check className="h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
