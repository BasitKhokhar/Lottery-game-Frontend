// import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PaymentSelectionScreen({ route }) {
  const navigation = useNavigation();
  const { gameTypeId } = route.params;

  console.log("gametypeid in paymentscreen", gameTypeId);

  const handleSelectPayment = (paymentMethod) => {
    if (paymentMethod === "card") {
      navigation.navigate("stripePaymentScreen", { gameTypeId });
    } else if (paymentMethod === "jazzcash") {
      navigation.navigate("JazzCashScreen", { gameTypeId });
    } else if (paymentMethod === "easypaisa") {
      navigation.navigate("EasypaisaScreen", { gameTypeId });
    }
  };

  const paymentMethods = [
    {
      id: "card",
      label: "Credit/Debit Card",
      icon: "credit-card-outline",
      bgColor: "#1E88E5",
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      icon: "currency-usd",
      bgColor: "#DC143C",
    },
    {
      id: "easypaisa",
      label: "Easypaisa",
      icon: "cellphone-wireless",
      bgColor: "#0ABF53",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Payment Method</Text>

      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.button, { backgroundColor: method.bgColor }]}
          onPress={() => handleSelectPayment(method.id)}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Icon name={method.icon} size={28} color="#fff" style={{ marginRight: 12 }} />
            <Text style={styles.buttonText}>{method.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
