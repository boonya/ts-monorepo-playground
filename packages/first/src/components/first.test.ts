import first from '@boonya/ts-monorepo-playground-first/components/first';

it('first test', () => {
  const result = first('my value');

  expect(result).toBe('first value is "my value".');
});
