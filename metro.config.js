const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// The `openai` SDK's package.json "exports" map resolves to its ESM (.mjs) build by
// default, which Metro cannot bundle (it only understands CJS/.js). Disabling package
// exports resolution makes Metro fall back to the "main" field, which points at the
// CJS build instead.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
