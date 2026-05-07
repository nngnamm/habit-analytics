import { calculateStreaks } from "@/lib/streak";

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
};

export default function StatsDashboard({
  habitData,
}: Props) {
  const days = Object.values(habitData);

  const totalDays = days.length;
const streaks = calculateStreaks(
  Object.keys(habitData)
);
  const totalHabitsCompleted = days.reduce(
    (acc, day) => acc + day.habits.length,
    0
  );

  const averageMood =
    days
      .filter((day) => day.mood)
      .reduce((acc, day) => acc + (day.mood || 0), 0) /
      days.filter((day) => day.mood).length || 0;

  const averageMotivation =
    days
      .filter((day) => day.motivation)
      .reduce(
        (acc, day) => acc + (day.motivation || 0),
        0
      ) /
      days.filter((day) => day.motivation).length || 0;

  return (
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-neutral-900 p-6">
        <p className="text-sm text-neutral-400">
          Tracked Days
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalDays}
        </h2>
      </div>

      <div className="rounded-2xl bg-neutral-900 p-6">
        <p className="text-sm text-neutral-400">
          Completed Habits
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalHabitsCompleted}
        </h2>
      </div>

      <div className="rounded-2xl bg-neutral-900 p-6">
        <p className="text-sm text-neutral-400">
          Average Mood
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {averageMood.toFixed(1)}
        </h2>
      </div>

      <div className="rounded-2xl bg-neutral-900 p-6">
        <p className="text-sm text-neutral-400">
          Average Motivation
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {averageMotivation.toFixed(1)}
        </h2>
      </div>
    <div className="rounded-2xl bg-neutral-900 p-6">
  <p className="text-sm text-neutral-400">
    Current Streak
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    🔥 {streaks.currentStreak}
  </h2>
</div>

<div className="rounded-2xl bg-neutral-900 p-6">
  <p className="text-sm text-neutral-400">
    Best Streak
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    🏆 {streaks.bestStreak}
  </h2>
</div>
      </div>
  );
}
