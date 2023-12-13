module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        '@babel/plugin-proposal-export-namespace-from',
        {
          // Opções do plugin, se necessário
        }
      ],
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
          },
        },
      ],
    ],
  };
};
