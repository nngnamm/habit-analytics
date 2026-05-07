"use client";

import { useEffect, useState } from "react";
import { habits } from "@/data/habits";

const STORAGE_KEY = "habit-tracker-data";

export default function HabitTracker() {
  const [completedHabits, setCompletedHabits] = useState<number[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      setCompletedHabits(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(completedHabits)
    );
  }, [completedHabits]);

  function toggleHabit(id: number) {
    if (completedHabits.includes(id)) {
      setCompletedHabits(
        completedHabits.filter((habitId) => habitId !== id)
      );
    } else {
      setCompletedHabits([...completedHabits, id]);
    }
  }

  const completionRate = Math.round(
    (completedHabits.length / habits.length) * 100
  );

  return (
    <div className="mt-10 rounded-2xl bg-neutral-900 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Today's Habits
        </h2>

        <div className="text-sm text-neutral-400">
          {completionRate}% completed
        </div>
      </div>

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
                  <span className="text-2xl">
                    {habit.emoji}
                  </span>

                  <span className="text-lg">
                    {habit.name}
                  </span>
                </div>

                <div>
                  {completed ? "✅" : "⭕"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
