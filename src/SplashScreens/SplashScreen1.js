
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import tinycolor from "tinycolor2";
import * as Animatable from "react-native-animatable";

import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// import { useTheme } from "../../context/ThemeContext";
// import { useTheme } from "../context/ThemeContext";
// import { colors } from "../Themes/colors";
const SplashScreen1 = () => {
    // const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Animatable.Image
          animation="zoomIn"
          duration={3000}
          source={require("./../../assets/logo11.png")}
          style={styles.image}
        />

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Made With <FontAwesome name="heart" size={24} color="gray" /></Text>
        <Text style={styles.bottomText}>By Basit khokhar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    resizeMode: "contain",
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 80,
  },
  bottomText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: "center",
     textShadowColor: "rgba(0,0,0,0.6)",
          textShadowOffset: { width: 2, height: 2 }, borderTopColor: "rgba(0,0,0,0.3)",
          textShadowRadius: 4,
  },
});

export default SplashScreen1;
