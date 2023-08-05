
module.exports = {
  core: { builder: 'webpack5' },
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)',
    '../**/**/*.stories.@(js|jsx|ts|tsx)',],
  addons: ['@storybook/addon-essentials'],
};
