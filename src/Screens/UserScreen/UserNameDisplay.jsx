// import React, { useState, useEffect,useCallback } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import DateTimeDisplay from "./DateTimeDisplay";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { apiFetch } from "../../apiFetch";
// import * as SecureStore from 'expo-secure-store';
// import Constants from 'expo-constants';
// import { useTheme } from "../../context/ThemeContext";

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const UserNameDisplay = () => {
//   const navigation = useNavigation();
//   const { theme } = useTheme();

//   const [userName, setUserName] = useState("");
//   const [totalPrize, setTotalPrize] = useState(0);

//   const fetchUserName = async () => {
//     const storedUserId = await AsyncStorage.getItem("userId");

//     if (storedUserId) {
//       try {
//         const response = await apiFetch(`/users/${storedUserId}`);
//         const data = await response.json();
//         setUserName(data.name);

//         const prizeResponse = await apiFetch(`/gamedata/total-prize`);
//         const prizeData = await prizeResponse.json();
//         setTotalPrize(prizeData.totalPrize || 0);

//       } catch (error) {
//         console.error("Error fetching user name:", error);
//       }
//     }
//   };

//   useEffect(() => { fetchUserName(); }, []);
//   useFocusEffect(React.useCallback(() => { fetchUserName(); }, []));

//   return (
//     <View style={[styles.maincontainer,{ height: SCREEN_HEIGHT * .33 }]}>
//       {/* Lower Container */}
//      <View style={[styles(theme).lowercontainer, { height: SCREEN_HEIGHT * 0.25 }]}>
//         <View style={styles(theme).header}>
//           <Icon
//             name="waving-hand"
//             size={24}
//             color={theme.white}
//             style={styles(theme).iconShadow}
//           />
//           <Text style={styles(theme).text}>
//             {userName ? `Welcome, ${userName}!` : "Loading..."}
//           </Text>
//         </View>
//         <Text style={styles(theme).tagline}>
//           Pakistan’s #1 Real-Time Lottery Game!
//         </Text>
//       </View>

//       {/* Upper Floating Container */}
//       <LinearGradient
//         colors={theme?.gradients?.black}
//         start={{ x: 1, y: 1 }}
//         end={{ x: 0, y: 0 }}
//         style={[styles(theme).uppercontainer, { top: SCREEN_HEIGHT * 0.16 }]} // overlaps lowercontainer
//       >
//         {/* Total Prize */}
//         <View style={styles(theme).prizemaincontainer}>
//           <View style={styles(theme).prizeContainer}>
//             <Text style={styles(theme).prizeLabel}>💰</Text>
//             <Text style={styles(theme).prizeValue}>Rs {totalPrize}</Text>
//           </View>

//           <View style={styles(theme).buyButtoncontainer}>
//             <TouchableOpacity
//               style={styles(theme).buyButton}
//               onPress={() => alert("This option is currently unavailable")}
//             >
//               <Text style={styles(theme).buyButtonText}>Withdraw</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <DateTimeDisplay />
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = (theme) => StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     backgroundColor: theme.background,
//   },

//   lowercontainer: {
//     backgroundColor: theme.primaryLight,
//     paddingTop:15,
//     // justifyContent: "flex-end",
//     // paddingBottom: 60,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     paddingHorizontal: 20,
//   },

//   uppercontainer: {
//     position: "absolute",
//     width: "90%",
//     alignSelf: "center",
//     borderRadius: 25,
//     padding: 20,
//     shadowColor: "rgba(0,0,0,0.4)",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 8,
//   },

//   header: {
//     width: "100%",
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },

//   iconShadow: {
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 4,
//   },

//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: theme.white,
//     textShadowColor: "rgba(0,0,0,0.6)",
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 4,
//   },

//   tagline: {
//     fontSize: 18,
//     color: theme.card,
//     fontWeight: "700",
//     marginTop: 10,
//     paddingTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: theme.border,
//   },

//   prizemaincontainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: "center",
//     width: '100%',
//     marginBottom: 10,
//   },

//   prizeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   prizeLabel: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: theme.textPrimary,
//     marginRight: 5,
//   },

//   prizeValue: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#FFD700",
//   },

//   buyButtoncontainer: {
//     justifyContent: 'center',
//   },

//   buyButton: {
//     backgroundColor: theme.textPrimary,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: theme.border,
//   },

//   buyButtonText: {
//     color: theme.white,
//     fontWeight: "bold",
//     fontSize: 12,
//   },
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
            onPress={() => alert("This option is currently unavailable")}
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
