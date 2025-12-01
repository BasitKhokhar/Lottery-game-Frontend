// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from "react-native";
// // import { useTheme } from "../../context/ThemeContext";
// // import HomeScreengamesgrid from "./homemain";
// // import AllGamesList from "./AllGames";
// // import ImageSlider from "../../Components/Sliders/Slider";
// // import UserNameDisplay from "../UserScreen/UserNameDisplay";
// // // import CustomerSupportoptions from "./User/CustomerSupportoptions";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import Loader from "./Loader/Loader";
// // import Loader from "../../Components/Loader/Loader";
// // import Constants from "expo-constants";
// // // import FeaturedGrid from "./Homescreen/Featuredgrid";
// // const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// // const HomeScreen = ({ navigation }) => {
// //   const { theme } = useTheme();
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [homeData, setHomeData] = useState({
// //     sliderData: [],
// //     // EnhancedGalleryData: [],
// //   });

// //   useEffect(() => {
// //     if (navigation) {
// //       navigation.setOptions({ headerShown: false });
// //     }
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const storedUserId = await AsyncStorage.getItem("userId");
// //       console.log("User ID from AsyncStorage:", storedUserId);
// //       const endpoints = [
// //         { key: "sliderData", url: `${API_BASE_URL}/images/sliderimages` },
// //       ];

// //       const responses = await Promise.all(
// //         endpoints.map((endpoint) =>
// //           fetch(endpoint.url)
// //             .then((res) => res.json())
// //             .then((data) => ({ key: endpoint.key, data }))
// //             .catch(() => ({ key: endpoint.key, data: [] }))
// //         )
// //       );

// //       const updated = responses.reduce((acc, { key, data }) => {
// //         acc[key] = data;
// //         return acc;
// //       }, {});
     
// //       setHomeData(updated);
// //     } catch (error) {
// //       console.error("Home data fetch error:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   console.log("homescreen data",homeData)
// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const handleRefresh = () => {
// //     setRefreshing(true);
// //     fetchData();
// //     setRefreshing(false);
// //   };
// //   const handleScroll = (event) => {
// //     const offsetY = event.nativeEvent.contentOffset.y;
// //     if (offsetY <= 0) {
// //       handleRefresh();
// //     }
// //   };
// //   console.log("homedata", homeData)
// //   if (loading) {
// //     return (
// //       <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
// //         <Loader />
// //       </View>
// //     );
// //   }
// //   const sections = [
// //     { key: "user", render: () => <UserNameDisplay /> },
// //     { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
// //     { key: "Allgames", render: () => <AllGamesList /> },
// //   ];

// //   return (
// //     <FlatList
// //       data={sections}
// //       keyExtractor={(item) => item.key}
// //       renderItem={({ item }) => <View>{item.render()}</View>}
// //       contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
// //       showsVerticalScrollIndicator={false}
// //       initialNumToRender={2}
// //       windowSize={5}
// //       maxToRenderPerBatch={3}
// //       updateCellsBatchingPeriod={100}

// //       onScroll={handleScroll}
// //       scrollEventThrottle={16}
// //       refreshing={refreshing}
// //       onRefresh={handleRefresh}
// //     />
// //   );
// // };

// // const styles = StyleSheet.create({
// //   loaderContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   listContainer: {
// //     paddingBottom: 120,
// //     backgroundColor: "#F8F9FA",
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginTop: 20,
// //   },
// // });

// // export default HomeScreen;
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
// } from "react-native";
// import { useTheme } from "../../context/ThemeContext";
// import AllGamesList from "./AllGames";
// import ImageSlider from "../../Components/Sliders/Slider";
// import UserNameDisplay from "../UserScreen/UserNameDisplay";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Loader from "../../Components/Loader/Loader";
// import Constants from "expo-constants";
// import { Video } from "expo-av";
// import { Ionicons } from "@expo/vector-icons";

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// const HomeScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [homeData, setHomeData] = useState({
//     sliderData: [],
//   });

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [introShown, setIntroShown] = useState(false);

//   // Check if intro has already been shown in this session
//   useEffect(() => {
//     (async () => {
//       const seen = await AsyncStorage.getItem("introShown");
//       if (!seen) {
//         setShowImageModal(true);
//         await AsyncStorage.setItem("introShown", "true"); // mark as shown
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (navigation) {
//       navigation.setOptions({ headerShown: false });
//     }
//   }, []);

//   const fetchData = async () => {
//     try {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       console.log("User ID from AsyncStorage:", storedUserId);
//       const endpoints = [
//         { key: "sliderData", url: `${API_BASE_URL}/images/sliderimages` },
//       ];

//       const responses = await Promise.all(
//         endpoints.map((endpoint) =>
//           fetch(endpoint.url)
//             .then((res) => res.json())
//             .then((data) => ({ key: endpoint.key, data }))
//             .catch(() => ({ key: endpoint.key, data: [] }))
//         )
//       );

//       const updated = responses.reduce((acc, { key, data }) => {
//         acc[key] = data;
//         return acc;
//       }, {});

//       setHomeData(updated);
//     } catch (error) {
//       console.error("Home data fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Auto-close first modal after 10s
//   useEffect(() => {
//     if (showImageModal) {
//       const timer = setTimeout(() => {
//         setShowImageModal(false);
//         setShowVideoModal(true);
//       }, 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [showImageModal]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchData();
//     setRefreshing(false);
//   };
//   const handleScroll = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     if (offsetY <= 0) {
//       handleRefresh();
//     }
//   };

//   if (loading) {
//     return (
//       <View
//         style={[styles.loaderContainer, { backgroundColor: theme.background }]}
//       >
//         <Loader />
//       </View>
//     );
//   }

//   const sections = [
//     { key: "user", render: () => <UserNameDisplay /> },
//     { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
//     { key: "Allgames", render: () => <AllGamesList /> },
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={sections}
//         keyExtractor={(item) => item.key}
//         renderItem={({ item }) => <View>{item.render()}</View>}
//         contentContainerStyle={[
//           styles.listContainer,
//           { backgroundColor: theme.background },
//         ]}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={2}
//         windowSize={5}
//         maxToRenderPerBatch={3}
//         updateCellsBatchingPeriod={100}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         refreshing={refreshing}
//         onRefresh={handleRefresh}
//       />

//       {/* First Modal - Image */}
//       <Modal visible={showImageModal} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           <Image
//             source={{ uri: "https://yourdomain.com/poster.jpg" }}
//             style={styles.fullMedia}
//             resizeMode="cover"
//           />
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => {
//               setShowImageModal(false);
//               setShowVideoModal(true);
//             }}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Second Modal - Video */}
//       <Modal visible={showVideoModal} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           <Video
//             source={{ uri: "https://yourdomain.com/intro.mp4" }}
//             style={styles.fullMedia}
//             resizeMode="cover"
//             shouldPlay
//             isLooping={false}
//             onPlaybackStatusUpdate={(status) => {
//               if (status.didJustFinish) {
//                 setShowVideoModal(false);
//               }
//             }}
//           />
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setShowVideoModal(false)}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: {
//     paddingBottom: 120,
//     backgroundColor: "#F8F9FA",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   fullMedia: {
//     width: "100%",
//     height: "100%",
//   },
//   closeButton: {
//     position: "absolute",
//     top: 50,
//     right: 20,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 8,
//     borderRadius: 20,
//   },
// });

// export default HomeScreen;
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AllGamesList from "./AllGames";
import ImageSlider from "../../Components/Sliders/Slider";
import UserNameDisplay from "../UserScreen/UserNameDisplay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../Components/Loader/Loader";
import Constants from "expo-constants";
import AdModals from "../../Components/Sliders/AdsModels";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [homeData, setHomeData] = useState({ sliderData: [] });

  const [adsVisible, setAdsVisible] = useState(false);
  const [imageAdUrl, setImageAdUrl] = useState(null);
  const [videoAdUrl, setVideoAdUrl] = useState(null);

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, []);

  const fetchData = async () => {
    try {
      const endpoints = [
        { key: "sliderData", url: `${API_BASE_URL}/images/sliderimages` },
      ];

      const responses = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint.url)
            .then((res) => res.json())
            .then((data) => ({ key: endpoint.key, data }))
            .catch(() => ({ key: endpoint.key, data: [] }))
        )
      );

      const updated = responses.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, {});

      setHomeData({ sliderData: updated.sliderData });
      // setImageAdUrl(updated.ImageData[0]?.imageUrl || null);
      // setVideoAdUrl(updated.VideoData[0]?.videoUrl || null);
      setAdsVisible(true);

    } catch (error) {
      console.error("Home data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: theme.background }]}>
        <Loader />
      </View>
    );
  }

  const sections = [
    { key: "user", render: () => <UserNameDisplay /> },
    { key: "slider", render: () => <ImageSlider sliderData={homeData.sliderData} /> },
    { key: "Allgames", render: () => <AllGamesList /> },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View>{item.render()}</View>}
        contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {/* Modals for ads */}
      <AdModals
        imageUrl={imageAdUrl}
        videoUrl={videoAdUrl}
        visible={adsVisible}
        onClose={() => setAdsVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingBottom: 120,
  },
});

export default HomeScreen;
