export function addons(entry = []) {
  return [...entry, 'storybook-addon-sketch/register'];
}

export function webpack(config: { entry: string[] } = { entry: [] }) {
  config.entry.push(require.resolve('storybook-addon-sketch/entry'));
  return config;
}
