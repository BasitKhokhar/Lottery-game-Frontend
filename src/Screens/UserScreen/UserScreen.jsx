import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import ThemeToggleButton from "../../Components/Buttons/ThemeToggleButton";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../Components/Loader/Loader";
import { colors } from "../../Themes/colors";
import tinycolor from "tinycolor2";
import {apiFetch} from "../../apiFetch";
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UserScreen = () => {
  const {theme} = useTheme();
  const [userData, setUserData] = useState(null);
  // const [paymnetImgBtndata, setPaymnetImageBtnData] = useState(null);

  // const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
    
      // 2️⃣ Fetch User Data
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("User ID sednign to backend is:", storedUserId);
      // console.log("token sednign to backend is:", token);
      if (storedUserId) {
        const response = await apiFetch(`/users/${storedUserId}`
      );
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        console.log("reponse from usergetting API", data)
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data or image:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserData();
    setRefreshing(false);
  };

 const ICON_COLOR = theme.primary; // unified icon color

  return (
    <View style={[styles.maincontainer, { backgroundColor: theme.primaryLight }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.background }
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* LOADING */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <Loader />
          </View>
        ) : userData ? (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <View style={[styles.avatar, { borderColor: theme.primary }]}>
                <Text style={styles.avatarText}>
                  {userData?.name?.charAt(0)?.toUpperCase()}
                </Text>
              </View>

              <View style={styles.headingscontianer}>
                <Text style={[styles.title, { color: theme.primary }]}>
                  {userData?.name}
                </Text>
                <Text style={[styles.email, { color: theme.textPrimary }]}>
                  {userData?.email}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={[styles.text, { color: theme.textPrimary }]}>
            No user data found.
          </Text>
        )}

        {/* SECTION: GENERAL */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.heading, { color: theme.primary }]}>General</Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("AccountDetail", { userData })}
        >
          <View style={styles.leftContent}>
            <Icon name="person" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              Personal Info
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("aboutus")}
        >
          <View style={styles.leftContent}>
            <Icon name="info-outline" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              About Us
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        {/* THEME TOGGLE */}
        <View style={styles.section}>
          <View style={styles.leftContent}>
            <Icon name="brightness-6" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              Change Theme
            </Text>
          </View>
          <ThemeToggleButton />
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.heading, { color: theme.primary }]}>About</Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("aboutgame")}
        >
          <View style={styles.leftContent}>
            <Icon name="sports-esports" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              About Game
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("CustomerSupport", { userData })}
        >
          <View style={styles.leftContent}>
            <Icon name="support-agent" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              Customer Support
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("privacypolicy")}
        >
          <View style={styles.leftContent}>
            <Icon name="privacy-tip" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              Privacy Policy
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("faq", { userData })}
        >
          <View style={styles.leftContent}>
            <Icon name="help-outline" size={24} color={ICON_COLOR} />
            <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
              FAQs
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={theme.textSecondary} />
        </TouchableOpacity>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate("Logout", { userData })}
        >
          <View style={styles.leftContent}>
            <Icon name="logout" size={24} color="#e74c3c" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    // backgroundColor: tinycolor("#DC143C").brighten(10).toString(),
    // color: colors.primary,
    paddingTop: 50,
    paddingRight: 16,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    // color: colors.background,
    padding: 16,
    borderTopRightRadius: 80
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    color: '#fff',
  },
  profileContainer: {
    width: "100%",
    // height: "100%",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    
    
  },
 avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor:  tinycolor("#DC143C").brighten(10).toString(),
    backgroundColor: '#000', // You can change to your theme color
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  defaultProfileCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    color: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
    // justifyContent: "space-between",
    width: "100%",
    borderRadius: 10,
  },
  headingscontianer: {
    display: 'flex',
    flexDirection: 'column',

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color:  tinycolor("#DC143C").brighten(10).toString()
  },
  email: {
    fontSize: 14,
    // fontWeight: "bold",
   
  },
  cardButton: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    color: colors.background,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
    marginVertical:5
  },
  line: {
    flex: 1,
    height: 2,
    color: colors.primary,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  leftContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'red',
  },
  logout: {
    borderBottomWidth: 0
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: "#555"
  },
  iconscontainer: {
    display: 'flex',
  },
});

export default UserScreen;
