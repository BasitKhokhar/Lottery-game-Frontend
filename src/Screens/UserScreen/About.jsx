
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import tinycolor from "tinycolor2";
import { useTheme } from "../../context/ThemeContext";
import {apiFetch} from "../../apiFetch";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

export default function AboutGame() {
  const {theme} = useTheme();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const primaryColor = tinycolor("#DC143C").brighten(10).toString();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/content/about-game`
      );

        if (!res.ok) throw new Error("Failed to fetch About Game");

        const data = await res.json();
        setAbout(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load game details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
     showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : about ? (
        <View style={styles.textcontainer}>
          <Text style={[styles.title,{color: theme.primary}]}>{about.title}</Text>
          <Text style={[styles.content, {color: theme.textPrimary}]}>{about.content}</Text>
        </View>
      ) : (
        <Text style={styles.error}>No game details found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
    textcontainer:{
  paddingBottom:50

  },
  title: {
    marginTop:10,
    textAlign:'center',
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(80, 79, 79, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    borderTopColor: "rgba(0,0,0,0.3)",
  },
  content: {
   fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginLeft: 5,
    marginTop: 10,
    paddingTop: 10,
    borderBottomColor: "white",
    borderTopColor: "rgba(0,0,0,0.3)",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    lineHeight: 26,
  },
  error: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
});
