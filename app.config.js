
import 'dotenv/config';

export default () => ({
  expo: {
    name: "Lottery",
    slug: "bk-lottery-app",
    owner: "basitkhokhar4949",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/iconimage.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/iconimage.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    android: {
      package: "com.basitkhokhar.sanitaryapp",
      adaptiveIcon: {
        foregroundImage: "./assets/iconimage.png",
      }
    },
    web: {
      favicon: "./assets/iconimage.png"
    },
    plugins: [
      "expo-secure-store",
      "expo-web-browser",
      "expo-audio",
      "expo-video",
       "expo-asset"
    ],
    extra: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: process.env.EXPO_PROJECT_ID 
      }
    }
  }
});
