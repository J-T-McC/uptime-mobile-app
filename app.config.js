//TODO figure out how to pass build env props for dev vs prod

const apiEndpoint = process.env.REACT_NATIVE_APP_API
const sanctumEndpoint = process.env.REACT_NATIVE_APP_SANCTUM

export default {
  name: 'Uptime Mobile Application',
  slug: 'uptime-mobile-application',
  version: '1.0.0',
  icon: './assets/icon.png',
  splash: {
    'image': './assets/splash.png',
    'resizeMode': 'contain',
    'backgroundColor': '#000000'
  },
  updates: {
    'fallbackToCacheTimeout': 0
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#000000'
    }
  },
  extra: {
    //application env
    apiEndpoint: 'https://uptime-api.tysonmccarney.com/api',
    sanctumEndpoint: 'https://uptime-api.tysonmccarney.com',

    // apiEndpoint: 'http://api.laravel.test/api',
    // sanctumEndpoint: 'http://api.laravel.test',
  },
}