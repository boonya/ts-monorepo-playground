import hook from './hook';

it('should return default value.', () => {
  expect(hook()).toBe("I am a hook that returns a word \"-\".");
})

it('should return specific value.', () => {
  expect(hook('WoRD')).toBe("I am a hook that returns a word \"WoRD\".");
})
