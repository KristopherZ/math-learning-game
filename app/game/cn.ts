export function cx(...names: Array<string | false | null | undefined>) {
  return names.filter((name): name is string => Boolean(name)).join(' ');
}
