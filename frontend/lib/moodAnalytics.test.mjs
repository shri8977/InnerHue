import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMoodTrendData, buildHourlyDistribution, getMoodStreakSummary } from './moodAnalytics.js';

test('buildMoodTrendData groups entries by day for the last seven days', () => {
  const referenceDate = new Date('2024-01-10T12:00:00.000Z');
  const entries = [
    { timestamp: '2024-01-05T09:00:00.000Z', mood: 'happy' },
    { timestamp: '2024-01-06T10:00:00.000Z', mood: 'calm' },
    { timestamp: '2024-01-06T12:00:00.000Z', mood: 'sad' },
    { timestamp: '2024-01-10T08:00:00.000Z', mood: 'angry' },
  ];

  const data = buildMoodTrendData(entries, referenceDate);
  assert.equal(data.length, 7);
  assert.equal(data[data.length - 1].count, 1);
  assert.equal(data[2].count, 2);
});

test('buildHourlyDistribution counts entries by hour', () => {
  const entries = [
    { timestamp: '2024-01-10T09:15:00.000Z', mood: 'happy' },
    { timestamp: '2024-01-10T09:45:00.000Z', mood: 'calm' },
    { timestamp: '2024-01-10T18:00:00.000Z', mood: 'sad' },
  ];

  const data = buildHourlyDistribution(entries);
  assert.equal(data[9].count, 2);
  assert.equal(data[18].count, 1);
});

test('getMoodStreakSummary returns current and longest streaks', () => {
  const referenceDate = new Date('2024-01-10T12:00:00.000Z');
  const entries = [
    { timestamp: '2024-01-08T09:00:00.000Z', mood: 'happy' },
    { timestamp: '2024-01-09T10:00:00.000Z', mood: 'calm' },
    { timestamp: '2024-01-10T12:00:00.000Z', mood: 'sad' },
  ];

  const summary = getMoodStreakSummary(entries, referenceDate);
  assert.equal(summary.currentStreak, 3);
  assert.equal(summary.longestStreak, 3);
});
