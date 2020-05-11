module.exports = (api) => {
  // barを追加___https://eslint.org/docs/rules/func-names
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
