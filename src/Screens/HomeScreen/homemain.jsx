import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tinycolor from "tinycolor2";
import { apiFetch } from '../../apiFetch';
import { useTheme } from "../../context/ThemeContext";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const screenWidth = Dimensions.get('window').width;

const HomeScreengamesgrid = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [gameTypes, setGameTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGameTypes = async () => {
    try {

      const response = await apiFetch(`/gamedata/game-types`);

      const data = await response.json();
      console.log('data in homescreen', data);
      setGameTypes(data);
    } catch (error) {
      console.error('Error fetching game types:', error);
      Alert.alert('Error', 'Failed to load game types.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameTypes();
  }, []);

  const handleGamePress = (game) => {
    console.log("game data in gamescreen", game)
    navigation.navigate('GameScreen', { gameType: game });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Loading games...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container ,{backgroundColor: theme.background}]}>
      {/* Header Section */}
      <Text style={styles.title}>🎮 Tap & Win Games</Text>
      <Text style={[styles.subtitle,{color: theme.textPrimary}]}>Play simple games and win real prizes instantly!</Text>

      {/* Games Grid */}
      <FlatList
        data={gameTypes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={[styles.grid, { alignItems: 'center' }]} // ✅ centers grid
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGamePress(item)} style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="cover" />
            <Text style={styles.gameTitle}>Rs. {item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreengamesgrid;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f5f9fc',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingTop:80
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    //  borderTopColor: "#FFD700",
    color: tinycolor('#DC143C').brighten(10).toString(),
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(255,255,255,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  grid: {
    paddingBottom: 20,
    // justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    margin: 10,
    // padding: 10,
    width: (screenWidth - 50) / 2,

    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 250,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 8,
  },
  gameTitle: {
     fontSize: 28,
    fontWeight: '900',
    //  borderTopColor: "#FFD700",
    color: tinycolor('#DC143C').brighten(10).toString(),
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
