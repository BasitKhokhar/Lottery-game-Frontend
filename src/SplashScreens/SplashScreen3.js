
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import tinycolor from "tinycolor2";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen3 = ({ onNext }) => {

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Image
          source={require('./../../assets/onboarding2.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.title}>Play Live with Others Instantly</Text>
        <Text style={styles.description}>
          Join up to 8 players in a fast-paced session. Every click changes the game for everyone.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  topcontainer: {
    width: "100%",
    height: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative"
  },
  image: {
    // marginTop: '30%',
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  blurOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50, // Blur height
  },
  contentcontainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: tinycolor('#DC143C').brighten(10).toString(),
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'justify',
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 80,
    width: "100%"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen3;
