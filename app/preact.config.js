module.exports = (config, env, helpers, params = defaultParams) => {
  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: ["./src/**/*.{js,jsx,ts,tsx}"],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(params.regex) || [],
  });

  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    if (!loader.options.postcssOptions) {
      loader.options.postCssLoaders = [];
      if (!loader.options.postCssLoaders.plugins) {
        loader.options.postCssLoaders.plugins = [];
      }
    }

    const plugins = loader.options.postcssOptions.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require("tailwindcss"));

    // Add PurgeCSS only in production.
    if (env.production) {
      plugins.push(purgecss);
    }
  });
  return config;
};
