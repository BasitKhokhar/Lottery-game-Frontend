import AppContainer from "./src/AppContainer";
import { ThemeProvider } from "./src/context/ThemeContext";
import { useTheme } from "./src/context/ThemeContext";
import React, { useState, useEffect } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

// import { tryRefreshToken } from "./src/apiFetch";
// splashscreens //
import SplashScreen from "./src/SplashScreens/SplashScreen";
import SplashScreen1 from "./src/SplashScreens/SplashScreen1";
import SplashScreen2 from "./src/SplashScreens/SplashScreen2";
import SplashScreen3 from "./src/SplashScreens/SplashScreen3";
import SplashScreen4 from "./src/SplashScreens/SplashScreen4";
import TermsScreen from "./src/SplashScreens/TermsConditions";
// Authentications Screens //
import SignupScreen from "./src/Components/Authentication/Signup";
import LoginScreen from "./src/Components/Authentication/Login";

// import HomeScreen from "./Components/Home";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import HomeScreengamesgrid from "./src/Screens/HomeScreen/homemain";
import GameScreen from "./src/Screens/Gamescreen/gamescreen";


import UserScreen from "./src/Screens/UserScreen/UserScreen";
// import CustomerSupportScreen from "./src/Screens/UserScreen/UserScreen";
import CustomerSupportScreen from "./src/Screens/UserScreen/CustomerSupportScreen";
import AccountDetailScreen from "./src/Screens/UserScreen/AccountDetailScreen";
import FAQ from "./src/Screens/UserScreen/FAQ";
import PrivacyPolicy from "./src/Screens/UserScreen/PrivacyPolicy";
import AboutGame from "./src/Screens/UserScreen/About";
import AboutUsScreen from "./src/Screens/UserScreen/AboutUs";

import PaymentSelectionScreen from "./src/Screens/PaymentScreen/PaymentMethods";
import JazzCashPaymentScreen from "./src/Screens/PaymentScreen/JazzCashScreen";
import EasypaisaPaymentScreen from "./src/Screens/PaymentScreen/EasyPaisaScreen";

