import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "../../context/ThemeContext";

const AllGamesList = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}
     showsVerticalScrollIndicator={false}>
      <Text style={[styles.gamestitile, { color: theme.textPrimary }]}>All Games</Text>
      <TouchableOpacity
        style={[styles.button,{ borderColor:theme.border}]}
        onPress={() => navigation.navigate('Tapwingamesscreen')}
        activeOpacity={0.8}
      >
        <Image source={require('../../../assets/Tapwingamebanner.jpg')} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      <Text style={[styles.gamestitile, { color: theme.textPrimary }]}>Upcoming Games</Text>
      <TouchableOpacity
        style={[styles.button, { borderColor: theme.border }]}
        onPress={() => Alert.alert("This Game is Under development")}
        activeOpacity={0.8}
      >
        <Image source={require('../../../assets/tapdollars.jpg')} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { borderColor: theme.border }]}
        onPress={() => Alert.alert("This Game is Under development")}
        activeOpacity={0.8}
      >
        <Image source={require('../../../assets/spingame.jpg')} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      {/* ))} */}
    </ScrollView>
  );
};

export default AllGamesList;

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  gamestitile: {
    // fontSize:18,
    // fontWeight:'bold',
    marginBottom: 15,
    // textAlign:'left'
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: "rgba(80, 79, 79, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    borderTopColor: "rgba(0,0,0,0.3)",
  },
  button: {
    width,
    height: 200,
    borderWidth:2,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#DC143C',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
