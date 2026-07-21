export interface MoodAnalyticsEntry {
  timestamp: string;
  mood: string;
  emotion?: string;
  notes?: string;
}

export interface MoodTrendPoint {
  label: string;
  date: string;
  count: number;
  mood: string | null;
}

export interface HourlyPoint {
  hour: string;
  count: number;
}

export interface MoodStreakSummary {
  currentStreak: number;
  longestStreak: number;
  latestEntryDate: string | null;
}

export function buildMoodTrendData(entries: MoodAnalyticsEntry[], referenceDate: Date = new Date()): MoodTrendPoint[] {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(referenceDate);
    date.setUTCDate(referenceDate.getUTCDate() - (6 - index));
    return date;
  });

  return days.map((day) => {
    const start = new Date(day);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setUTCHours(23, 59, 59, 999);

    const dayEntries = entries.filter((entry) => {
      const timestamp = new Date(entry.timestamp);
      return timestamp >= start && timestamp <= end;
    });

    const dominantMood = dayEntries.reduce<Record<string, number>>((acc, entry) => {
      const mood = entry.emotion || entry.mood || 'unknown';
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    const mostCommonMood = Object.entries(dominantMood).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
      label: day.toLocaleDateString('en', { weekday: 'short' }),
      date: day.toISOString().slice(0, 10),
      count: dayEntries.length,
      mood: mostCommonMood,
    };
  });
}

export function buildHourlyDistribution(entries: MoodAnalyticsEntry[]): HourlyPoint[] {
  const buckets = Array.from({ length: 24 }, (_, hour) => ({ hour: `${hour.toString().padStart(2, '0')}:00`, count: 0 }));

  entries.forEach((entry) => {
    const hour = new Date(entry.timestamp).getUTCHours();
    buckets[hour].count += 1;
  });

  return buckets;
}

export function getMoodStreakSummary(entries: MoodAnalyticsEntry[], referenceDate: Date = new Date()): MoodStreakSummary {
  const sorted = [...entries]
    .map((entry) => ({ ...entry, timestamp: new Date(entry.timestamp) }))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const latestDate = sorted[0]?.timestamp ?? referenceDate;
  const latestDay = new Date(latestDate);
  latestDay.setUTCHours(0, 0, 0, 0);

  const seenDays = new Set<string>();
  sorted.forEach((entry) => {
    const day = new Date(entry.timestamp);
    day.setUTCHours(0, 0, 0, 0);
    seenDays.add(day.toISOString().slice(0, 10));
  });

  const today = new Date(referenceDate);
  today.setUTCHours(0, 0, 0, 0);

  let currentStreak = 0;
  const cursor = new Date(today);
  while (seenDays.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  let longestStreak = 0;
  let tempStreak = 0;
  const dates = Array.from(seenDays).sort();
  let previousDate: Date | null = null;

  dates.forEach((dateString) => {
    const currentDate = new Date(dateString);
    if (previousDate && (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24) === 1) {
      tempStreak += 1;
    } else {
      tempStreak = 1;
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    previousDate = currentDate;
  });

  return {
    currentStreak,
    longestStreak,
    latestEntryDate: latestDate.toISOString(),
  };
}
