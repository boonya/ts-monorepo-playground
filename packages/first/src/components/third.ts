import first from '@boonya/ts-monorepo-playground-first/components/first';

export default (value: string) => {
  const fv = first(value);
  return `third value is "${value}" and ${fv}.`
};
