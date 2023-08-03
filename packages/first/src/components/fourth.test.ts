import fourth from '@boonya/ts-monorepo-playground-first/components/fourth';

it('fourth test', () => {
  const result = fourth('This word');

  expect(result).toBe(`I am a hook that returns a word "This word". And I am changed a bit.`);
});
