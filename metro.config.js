// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push("cjs");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
