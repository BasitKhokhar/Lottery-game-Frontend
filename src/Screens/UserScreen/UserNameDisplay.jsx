// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import DateTimeDisplay from "./DateTimeDisplay";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { colors } from "../../Themes/colors";
// import { apiFetch } from "../../apiFetch";
// import tinycolor from "tinycolor2";
// import * as SecureStore from 'expo-secure-store';
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const UserNameDisplay = () => {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState("");
//   const [userImage, setUserImage] = useState(null);
//   const [totalPrize, setTotalPrize] = useState(0);

//   const fetchUserName = async () => {
//     const storedUserId = await AsyncStorage.getItem("userId");
//     // const token = await SecureStore.getItemAsync("jwt_token");

//     // if (!token) {
//     //   console.log("No token found, user might be logged out.");
//     //   return;
//     // }

//     if (storedUserId) {
//       try {
//         const response = await apiFetch(`/users/${storedUserId}`
//         //   , {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //     "Content-Type": "application/json",
//         //   },
//         // }
//       );

//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

//         const data = await response.json();
//         setUserName(data.name);

//         // Fetch total prize
//         const prizeResponse = await apiFetch(`/gamedata/total-prize`
//       );
//         const prizeData = await prizeResponse.json();
//         setTotalPrize(prizeData.totalPrize || 0);
//       } catch (error) {
//         console.error("Error fetching user name:", error);
//       }
//     }
//   };

//   // Load when component mounts
//   useEffect(() => {
//     fetchUserName();
//   }, []);

//   // Reload when screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchUserName();
//     }, [])
//   );

//   const baseColor = "#DC143C";
//   const brightColor = tinycolor(baseColor).brighten(10).toString();
//   const brighterColor = tinycolor(baseColor).brighten(20).toString();
//   return (
//     <LinearGradient
//       colors={[brighterColor, brightColor, brightColor]
//       }
//       start={{ x: 1, y: 1 }}
//       end={{ x: 0, y: 0 }}
//       style={styles.container}
//     >
//       <View style={styles.header}>
//         <Icon name="waving-hand" size={24} color="#ffffff" style={{
//           textShadowColor: "rgba(0,0,0,0.6)",
//           textShadowOffset: { width: 2, height: 2 }, borderTopColor: "rgba(0,0,0,0.3)",
//           textShadowRadius: 4,
//         }} />
//         <Text style={styles.text}>{userName ? `Welcome, ${userName}!` : "Loading..."}</Text>
//       </View>
//       <Text style={styles.text1}>Pakistan’s #1 Real-Time Lottery Game!</Text>
//       {/* Total Prize Section */}
//       <View style={styles.prizemaincontainer}>
//         <View style={styles.prizeContainer}>
//           <Text style={styles.prizeLabel}>💰 </Text>
//           <Text style={styles.prizeValue}>Rs {totalPrize}</Text>
//         </View>
//         <View style={styles.buyButtoncontainer}>
//           <TouchableOpacity
//             style={styles.buyButton}
//             onPress={() => navigation.navigate('')}
//           >
//             <Text style={styles.buyButtonText}>Withdraw</Text>
//           </TouchableOpacity>
//         </View>
//       </View>


//       <View>
//         <DateTimeDisplay />
//       </View>
//     </LinearGradient>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     alignItems: "flex-start",
//     height: 200,
//     paddingTop: 20,
//     paddingBottom: 70,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     // Shadow for iOS
//     shadowColor: "rgba(0,0,0,0.5)",
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     // Shadow for Android
//     elevation: 10,
//   },
//   text: {
//     fontSize: 24, fontWeight: "bold", color: "white", textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 2, height: 2 }, borderTopColor: "rgba(0,0,0,0.3)",
//     textShadowRadius: 4,
//   },
//   text1: {
//     fontSize: 18, color: 'white', fontWeight: '700', marginLeft: 25, marginTop: 10, paddingTop: 10, borderTopWidth: 1,
//     borderBottomColor: 'white', borderTopColor: "rgba(0,0,0,0.3)", textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//   },
//   header: {
//     display: "flex",
//     width: "100%",
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//     paddingHorizontal: 25,
//     // paddingBottom: 10
//   },
//   prizemaincontainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '93%' },
//   prizeContainer: {
//     display: 'flex', flexDirection: 'row', alignItems: 'center',
//     // marginTop: 15,
//     marginLeft: 25,
//     marginVertical: 15
//   },
//   prizeLabel: {
//     fontSize: 24,
//     color: "white",
//     fontWeight: "bold",
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//   },
//   prizeValue: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#FFD700",
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 4,
//   },
//   buyButtoncontainer: { display: 'flex', justifyContent: 'center' },
//   buyButton: {
//     backgroundColor: tinycolor('black').brighten(10).toString(),
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   buyButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   // Profile Image Styles
//   // imageContainer: { width: 50, height: 50, borderRadius: 50, overflow: "hidden" },
//   // profileImage: { width: "100%", height: "100%", borderRadius: 50, borderWidth: 2, borderColor: "white" },
//   // defaultProfileCircle: { width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: "white", backgroundColor: "#fff" },
// });

// export default UserNameDisplay;
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import DateTimeDisplay from "./DateTimeDisplay";
import Icon from "react-native-vector-icons/MaterialIcons";
import { apiFetch } from "../../apiFetch";
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { useTheme } from "../../context/ThemeContext";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UserNameDisplay = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();   // << THEME HOOK

  const [userName, setUserName] = useState("");
  const [totalPrize, setTotalPrize] = useState(0);

  const fetchUserName = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");

    if (storedUserId) {
      try {
        const response = await apiFetch(`/users/${storedUserId}`);
        const data = await response.json();
        setUserName(data.name);

        const prizeResponse = await apiFetch(`/gamedata/total-prize`);
        const prizeData = await prizeResponse.json();
        setTotalPrize(prizeData.totalPrize || 0);

      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserName();
    }, [])
  );

  return (
    <LinearGradient
      colors={theme.gradients.fire}   // << USE THEME GRADIENT
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles(theme).container}
    >
      <View style={styles(theme).header}>
        <Icon
          name="waving-hand"
          size={24}
          color={theme.white}
          style={styles(theme).iconShadow}
        />

        <Text style={styles(theme).text}>
          {userName ? `Welcome, ${userName}!` : "Loading..."}
        </Text>
      </View>

      <Text style={styles(theme).tagline}>
        Pakistan’s #1 Real-Time Lottery Game!
      </Text>

      {/* Total Prize */}
      <View style={styles(theme).prizemaincontainer}>
        <View style={styles(theme).prizeContainer}>
          <Text style={styles(theme).prizeLabel}>💰</Text>
          <Text style={styles(theme).prizeValue}>Rs {totalPrize}</Text>
        </View>

        <View style={styles(theme).buyButtoncontainer}>
          <TouchableOpacity
            style={styles(theme).buyButton}
            onPress={() => navigation.navigate('')}
          >
            <Text style={styles(theme).buyButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimeDisplay />
    </LinearGradient>
  );
};

const styles = (theme) => StyleSheet.create({
  container: {
    alignItems: "flex-start",
    height: 200,
    paddingTop: 20,
    paddingBottom: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 25,
  },

  iconShadow: {
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.white,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },

  tagline: {
    fontSize: 18,
    color: theme.card,
    fontWeight: "700",
    marginLeft: 25,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  prizemaincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
  },

  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginVertical: 15,
  },

  prizeLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textPrimary,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  prizeValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  buyButtoncontainer: {
    justifyContent: 'center',
  },

  buyButton: {
    backgroundColor: theme.textPrimary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.textPrimary,
  },

  buyButtonText: {
    color: theme.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default UserNameDisplay;
