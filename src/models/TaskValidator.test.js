import { validateTitle, validateDescription } from './TaskValidator';

describe('TaskValidator', () => {

  test('valid title should pass', () => {
    expect(validateTitle('Study React')).toBe(true);
  });

  test('empty title should fail', () => {
    expect(validateTitle('')).toBe(false);
  });

  test('title longer than 50 chars should fail', () => {
    const longTitle = 'a'.repeat(51);
    expect(validateTitle(longTitle)).toBe(false);
  });

  test('valid description should pass', () => {
    expect(validateDescription('Short desc')).toBe(true);
  });

  test('description longer than 200 chars should fail', () => {
    const longDesc = 'a'.repeat(201);
    expect(validateDescription(longDesc)).toBe(false);
  });

});
