import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.namhockey.app',
  appName: 'Nam Hockey',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#00008b",
      androidSplashResourceName: "splash",
      showSpinner: true,
      androidSpinnerStyle: "horizontal",
      iosSpinnerStyle: "small",
      spinnerColor: "#00008b",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useIonicAnimation: true,
    },
  }
};

export default config;
