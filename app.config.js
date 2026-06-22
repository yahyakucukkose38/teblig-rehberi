const appJson = require('./app.json');

const base = appJson.expo;

const env = (key, fallback) => {
  const value = process.env[key];
  return value === undefined || value === '' ? fallback : value;
};

module.exports = {
  expo: {
    ...base,
    name: env('EXPO_PUBLIC_APP_NAME', base.name),
    slug: env('EXPO_PUBLIC_APP_SLUG', base.slug),
    scheme: env('EXPO_PUBLIC_APP_SCHEME', base.scheme),
    ios: {
      ...base.ios,
      bundleIdentifier: env(
        'EXPO_PUBLIC_IOS_BUNDLE_IDENTIFIER',
        base.ios.bundleIdentifier,
      ),
    },
    android: {
      ...base.android,
      package: env('EXPO_PUBLIC_ANDROID_PACKAGE', base.android.package),
    },
    extra: {
      ...base.extra,
      supportEmail: env('EXPO_PUBLIC_SUPPORT_EMAIL', ''),
      privacyPolicyUrl: env('EXPO_PUBLIC_PRIVACY_POLICY_URL', ''),
      eas: {
        ...base.extra.eas,
        projectId: env('EAS_PROJECT_ID', base.extra.eas.projectId),
      },
    },
  },
};
