import { getTraditionalMoodId, reflectiveToTraditionalMapping } from '../lib/moodMapping';

describe('getTraditionalMoodId', () => {
  it('maps quiet-contentment to calm', () => {
    expect(getTraditionalMoodId('quiet-contentment')).toBe('calm');
  });
  it('maps gentle-ease to calm', () => {
    expect(getTraditionalMoodId('gentle-ease')).toBe('calm');
  });
  it('maps soft-presence to calm', () => {
    expect(getTraditionalMoodId('soft-presence')).toBe('calm');
  });
  it('maps grounded-stability to calm', () => {
    expect(getTraditionalMoodId('grounded-stability')).toBe('calm');
  });
  it('maps muted-optimism to hopeful', () => {
    expect(getTraditionalMoodId('muted-optimism')).toBe('hopeful');
  });
  it('maps emerging-clarity to hopeful', () => {
    expect(getTraditionalMoodId('emerging-clarity')).toBe('hopeful');
  });
  it('maps cautious-hope to hopeful', () => {
    expect(getTraditionalMoodId('cautious-hope')).toBe('hopeful');
  });
  it('maps renewed-determination to hopeful', () => {
    expect(getTraditionalMoodId('renewed-determination')).toBe('hopeful');
  });
  it('maps anticipatory-excitement to excited', () => {
    expect(getTraditionalMoodId('anticipatory-excitement')).toBe('excited');
  });
  it('maps purposeful-energy to energized', () => {
    expect(getTraditionalMoodId('purposeful-energy')).toBe('energized');
  });
  it('maps focused-drive to energized', () => {
    expect(getTraditionalMoodId('focused-drive')).toBe('energized');
  });
  it('maps lingering-restlessness to anxious', () => {
    expect(getTraditionalMoodId('lingering-restlessness')).toBe('anxious');
  });
  it('maps building-tension to anxious', () => {
    expect(getTraditionalMoodId('building-tension')).toBe('anxious');
  });
  it('maps social-fatigue to stressed', () => {
    expect(getTraditionalMoodId('social-fatigue')).toBe('stressed');
  });
  it('maps quiet-overwhelm to stressed', () => {
    expect(getTraditionalMoodId('quiet-overwhelm')).toBe('stressed');
  });
  it('maps scattered-thoughts to confused', () => {
    expect(getTraditionalMoodId('scattered-thoughts')).toBe('confused');
  });
  it('maps emotional-fog to confused', () => {
    expect(getTraditionalMoodId('emotional-fog')).toBe('confused');
  });
  it('maps gentle-melancholy to sad', () => {
    expect(getTraditionalMoodId('gentle-melancholy')).toBe('sad');
  });
  it('maps aching-loneliness to lonely', () => {
    expect(getTraditionalMoodId('aching-loneliness')).toBe('lonely');
  });
  it('maps tender-vulnerability to vulnerable', () => {
    expect(getTraditionalMoodId('tender-vulnerability')).toBe('vulnerable');
  });
  it('maps raw-emotion to overwhelmed', () => {
    expect(getTraditionalMoodId('raw-emotion')).toBe('overwhelmed');
  });
  it('maps creative-spark to inspired', () => {
    expect(getTraditionalMoodId('creative-spark')).toBe('inspired');
  });
  it('maps inspired-momentum to inspired', () => {
    expect(getTraditionalMoodId('inspired-momentum')).toBe('inspired');
  });
  it('maps lighthearted-joy to happy', () => {
    expect(getTraditionalMoodId('lighthearted-joy')).toBe('happy');
  });
  it('maps bittersweet-nostalgia to nostalgic', () => {
    expect(getTraditionalMoodId('bittersweet-nostalgia')).toBe('nostalgic');
  });
  it('maps restrained-frustration to frustrated', () => {
    expect(getTraditionalMoodId('restrained-frustration')).toBe('frustrated');
  });
  it('maps peaceful-resignation to peaceful', () => {
    expect(getTraditionalMoodId('peaceful-resignation')).toBe('peaceful');
  });
  it('maps thoughtful-distance to peaceful', () => {
    expect(getTraditionalMoodId('thoughtful-distance')).toBe('peaceful');
  });
  it('maps observant-stillness to calm', () => {
    expect(getTraditionalMoodId('observant-stillness')).toBe('calm');
  });
  it('maps curious-awareness to curious', () => {
    expect(getTraditionalMoodId('curious-awareness')).toBe('curious');
  });
  it('maps reflective-pause to peaceful', () => {
    expect(getTraditionalMoodId('reflective-pause')).toBe('peaceful');
  });
  it('maps tender-gratitude to grateful', () => {
    expect(getTraditionalMoodId('tender-gratitude')).toBe('grateful');
  });
  it('returns calm as default for unknown mood id', () => {
    expect(getTraditionalMoodId('unknown-mood')).toBe('calm');
  });
  it('returns calm as default for empty string', () => {
    expect(getTraditionalMoodId('')).toBe('calm');
  });
});

describe('reflectiveToTraditionalMapping', () => {
  it('contains all 38 reflective mood entries', () => {
    expect(Object.keys(reflectiveToTraditionalMapping)).toHaveLength(32);
  });

  it('all mapped values are valid traditional mood ids', () => {
    const validMoodIds = [
      'calm', 'hopeful', 'excited', 'grateful', 'energized',
      'anxious', 'stressed', 'confused', 'peaceful', 'vulnerable',
      'sad', 'lonely', 'overwhelmed', 'inspired', 'happy',
      'nostalgic', 'frustrated', 'curious',
    ];
    Object.values(reflectiveToTraditionalMapping).forEach(value => {
      expect(validMoodIds).toContain(value);
    });
  });
});
