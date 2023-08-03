import hook from './hook';

it('should return default value.', () => {
  expect(hook()).toBe("I am a hook that returns a word \"-\". And I am changed a bit.");
})

it('should return specific value.', () => {
  expect(hook('WoRD')).toBe("I am a hook that returns a word \"WoRD\". And I am changed a bit.");
})
