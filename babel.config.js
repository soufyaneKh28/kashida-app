module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }], // For Expo and Nativewind
      "nativewind/babel", // Babel support for Nativewind
    ],
    plugins: [
      // Other plugins can go here
      "react-native-reanimated/plugin", // Always keep this as the last plugin
    ],
  };
};