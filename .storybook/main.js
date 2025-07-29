

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "core": {
    "disableTelemetry": true
  },
  "watchOptions": {
    "aggregateTimeout": 300,
    "poll": 1000,
    "ignored": ['**/node_modules', '**/lib/dist', '**/storybook-static']
  }
};
export default config;