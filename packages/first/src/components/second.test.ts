import second from '@ts-monorepo-playground/first/components/second';

it('second test', () => {
  const result = second(342);

  expect(result).toBe('second value is "342".');
});
