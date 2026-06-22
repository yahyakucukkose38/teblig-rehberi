// Expo + Expo Router için Babel yapılandırması.
// Tüm import'lar göreli (relative) olduğundan ekstra alias/plugin gerekmez;
// bu sayede her ortamda (Expo Go, expo export, EAS --eager) sorunsuz çalışır.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
