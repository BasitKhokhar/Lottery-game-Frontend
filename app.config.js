// import 'dotenv/config';

// export default () => ({
//   expo: {
//     name: "Lottery",
//     slug: "Lottery",
//     owner: "basitkhokhar4949",
//     version: "1.0.0",
//     orientation: "portrait",
//     icon: "./assets/iconimage.png",
//     userInterfaceStyle: "light",
//     splash: {
//       image: "./assets/iconimage.png",
//       resizeMode: "contain",
//       backgroundColor: "#ffffff"
//     },
//     android: {
//       package: "com.basitkhokhar.sanitaryapp",
//       adaptiveIcon: {
//         foregroundImage: "./assets/iconimage.png",
//       }
//     },
//     web: {
//       favicon: "./assets/iconimage.png"
//     },
//     plugins: [
//       "expo-secure-store",
//       "expo-web-browser",
//     ],
//     extra: {
//       stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//       API_BASE_URL: process.env.API_BASE_URL,
//       eas: {
//         "projectId": "efe6213b-a303-4ae6-b3f1-e8f715fbeb45"
//       },

//     }
//   }
// });
import 'dotenv/config';

export default () => ({
  expo: {
    name: "Lottery",
    slug: "Lottery",
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
      "expo-video"
    ],
    extra: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: "efe6213b-a303-4ae6-b3f1-e8f715fbeb45"
      }
    }
  }
});
