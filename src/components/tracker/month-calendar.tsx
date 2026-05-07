"use client";

import { habits } from "@/data/habits";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";

type DayData = {
  habits: number[];
  mood?: number;
  motivation?: number;
};

type HabitData = {
  [date: string]: DayData;
};

type Props = {
  habitData: HabitData;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

export default function MonthCalendar({
  habitData,
  selectedDate,
  setSelectedDate,
}: Props) {
  const today = new Date();

  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  function getCompletionColor(date: string) {
    const completed =
      habitData[date]?.habits.length || 0;

    if (completed === 0) {
      return "bg-neutral-800";
    }

    if (completed === habits.length) {
      return "bg-green-500";
    }

    return "bg-yellow-600";
  }

  return (
    <div className="mt-10 rounded-2xl bg-neutral-900 p-6">
      <h2 className="text-2xl font-semibold">
        Monthly Overview
      </h2>

      <div className="mt-6 grid grid-cols-7 gap-3">
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");

          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDate(dateKey)}
              className={`aspect-square rounded-xl p-2 text-sm transition border ${
                selectedDate === dateKey
                  ? "border-white"
                  : "border-transparent"
              } ${getCompletionColor(dateKey)}`}
            >
              <div className="flex h-full items-start justify-end">
                {format(day, "d")}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-neutral-800" />
          None
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-yellow-600" />
          Partial
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-green-500" />
          Complete
        </div>
      </div>
    </div>
  );
}
