import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import tinycolor from "tinycolor2";
import * as SecureStore from "expo-secure-store";
import {apiFetch} from "../../apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useTheme } from "../../context/ThemeContext";
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const AccountDetailScreen = ({ route }) => {
  const { userData } = route.params;
  const { theme } = useTheme();

  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [city, setCity] = useState(userData.city || "");
  const [address, setAddress] = useState(userData.address || "");

  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     uploadImageToFirebase(result.assets[0].uri);
  //   }
  // };

  // const uploadImageToFirebase = async (uri) => {
  //   setUploading(true);
  //   try {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const userId = await AsyncStorage.getItem("userId");
  //     const fileRef = ref(storage, `PicNovaProfileImages/${userId}.jpg`);

  //     await uploadBytes(fileRef, blob);
  //     const imageUrl = await getDownloadURL(fileRef);
  //     console.log("Image uploaded successfully:", imageUrl);
  //     saveImageUrlToDatabase(userId, imageUrl);
  //   } catch (error) {
  //     console.error("Image upload error:", error);
  //   }
  //   setUploading(false);
  // };

  // const saveImageUrlToDatabase = async (userId, imageUrl) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/users/upload-profile-image`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ user_id: userId, image_url: imageUrl }),
  //     });

  //     const data = await response.json();
  //     console.log("Image upload response:", data);
  //     Alert.alert("Success", "Profile image uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error saving image URL:", error);
  //   }
  // };

const updateUserDetails = async () => {
  setUpdating(true);
  try {
    const response = await apiFetch(`/users/updateuser`, {
      method: "PUT",   // ✅ PUT request works fine here
      body: JSON.stringify({
        name,
        email,
        phone,
        city,
        address,
      }),
    });

    if (!response.ok) {
      throw new Error(`Update failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Update Response:", result);

    Alert.alert("Success", "Your account details were updated!");
  } catch (error) {
    console.error("❌ Update error:", error);
    Alert.alert("Error", "Failed to update account details.");
  } finally {
    setUpdating(false);
  }
};

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title,{color:theme.primary}]}>Account Detail</Text>
      <Text style={[styles.subtitle,{color:theme.textPrimary}]}>You can view and update your details</Text>

      <View style={styles.data}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Email"
          // keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Phone"
          // keyboardType="phone-pad"
          style={styles.input}
        />


        <TouchableOpacity
          onPress={updateUserDetails}
          style={styles.updateButton}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Update Details</Text>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={pickImage}
          style={styles.uploadButton}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Upload Profile Image</Text>
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  subtitle: {
    fontSize: 15,
    marginTop:10,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  data: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: "#999",
    backgroundColor: "#fff",
    color: "#000",
  },
  uploadButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: "#3498db",
  },
  updateButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: tinycolor("#DC143C").brighten(10).toString(),
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AccountDetailScreen;
