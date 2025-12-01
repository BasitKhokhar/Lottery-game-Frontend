import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaymentSelectionScreen({ navigation, route }) {
  const { gameTypeId } = route.params;
  console.log("gametypeid in paymentscreen", gameTypeId)
  const handleSelectPayment = (paymentMethod) => {
    navigation.navigate(paymentMethod === 'jazzcash' ? 'jazzcashscreenScreen' : 'easypaisaScreen', {
      gameTypeId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Payment Method</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#DC143C' }]}
        onPress={() => handleSelectPayment('jazzcash')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>JazzCash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0ABF53' }]}
        onPress={() => handleSelectPayment('easypaisa')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Easypaisa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
