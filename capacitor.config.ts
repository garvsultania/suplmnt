
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fec8636fa2964665b51c9559bdb9d968',
  appName: 'suplmnt',
  webDir: 'dist',
  server: {
    url: "https://fec8636f-a296-4665-b51c-9559bdb9d968.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4ECDC4",
      showSpinner: false
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: "#4ECDC4"
    }
  }
};

export default config;
