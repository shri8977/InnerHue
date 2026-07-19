import reflectiveMoods, { ReflectiveMood } from '../lib/reflectiveMoods';
import { reflectiveToTraditionalMapping } from '../lib/moodMapping';

describe('reflectiveMoods data structure', () => {
  it('contains 30 reflective moods', () => {
    expect(reflectiveMoods).toHaveLength(32);
  });

  it('every mood has required fields', () => {
    reflectiveMoods.forEach((mood: ReflectiveMood) => {
      expect(mood.id).toBeTruthy();
      expect(mood.label).toBeTruthy();
      expect(mood.tone).toBeTruthy();
      expect(mood.category).toBeTruthy();
      expect(mood.color).toBeTruthy();
      expect(mood.glow).toBeTruthy();
    });
  });

  it('every mood id is unique', () => {
    const ids = reflectiveMoods.map(m => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every color is a valid hex code', () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    reflectiveMoods.forEach(mood => {
      expect(mood.color).toMatch(hexRegex);
      expect(mood.glow).toMatch(hexRegex);
    });
  });

  it('every tone is one of the valid values', () => {
    const validTones = ['calm', 'stress', 'hopeful', 'neutral'];
    reflectiveMoods.forEach(mood => {
      expect(validTones).toContain(mood.tone);
    });
  });

  it('every mood id has a mapping entry', () => {
    reflectiveMoods.forEach(mood => {
      expect(reflectiveToTraditionalMapping).toHaveProperty(mood.id);
    });
  });
});

describe('reflective mood color consistency', () => {
  it('all calm tone moods share the same color', () => {
    const calmMoods = reflectiveMoods.filter(m => m.tone === 'calm');
    const colors = new Set(calmMoods.map(m => m.color));
    expect(colors.size).toBe(1);
    expect(colors.has('#A3B18A')).toBe(true);
  });

  it('all stress tone moods share the same color', () => {
    const stressMoods = reflectiveMoods.filter(m => m.tone === 'stress');
    const colors = new Set(stressMoods.map(m => m.color));
    expect(colors.size).toBe(1);
    expect(colors.has('#D4A373')).toBe(true);
  });

  it('all hopeful tone moods share the same color', () => {
    const hopefulMoods = reflectiveMoods.filter(m => m.tone === 'hopeful');
    const colors = new Set(hopefulMoods.map(m => m.color));
    expect(colors.size).toBe(1);
    expect(colors.has('#C8A2C8')).toBe(true);
  });

  it('all neutral tone moods share the same color', () => {
    const neutralMoods = reflectiveMoods.filter(m => m.tone === 'neutral');
    const colors = new Set(neutralMoods.map(m => m.color));
    expect(colors.size).toBe(1);
    expect(colors.has('#EAE3DA')).toBe(true);
  });
});
