import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import tinycolor from "tinycolor2";
import { useTheme } from "../../context/ThemeContext";
import * as SecureStore from "expo-secure-store";
import {apiFetch} from "../../apiFetch";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const AboutUsScreen = () => {
  const { theme } = useTheme();
  const [aboutMe, setAboutMe] = useState([]);
  const [missionVision, setMissionVision] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutRes = await apiFetch(`/content/aboutme`);
        const aboutData = await aboutRes.json();
        setAboutMe(aboutData);

        // Fetch Mission & Vision
        const mvRes = await apiFetch(`/content/missionvission`);
        const mvData = await mvRes.json();
        setMissionVision(mvData);

      } catch (error) {
        console.error("Error fetching About Us data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#DC143C" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
     showsVerticalScrollIndicator={false}>
      {/* <Text style={styles.heading}>About Me</Text> */}
      <View style={styles.imagemaincontainer}>
        <View style={styles.imagecontainer}>
          <Image source={require('../../../assets/basit.png')} style={styles.image} resizeMode="cover" />
        </View>
      </View>


      {aboutMe.map((item) => (
        <Text key={item.id} style={[styles.paragraph, { color: theme.textPrimary }]}>
          {item.paragraph}
        </Text>
      ))}

      <Text style={styles.heading}>Our Mission & Vision</Text>
      <View style={{paddingBottom:80}}>
        {missionVision.map((item) => (
          <View key={item.id} style={styles.missioncontainer} >
            <Text style={styles.missiontext}>
              {item.paragraph}
            </Text>
          </View>

        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: '#f8f8f8',
    marginBottom: 50
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#DC143C',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(80, 79, 79, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    borderTopColor: "rgba(0,0,0,0.3)",
  },
  imagemaincontainer: {
    display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
  imagecontainer: {
    width: 200,
    height: 200,

    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: tinycolor("#DC143C").lighten(10).toString(),
  },
  missioncontainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: tinycolor("#DC143C").lighten(10).toString(),
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: tinycolor("#DC143C").lighten(10).toString(),
  },
  missiontext: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'justify'
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    color: '#333',
    textAlign:'justify'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AboutUsScreen;