import LogoutScreen from "./src/Screens/UserScreen/LogoutScreen";
// import StripePayment from "./Components/Cart/StripePayment";
import { colors } from "./src/Themes/colors";
import tinycolor from "tinycolor2";
import 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const stripeKey = Constants.expoConfig.extra.stripePublishableKey;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainLayout = ({ navigation, children, currentScreen }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: tinycolor(theme.primary).brighten(10).toString() }]}>
        <View style={styles.headerItem}>
          <Image source={require("./assets/logo2.png")} style={styles.logo} />
        </View>

        <View style={styles.headerItem}>
          <Text style={styles.appTitle}>M&S Lottery</Text>
        </View>

        <View style={styles.headerItem}>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")} style={styles.belliconmaincontainer}>
            <View style={styles.belliconContainer}>
              <Icon name="notifications" size={20} color="white" />
            </View>

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>{children}</View>
      <View style={styles.footercontainer}>
        <View style={[styles.footer, { backgroundColor: tinycolor(theme.primary).brighten(10).toString() }]}>
          {[
            { name: "Home", icon: "home" },
            // { name: "AI Photo", icon: "photo-camera" },
            // { name: "AI Video", icon: "video-library" },
            { name: "Profile", icon: "person" },
          ].map(({ name, icon }) => (
            <TouchableOpacity
              key={name}
              style={styles.footerButton}
              onPress={() => navigation.navigate(name)}
            >
              <Icon
                name={icon}
                size={24}
                color={currentScreen === name ? "white" : "black"}
              />
              {name === "Cart" > 0 && (
                <View style={styles.cartBadge}>
                  {/* <Text style={styles.cartCount}></Text> */}
                </View>
              )}
              <Text
                style={[
                  styles.footerText,
                  { color: currentScreen === name ? "white" : "black" },
                ]}
              >
                {name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </View>
  );
};
const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Home">
            <HomeScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI Photo">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="AI Photo">
            <AIPicsFeatureList />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="AI Video">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="AI Video">
            <Videoscreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Profile">
            <UserScreen />
          </MainLayout>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: colors.background, borderBottomWidth: 1, borderColor: colors.border
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const App = () => {
  const [userId, setUserId] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [isSplash1Visible, setIsSplash1Visible] = useState(true);
  const [isSplash2Visible, setIsSplash2Visible] = useState(null);
  const [isSplash3Visible, setIsSplash3Visible] = useState(null);
  const [isSplash4Visible, setIsSplash4Visible] = useState(null);
  const [showTerms, setShowTerms] = useState(null);
  useEffect(() => {
    const checkTerms = async () => {
      const accepted = await AsyncStorage.getItem("termsAccepted");
      setShowTerms(!accepted); // true if not accepted
    };
    checkTerms();
  }, []);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("refreshToken");
        console.log("refreshtoken in app.js is", token)
        const storedUserId = await AsyncStorage.getItem("userId");
        console.log("userid in app.js is", storedUserId)
        if (token && storedUserId) {
          setUserId(storedUserId);
          setIsSplash2Visible(false);
          setIsSplash3Visible(false);
          setIsSplash4Visible(false);
          setShowTerms(false)
        } else {
          setIsSplash2Visible(true);
          setIsSplash3Visible(false);
          setIsSplash4Visible(false);
          setShowTerms(false)
        }
      } catch (error) {
        console.error("Error checking login:", error);
      } finally {
        setCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const splashFlow = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsSplash1Visible(false);
    };

    splashFlow();
  }, []);

  if (isSplash1Visible) {
    return <SplashScreen1 />;
  }

  if (isSplash2Visible) {
    return <SplashScreen2 onNext={() => {
      setIsSplash2Visible(false);
      setIsSplash3Visible(true);
    }} />;
  }
  if (isSplash3Visible) {
    return <SplashScreen3 onNext={() => {
      setIsSplash3Visible(false);
      setIsSplash4Visible(true);
    }} />;
  }
  if (isSplash4Visible) {
    return <SplashScreen4 onNext={() => {
      setIsSplash4Visible(false)
      setShowTerms(true)
    }} />;
  }
  //   if (isSplash4Visible) {
  //   return <SplashScreen4 onNext={() => setIsSplash4Visible(false)} />;
  // }
  if (showTerms) {
    return <TermsScreen onNext={() => {
      setShowTerms(false)
    }} />;
  }

  if (checkingLogin) {
    return <SplashScreen />;
  }

  return (
    <AppContainer backgroundColor="#1A1A1A">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <StripeProvider
            publishableKey={stripeKey}
            merchantDisplayName="Basit Sanitary App"
          >
            <NavigationContainer>
              <Stack.Navigator initialRouteName={userId ? "Main" : "Login"}>
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" options={{ headerShown: false }}>
                  {(props) => <LoginScreen {...props} setUserId={setUserId} />}
                </Stack.Screen>
                <Stack.Screen name="Main" options={{ headerShown: false }}>
                  {(props) => <BottomTabs {...props} />}
                </Stack.Screen>
                <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Tapwingamesscreen" component={HomeScreengamesgrid} options={{ headerShown: false }} />

                <Stack.Screen name="PaymentmethodsScreen" component={PaymentSelectionScreen} options={{ title: "Payment Methods", ...commonHeaderOptions, }} />
                <Stack.Screen name="jazzcashscreenScreen" component={JazzCashPaymentScreen} options={{ title: "JazzCash", ...commonHeaderOptions, }} />
                <Stack.Screen name="easypaisaScreen" component={EasypaisaPaymentScreen} options={{ title: "EsayPaisa", ...commonHeaderOptions, }} />

                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={UserScreen} options={{ title: "Profile Details", ...commonHeaderOptions, }} />
                {/* <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} /> */}
                <Stack.Screen name="User" component={UserScreen} />
                <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
                <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
                <Stack.Screen name="aboutgame" component={AboutGame} />
                <Stack.Screen name="aboutus" component={AboutUsScreen} />
                <Stack.Screen name="privacypolicy" component={PrivacyPolicy} />
                <Stack.Screen name="faq" component={FAQ} options={{ title: "FAQs", ...commonHeaderOptions, }} />
                {/* <Stack.Screen name="StripePayment" component={StripePayment} /> */}
                <Stack.Screen name="Logout" component={LogoutScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </StripeProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </AppContainer>

  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#DC143C",
    paddingTop: 25,
    paddingBottom: 0,
    paddingHorizontal: 10,
    borderColor: 'black',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerItem: {
  },
  logo: {
    width: 60,
    height: 80,
    borderRadius: 5
    // resizeMode: "contain",
  },
  appTitle: {
    fontSize: 24, fontWeight: "bold", color: "white", textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 }, letterSpacing: 1,
    textShadowRadius: 4,
  },
  belliconmaincontainer: { paddingRight: 15 },
  belliconContainer: { padding: 7, backgroundColor: 'black', borderRadius: 50, },
  searchText: { flex: 1, color: "#555" },
  searchIcon: { marginLeft: 5 },
  body: { flex: 1, padding: 0 },
  footercontainer: {
    marginHorizontal: 15
  },
  footer: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 50,


  },
  footerButton: { alignItems: "center" },
  footerText: { fontSize: 12, fontWeight: "bold", marginTop: 5, color: 'white' },
});

