module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }], // For Expo and Nativewind
      "nativewind/babel", // Babel support for Nativewind
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV", // Specify the environment variable prefix if needed
          moduleName: "@env", // Alias for importing environment variables
          path: ".env", // Path to the .env file
          blocklist: null, // Optionally block specific variables
          allowlist: null, // Optionally allow specific variables
          safe: false, // Disable safe mode (not checking for .env.example)
          allowUndefined: true, // Allow undefined variables
        },
      ],
      // Other plugins can go here
      "react-native-reanimated/plugin", // Always keep this as the last plugin
    ],
  };
};
