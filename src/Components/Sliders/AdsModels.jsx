// import React, { useEffect, useState } from "react";
// import { View, Modal, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { Video } from "expo-av";
// import { Ionicons } from "@expo/vector-icons";

// const AdModals = ({ visible, onClose }) => {
//   // ✅ Test URLs
//   const imageUrl = "https://firebasestorage.googleapis.com/v0/b/basit-b2712.appspot.com/o/Lotterygamedata%2Fgameprizesimages%2Fprize50.jpg?alt=media&token=8ccc80d5-0ad0-4c53-a95a-3dd4b7e12080";
//   const videoUrl =
//     "https://firebasestorage.googleapis.com/v0/b/basit-b2712.appspot.com/o/Lotterygamedata%2F26b8f4d7dfdd84a8d75e17bbb96fd583.mp4?alt=media&token=648d38ed-9536-4860-a276-902b20a1875f"; // Small test video

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showVideoModal, setShowVideoModal] = useState(false);

//   // Sequence: show image first, then video
//   useEffect(() => {
//     if (visible) {
//       if (imageUrl) {
//         setShowImageModal(true);
//         const timer = setTimeout(() => {
//           setShowImageModal(false);
//           if (videoUrl) setShowVideoModal(true);
//         }, 3000); // ⏳ shorter time for testing
//         return () => clearTimeout(timer);
//       } else if (videoUrl) {
//         setShowVideoModal(true);
//       }
//     }
//   }, [visible]);

//   return (
//     <>
//       {/* Image Modal */}
//       <Modal visible={showImageModal} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           {imageUrl && (
//             <Image
//               source={{ uri: imageUrl }}
//               style={styles.fullMedia}
//               resizeMode="cover"
//             />
//           )}
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => {
//               setShowImageModal(false);
//               if (videoUrl) setShowVideoModal(true);
//               else onClose();
//             }}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {/* Video Modal */}
//       <Modal visible={showVideoModal} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           {videoUrl && (
//             <Video
//               source={{ uri: videoUrl }}
//               style={styles.fullMedia}
//               resizeMode="cover"
//               shouldPlay
//               isLooping={false}
//               useNativeControls
//               onPlaybackStatusUpdate={(status) => {
//                 if (status.didJustFinish) {
//                   setShowVideoModal(false);
//                   onClose();
//                 }
//               }}
//             />
//           )}
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => {
//               setShowVideoModal(false);
//               onClose();
//             }}
//           >
//             <Ionicons name="close" size={28} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
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

// export default AdModals;
import React, { useEffect, useState } from "react";
import { View, Modal, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import { apiFetch } from "../../apiFetch";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;


const AdModals = ({ visible, onClose }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showImageModal, setShowImageModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // 🔹 Fetch ad data when modal opens
    useEffect(() => {
        if (visible) {
            fetchAdData();
        }
    }, [visible]);

    const fetchAdData = async () => {
        try {
           
            const imageresponse = await apiFetch(`/adsModels/images`);
            const videoresponse = await apiFetch(`/adsModels/videos`);

            const imagedata = await imageresponse.json();
            const videodata = await videoresponse.json();

            setImageUrl(imagedata[0]?.imageUrl || null);
            setVideoUrl(videodata[0]?.videoUrl || null);

            setLoading(false);

            if (imagedata[0]?.imageUrl) {
                setShowImageModal(true);
                const timer = setTimeout(() => {
                    setShowImageModal(false);
                    if (videodata[0]?.videoUrl) setShowVideoModal(true);
                }, 3000);
                return () => clearTimeout(timer);
            } else if (videodata[0]?.videoUrl) {
                setShowVideoModal(true);
            }
        } catch (error) {
            console.error("Error fetching ad data:", error);
            setLoading(false);
        }
    };
    console.log("imagedata in model", imageUrl)
    console.log("videodata in model", videoUrl)
    return (
        <>
            {/* Image Modal */}
            <Modal visible={showImageModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        imageUrl && (
                            <Image source={{ uri: imageUrl }} style={styles.fullMedia} resizeMode="cover" />
                        )
                    )}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setShowImageModal(false);
                            if (videoUrl) setShowVideoModal(true);
                            else onClose();
                        }}
                    >
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Video Modal */}
            <Modal visible={showVideoModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        videoUrl && (
                            <Video
                                source={{ uri: videoUrl }}
                                style={styles.fullMedia}
                                resizeMode="cover"
                                shouldPlay
                                isLooping={false}
                                useNativeControls
                                onPlaybackStatusUpdate={(status) => {
                                    if (status.didJustFinish) {
                                        setShowVideoModal(false);
                                        onClose();
                                    }
                                }}
                            />
                        )
                    )}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setShowVideoModal(false);
                            onClose();
                        }}
                    >
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    fullMedia: {
        width: "100%",
        height: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 8,
        borderRadius: 20,
    },
});

export default AdModals;
