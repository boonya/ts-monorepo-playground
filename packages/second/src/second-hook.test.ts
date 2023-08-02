import hook from './second-hook';

it('should return specific string.', () => {
  expect(hook()).toBe("I am a hook that returns a word \"a word\".");
})
