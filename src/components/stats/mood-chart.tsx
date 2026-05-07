"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export default function MoodChart({ habitData }: Props) {
  const hasData = habitData && Object.keys(habitData).length > 0;

  if (!hasData) {
    return (
      <div className="mt-10 rounded-2xl bg-neutral-900 p-6">
        <h2 className="text-2xl font-semibold">
          Mood & Motivation Trends
        </h2>

        <p className="mt-4 text-neutral-400">
          No data yet. Start tracking habits to see insights.
        </p>
      </div>
    );
  }

  const chartData = Object.entries(habitData)
    .map(([date, data]) => ({
      date: date.slice(5),
      mood: data?.mood || 0,
      motivation: data?.motivation || 0,
    }))
    .sort(
      (a, b) =>
        new Date("2026-" + a.date).getTime() -
        new Date("2026-" + b.date).getTime()
    );

  return (
    <div className="mt-10 rounded-2xl bg-neutral-900 p-6">
      <h2 className="text-2xl font-semibold">
        Mood & Motivation Trends
      </h2>

      <div className="mt-8 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3b82f6"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="motivation"
              stroke="#a855f7"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
