import func from '.';

it('should return specific string.', () => {
  expect(func('A Value')).toBe(`first value is "A Value". + I am a hook that returns a word "A Value". And I am changed a bit.`);
})
