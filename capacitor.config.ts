import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CashStash',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  },
  plugins:{
    CapacitorCookies: {
      enabled: true,
    },
  }
};

export default config;
