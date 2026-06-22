// Expo varsayılan Metro yapılandırması (expo/metro-config'i genişletir).
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
