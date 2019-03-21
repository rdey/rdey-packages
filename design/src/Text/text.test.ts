import { fontMixin } from '.';
import { fontFileNames } from './nativeFonts';

describe('fontMixin', () => {
  test('defaults', () => {
    const mixin = fontMixin({
      key: 'primary',
      native: true,
    });
    expect(mixin).toBe('font-family: inter-regular;');
  });
  test('secondary', () => {
    const mixin = fontMixin({
      key: 'secondary',
      native: true,
    });
    expect(mixin).toBe('font-family: oswald-regular;');
  });
  test('italic', () => {
    const mixin = fontMixin({
      key: 'primary',
      fontStyle: 'italic',
      native: true,
    });
    expect(mixin).toBe('font-family: inter-italic;');
  });
  test('italic heavy', () => {
    const mixin = fontMixin({
      key: 'primary',
      fontStyle: 'italic',
      fontWeight: 'bold',
      native: true,
    });
    expect(mixin).toBe('font-family: inter-bold-italic;');
  });
  test('fontFileNames', () => {
    console.log(fontFileNames);
  });
});
