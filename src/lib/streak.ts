import { differenceInCalendarDays } from "date-fns";

export function calculateStreaks(
  dates: string[]
) {
  if (dates.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  const sortedDates = [...dates].sort();

  let bestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const previous = new Date(sortedDates[i - 1]);
    const current = new Date(sortedDates[i]);

    const diff = differenceInCalendarDays(
      current,
      previous
    );

    if (diff === 1) {
      currentStreak++;
      bestStreak = Math.max(
        bestStreak,
        currentStreak
      );
    } else {
      currentStreak = 1;
    }
  }

  const lastDate = new Date(
    sortedDates[sortedDates.length - 1]
  );

  const today = new Date();

  const latestDiff =
    differenceInCalendarDays(today, lastDate);

  if (latestDiff > 1) {
    currentStreak = 0;
  }

  return {
    currentStreak,
    bestStreak,
  };
}
