"use client";

import { useEffect, useState } from "react";
import { habits } from "@/data/habits";
import { getTodayDate } from "@/lib/date";
import MonthCalendar from "./month-calendar";
import StatsDashboard from "../stats/stats-dashboard";
import MoodChart from "../stats/mood-chart";

const STORAGE_KEY = "habit-tracker-data";

type DayData = {
  habits: number[];
  mood?: number;
  motivation?: number;
};

type HabitData = {
  [date: string]: DayData;
};

export default function HabitTracker() {
  const today = getTodayDate();
  const [selectedDate, setSelectedDate] =
  useState(today);

  const [habitData, setHabitData] = useState<HabitData>({});

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      setHabitData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(habitData)
    );
  }, [habitData]);

  const completedHabits = 
  habitData[selectedDate]?.habits || [];

  function toggleHabit(id: number) {
    const currentHabits = habitData[selectedDate]?.habits || [];

    let updatedHabits;

    if (currentHabits.includes(id)) {
      updatedHabits = currentHabits.filter(
        (habitId) => habitId !== id
      );
    } else {
      updatedHabits = [...currentHabits, id];
    }
      setHabitData({
  ...habitData,
  [selectedDate]: {
    ...habitData[selectedDate],
    habits: updatedHabits,
  },
});
  }

  const completionRate = Math.round(
    (completedHabits.length / habits.length) * 100
  );

  return (
  <div className="mt-10 space-y-10">
    
    {/* HEADER */}
    <div className="rounded-2xl bg-neutral-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Today's Habits
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            {selectedDate}
          </p>
        </div>

        <div className="text-sm text-neutral-400">
          {completionRate}% completed
        </div>
      </div>

      {/* HABITS */}
      <div className="mt-6 space-y-4">
        {habits.map((habit) => {
          const completed = completedHabits.includes(habit.id);

          return (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                completed
                  ? "border-green-500 bg-green-500/20"
                  : "border-neutral-700 bg-neutral-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <span className="text-lg">{habit.name}</span>
                </div>

                <div>{completed ? "✅" : "⭕"}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    {/* ANALYTICS */}
    <StatsDashboard habitData={habitData} />
    <MoodChart habitData={habitData} />

    {/* CALENDAR */}
    <MonthCalendar
      habitData={habitData}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />

  </div>
);
}
