
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { apiFetch } from "../../apiFetch";
import { colors } from "../../Themes/colors";

const StripePayment = ({ route, navigation }) => {
  const { gameTypeId} = route.params || {};
  console.log("detail in stripe",gameTypeId);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(""); // User input amount
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("error");

  const showMessage = (msg, type = "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    setCardNumber(formatted.slice(0, 19));
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    setExpiry(formatted.slice(0, 5));
  };

  const createPaymentIntent = async (paymentAmount) => {
    try {
        console.log()
      setLoading(true);
      const response = await apiFetch(`/payments/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          currency: "usd",
          // customerEmail: user_email,
          gameTypeId,
        }),
      });

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      return clientSecret;
    } catch (error) {
      console.error("PaymentIntent error:", error);
      showMessage("Failed to create payment intent.", "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      showMessage("Please enter a valid amount.", "error");
      return;
    }

    if (!cardNumber || !expiry || !cvc || !zip) {
      showMessage("Please fill all card details.", "error");
      return;
    }

    const paymentIntentClientSecret =
      clientSecret || (await createPaymentIntent(amount));
    if (!paymentIntentClientSecret) return;

    const { error: sheetInitError } = await initPaymentSheet({
      paymentIntentClientSecret,
      merchantDisplayName: "Basit Sanitary",
      style: "automatic",
    });

    if (sheetInitError) {
      showMessage(sheetInitError.message, "error");
      return;
    }

    const { error: sheetPayError } = await presentPaymentSheet();

    if (sheetPayError) {
      showMessage(sheetPayError.message, "error");
    } else {
      showMessage(`Payment of $${amount} successful!`, "success");
      navigation.replace("GameScreen", { gameTypeId });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.bodybackground }]}
      keyboardShouldPersistTaps="handled"
    >
      {message && (
        <View
          style={[
            styles.messageBox,
            { backgroundColor: messageType === "error" ? colors.error : colors.primary },
          ]}
        >
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <Text style={[styles.title, { color: colors.text }]}>Enter Amount</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.cardsbackground, color: colors.text, borderColor: colors.border }]}
        placeholder="Enter amount in USD"
        placeholderTextColor={colors.mutedText}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={[styles.title, { color: colors.text, marginTop: 20 }]}>Enter Card Details</Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.mutedText }]}>Card Number</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, color: colors.text, borderColor: colors.border }]}
          placeholder="4242 4242 4242 4242"
          placeholderTextColor={colors.mutedText}
          keyboardType="numeric"
          maxLength={19}
          value={cardNumber}
          onChangeText={formatCardNumber}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainerSmall}>
          <Text style={[styles.label, { color: colors.mutedText }]}>Expiry Date</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardsbackground, color: colors.text, borderColor: colors.border }]}
            placeholder="MM/YY"
            placeholderTextColor={colors.mutedText}
            keyboardType="numeric"
            maxLength={5}
            value={expiry}
            onChangeText={formatExpiry}
          />
        </View>

        <View style={styles.inputContainerSmall}>
          <Text style={[styles.label, { color: colors.mutedText }]}>CVC</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.cardsbackground, color: colors.text, borderColor: colors.border }]}
            placeholder="123"
            placeholderTextColor={colors.mutedText}
            keyboardType="numeric"
            maxLength={3}
            value={cvc}
            onChangeText={setCvc}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.mutedText }]}>ZIP Code</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, color: colors.text, borderColor: colors.border }]}
          placeholder="12345"
          placeholderTextColor={colors.mutedText}
          keyboardType="numeric"
          maxLength={5}
          value={zip}
          onChangeText={setZip}
        />
      </View>

      <TouchableOpacity
        style={[styles.payButton, { backgroundColor: colors.primary }]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.white }]}>Buy</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  inputContainerSmall: { width: "48%" },
  payButton: { padding: 16, borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  messageBox: { padding: 12, borderRadius: 8, marginBottom: 15 },
  messageText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default StripePayment;
