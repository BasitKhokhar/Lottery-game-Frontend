// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { useStripe } from "@stripe/stripe-react-native";
// import { apiFetch } from "../../apiFetch";

// export default function BuyChancesModal({ visible, onClose, gameTypeId, onSuccess }) {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const [showPaymentMethod, setShowPaymentMethod] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [alertMessage, setAlertMessage] = useState("");
//   const [showAlert, setShowAlert] = useState(false);

//   const showCustomAlert = (message) => {
//     setAlertMessage(message);
//     setShowAlert(true);
//   };

//   const handleCardPayment = async () => {
//     try {
//       setLoading(true);

//       const response = await apiFetch(`/payments/create-payment-intent`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: Number(amount),
//           currency: "usd",
//           gameTypeId,
//         }),
//       });

//       const data = await response.json();
//       if (!data.clientSecret) throw new Error("Failed to get client secret");

//       const { error: initError } = await initPaymentSheet({
//         paymentIntentClientSecret: data.clientSecret,
//         merchantDisplayName: "Your App",
//       });

//       if (initError) throw initError;

//       const { error: presentError } = await presentPaymentSheet();
//       if (presentError) {
//         showCustomAlert("Payment canceled");
//       } else {
//         showCustomAlert("Payment successful!");
//         setTimeout(() => {
//           handleClose();
//           if (onSuccess) onSuccess(); // Notify BoxGrid to reload chances
//         }, 1500);
//       }
//     } catch (err) {
//       console.error(err);
//       showCustomAlert("Payment failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setShowPaymentMethod(false);
//     setAmount("");
//     setAlertMessage("");
//     setShowAlert(false);
//     onClose();
//   };

//   return (
//     <Modal animationType="slide" transparent={true} visible={visible}>
//       <TouchableWithoutFeedback onPress={handleClose}>
//         <View style={styles.overlay}>
//           <TouchableWithoutFeedback onPress={() => {}}>
//             <View style={styles.modalContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
//                 <Text style={{ fontSize: 18 }}>✕</Text>
//               </TouchableOpacity>

//               {!showPaymentMethod && (
//                 <>
//                   <Text style={styles.title}>Enter Amount</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter amount"
//                     keyboardType="numeric"
//                     value={amount}
//                     onChangeText={setAmount}
//                   />
//                   <TouchableOpacity
//                     style={styles.nextBtn}
//                     onPress={() => {
//                       if (!amount || Number(amount) <= 0) {
//                         showCustomAlert("Enter a valid amount");
//                         return;
//                       }
//                       setShowPaymentMethod(true);
//                     }}
//                   >
//                     <Text style={styles.nextBtnText}>
//                       Choose Payment Method
//                     </Text>
//                   </TouchableOpacity>
//                 </>
//               )}

//               {showPaymentMethod && (
//                 <>
//                   <Text style={styles.title}>Select Payment Method</Text>

//                   <TouchableOpacity
//                     style={styles.methodBtn}
//                     onPress={handleCardPayment}
//                   >
//                     {loading ? (
//                       <ActivityIndicator color="#fff" />
//                     ) : (
//                       <Text style={styles.methodText}>Pay with Card</Text>
//                     )}
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.methodBtn}>
//                     <Text style={styles.methodText}>JazzCash</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity style={styles.methodBtn}>
//                     <Text style={styles.methodText}>Easypaisa</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.backBtn}
//                     onPress={() => setShowPaymentMethod(false)}
//                   >
//                     <Text style={styles.backText}>← Back</Text>
//                   </TouchableOpacity>
//                 </>
//               )}

//               {showAlert && (
//                 <View style={styles.alertContainer}>
//                   <View style={styles.alertBox}>
//                     <Text style={styles.alertText}>{alertMessage}</Text>
//                     <TouchableOpacity
//                       style={styles.alertBtn}
//                       onPress={() => setShowAlert(false)}
//                     >
//                       {/* <Text style={styles.alertBtnText}>OK</Text> */}
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               )}
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     padding: 25,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     minHeight: 300,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   closeBtn: {
//     position: "absolute",
//     right: 20,
//     top: 15,
//     zIndex: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   nextBtn: {
//     backgroundColor: "#DC143C",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   nextBtnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   methodBtn: {
//     backgroundColor: "#DC143C",
//     paddingVertical: 14,
//     borderRadius: 12,
//     marginVertical: 8,
//     alignItems: "center",
//   },
//   methodText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   backBtn: {
//     marginTop: 10,
//     backgroundColor:"black",
//     paddingVertical: 14,
//     borderRadius: 12,
//     marginVertical: 8,
//     alignItems: "center",
//   },
//   backText: {
//     color: "#333",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   alertContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 20,
//   },
//   alertBox: {
//     backgroundColor: "#fff",
//     padding: 25,
//     borderRadius: 15,
//     width: "80%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   alertText: {
//     fontSize: 16,
//     textAlign: "center",fontWeight:'700',
//     marginBottom: 20,
//   },
//   alertBtn: {
//     backgroundColor: "#DC143C",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   alertBtnText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export default function BuyChancesModal({
  visible,
  onClose,
  gameTypeId,
  onSuccess,
  onStartStripePayment,
  paymentMessage, // received from BoxGrid
}) {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!visible) {
      setShowPaymentMethod(false);
      setAmount("");
    }
  }, [visible]);

  const closeAll = () => {
    setShowPaymentMethod(false);
    setAmount("");
    onClose?.();
  };

  const handleStripe = () => {
    if (!amount || Number(amount) <= 0) {
      return;
    }
    closeAll();
    setTimeout(() => {
      onStartStripePayment(Number(amount), gameTypeId);
    }, 400);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={closeAll}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TouchableOpacity onPress={closeAll} style={styles.close}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>

              {paymentMessage && (
                <View style={[styles.messageBox, paymentMessage.type === "error" ? styles.error : styles.success]}>
                  <Text style={styles.messageText}>{paymentMessage.text}</Text>
                </View>
              )}

              {!showPaymentMethod ? (
                <>
                  <Text style={styles.title}>Enter Amount</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      if (!amount || Number(amount) <= 0) return;
                      setShowPaymentMethod(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Choose Payment Method</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.title}>Select Payment Method</Text>

                  <TouchableOpacity style={styles.button} onPress={handleStripe}>
                    <Text style={styles.buttonText}>Pay with Card</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>JazzCash</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Easypaisa</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.back}
                    onPress={() => setShowPaymentMethod(false)}
                  >
                    <Text style={styles.backText}>← Back</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  modal: { backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25 },
  close: { position: "absolute", right: 20, top: 15, zIndex: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 20 },
  button: { backgroundColor: "#DC143C", paddingVertical: 14, borderRadius: 12, marginVertical: 8, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  back: { backgroundColor: "black", paddingVertical: 14, borderRadius: 10, marginTop: 10, alignItems: "center" },
  backText: { color: "white", fontSize: 14, fontWeight: "600" },
  messageBox: { padding: 10, borderRadius: 8, marginBottom: 10 },
  messageText: { color: "white", textAlign: "center", fontWeight: "bold" },
  error: { backgroundColor: "#FF4C4C" },
  success: { backgroundColor: "#4CAF50" },
});

