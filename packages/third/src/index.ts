import first from '@boonya/ts-monorepo-playground-first/components/first'
import second from '@boonya/ts-monorepo-playground-second/hook'

export default (value: string) => {
  return `${first(value)} + ${second(value)}`;
}
