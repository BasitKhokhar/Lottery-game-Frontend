import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function EasypaisaPaymentScreen({ route, navigation }) {
  const { gameTypeId } = route.params;
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('jwt_token');
      if (!storedToken) {
        Alert.alert('Error', 'User not logged in');
        navigation.goBack();
        return;
      }
      setToken(storedToken);
    };
    loadToken();
  }, []);

  const handlePayment = async () => {
    if (!amount || !phone) {
      Alert.alert('Validation', 'Please enter amount and phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('YOUR_BACKEND_API/easypaisa/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gameTypeId,
          amount,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Payment initiated successfully!');
        // Navigate to confirmation or home screen, etc.
      } else {
        Alert.alert('Error', data.message || 'Payment failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0ABF53" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Easypaisa Payment</Text>

      <TextInput
        placeholder="Enter amount"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
        <Text style={styles.payButtonText}>{loading ? 'Processing...' : 'Pay Now'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 20, backgroundColor: '#000', justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginBottom: 30, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#0ABF53',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
