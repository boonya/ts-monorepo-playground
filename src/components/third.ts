import first from '@src/components/first';

export default (value: string) => {
  const fv = first(value);
  return `third value is "${value}" and ${fv}.`
};
