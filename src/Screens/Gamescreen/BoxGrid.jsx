// import { useStripe } from "@stripe/stripe-react-native";
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { apiFetch } from '../../apiFetch';
// import BuyChancesModal from '../PaymentScreen/PaymentMethods';
// import tinycolor from "tinycolor2";
// import { useTheme } from "../../context/ThemeContext";

// import * as SecureStore from 'expo-secure-store';
// import Constants from 'expo-constants';

// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

// export default function BoxGrid({ boxes, userChances, onBoxClick, prizeAmount, gameType, playerCount }) {
//   const { theme } = useTheme();
//   const navigation = useNavigation();
//   const [showModal, setShowModal] = useState(false);

//   const [prizes, setPrizes] = useState([]);

//   const fetchPrizesList = async () => {
//     try {
//       const response = await apiFetch(`/gamedata/allprizeslist/${gameType.id}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setPrizes(data);
//     } catch (error) {
//       console.error("Error fetching prizes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPrizesList();
//   }, []);


//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const startStripePayment = async (amount, gameTypeId) => {
//     try {
//       const response = await apiFetch(`/payments/create-payment-intent`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount, currency: "usd", gameTypeId }),
//       });

//       const data = await response.json();
//       if (!data.clientSecret) {
//         alert("Could not initialize payment.");
//         return;
//       }

//       const { error: initError } = await initPaymentSheet({
//         paymentIntentClientSecret: data.clientSecret,
//         merchantDisplayName: "Your App",
//       });

//       if (initError) {
//         alert(initError.message);
//         return;
//       }

//       const { error: presentError } = await presentPaymentSheet();

//       if (presentError) {
//         alert("Payment canceled.");
//       } else {
//         alert("Payment successful!");
//         if (onSuccess) onSuccess();
//       }
//     } catch (e) {
//       alert("Payment failed.");
//     }
//   };




//   return (
//     <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>

//       <View style={styles.gameheadercontainer}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View style={styles.stats}>
//             <Text style={styles.totalPrize}>Total Amount: {prizeAmount}</Text>
//             <Text style={styles.chances}>Chances Left: {userChances}</Text>
//           </View>
//           <View>
//             <TouchableOpacity
//               style={styles.buyButton}
//               onPress={() => setShowModal(true)}
//             >
//               <Text style={styles.buyButtonText}>Buy Chances</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Prize List Section */}
//         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
//           <View style={styles.prizesContainer}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>All Prizes=</Text>
//             {[...prizes].reverse().map((prize, index) => (
//               <View key={index} style={styles.prizeItem}>
//                 <Text style={styles.prizeText}>{prize.amount}</Text>
//                 {/* <Text style={styles.prizeText}>Rs {prize.amount} x {prize.count}</Text> */}
//               </View>
//             ))}
//           </View>
//           <View style={styles.playerCountBar}>
//             <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>players</Text>
//             <Text style={styles.playerCountText}>
//               {playerCount.count} / {playerCount.max}
//             </Text>
//           </View>
//         </View>

//       </View>

//       {/* Grid Section */}
//       <View style={styles.grid}>
//         {boxes.map((box) => (
//           <TouchableOpacity
//             key={box.id}
//             style={[styles.box, box.revealed && styles.revealed]}
//             onPress={() => {
//               if (!box.revealed && userChances > 0) onBoxClick(box.id);
//             }}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.boxText}>
//               {box.revealed ? `${box.prizeAmount}` : '?'}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       {/* Buy Chances Modal */}
//       <BuyChancesModal
//         visible={showModal}
//         onClose={() => setShowModal(false)}
//         gameTypeId={gameType.id}
//         onSuccess={reloadChances}
//         onStartStripePayment={startStripePayment}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 10,
//     paddingTop: 30,
//     backgroundColor: '#f7f9fc',
//   },
//   gameheadercontainer: {
//     display: 'flex', flexDirection: 'column',
//     backgroundColor: 'black',
//     paddingTop: 15,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     margin: 10, borderRadius: 8,
//     borderWidth: 2,
//     borderColor: tinycolor('#DC143C').brighten(10).toString()
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//   },
//   buyButton: {
//     backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   buyButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   stats: {
//     alignItems: 'flex-start',
//   },
//   totalPrize: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: tinycolor('#DC143C').brighten(10).toString(),
//     // textShadowColor: "rgba(0,0,0,0.6)",
//     // textShadowOffset: { width: 2, height: 2 },
//     borderTopColor: "rgba(255, 255, 255, 1)",
//     textShadowRadius: 4,
//   },
//   chances: {
//     marginTop: 5,
//     fontSize: 15,
//     fontWeight: '600',
//     color: 'white',
//     marginBottom: 6,
//   },
//   playerCountBar: {
//     backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
//     padding: 5,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: "white",
//     alignItems: 'center',
//   },
//   playerCountText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },


//   prizesContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap', marginBottom: 10
//     // marginTop: 4,
//   },
//   prizeItem: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 5,
//     paddingVertical: 4,
//     borderRadius: 8,
//     margin: 2,
//     borderWidth: 2,
//     borderColor: tinycolor('#DC143C').brighten(0).toString(),
//   },
//   prizeText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#333',
//   },
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 5,
//     paddingBottom: 50
//   },
//   box: {
//     width: 35,
//     height: 35,
//     margin: 3,
//     borderRadius: 10,
//     backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   revealed: {
//     backgroundColor: '#d9dbd9ff',
//   },
//   boxText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#222',
//   },
// });
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiFetch } from "../../apiFetch";
import BuyChancesModal from "../PaymentScreen/PaymentMethods";
import tinycolor from "tinycolor2";
import { useTheme } from "../../context/ThemeContext";

export default function BoxGrid({
  boxes,
  userChances,
  onBoxClick,
  prizeAmount,
  gameType,
  playerCount,
}) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [prizes, setPrizes] = useState([]);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // Fetch prizes
  const fetchPrizesList = async () => {
    try {
      const response = await apiFetch(
        `/gamedata/allprizeslist/${gameType.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrizes(data);
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  useEffect(() => {
    fetchPrizesList();
  }, []);

  // Reload user chances
  const reloadChances = async () => {
    try {
      const response = await apiFetch(`/userchances/${gameType.id}`);
      const data = await response.json();
      if (data?.chances !== undefined) {
        onSuccessChances(data.chances);
      }
    } catch (err) {
      console.log("Error reloading chances:", err);
    }
  };

  // Stripe Start
  const startStripePayment = async (amount, gameTypeId) => {
    try {
      const response = await apiFetch(`/payments/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd", gameTypeId }),
      });

      const data = await response.json();
      if (!data.clientSecret) {
        alert("Could not initialize payment.");
        return;
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Your App",
      });

      if (initError) {
        alert(initError.message);
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (!presentError) {
        alert("Payment successful!");
        reloadChances();
      } else {
        alert("Payment canceled.");
      }
    } catch (e) {
      alert("Payment failed.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={styles.gameheadercontainer}>
        <View style={styles.header}>
          <View style={styles.stats}>
            <Text style={styles.totalPrize}>Total Amount: {prizeAmount}</Text>
            <Text style={styles.chances}>Chances Left: {userChances}</Text>
          </View>

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buyButtonText}>Buy Chances</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <View style={styles.prizesContainer}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              All Prizes:
            </Text>
            {[...prizes].reverse().map((prize, index) => (
              <View key={index} style={styles.prizeItem}>
                <Text style={styles.prizeText}>{prize.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.playerCountBar}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Players</Text>
            <Text style={styles.playerCountText}>
              {playerCount.count} / {playerCount.max}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        {boxes.map((box) => (
          <TouchableOpacity
            key={box.id}
            style={[styles.box, box.revealed && styles.revealed]}
            onPress={() => {
              if (!box.revealed && userChances > 0) onBoxClick(box.id);
            }}
          >
            <Text style={styles.boxText}>
              {box.revealed ? `${box.prizeAmount}` : "?"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <BuyChancesModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        gameTypeId={gameType.id}
        onSuccess={reloadChances}
        onStartStripePayment={startStripePayment}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 10, paddingTop: 30 },
  gameheadercontainer: {
    display: 'flex', flexDirection: 'column',
    backgroundColor: 'black',
    paddingTop: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    margin: 10, borderRadius: 8,
    borderWidth: 2,
    borderColor: tinycolor('#DC143C').brighten(10).toString()
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  buyButton: {
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  buyButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stats: {
    alignItems: 'flex-start',
  },
  totalPrize: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tinycolor('#DC143C').brighten(10).toString(),
    // textShadowColor: "rgba(0,0,0,0.6)",
    // textShadowOffset: { width: 2, height: 2 },
    borderTopColor: "rgba(255, 255, 255, 1)",
    textShadowRadius: 4,
  },
  chances: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  playerCountBar: {
    backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
    alignItems: 'center',
  },
  playerCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  prizesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  prizeItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 8,
    margin: 2,
    borderWidth: 2,
    borderColor: tinycolor("#DC143C").toString(),
  },
  prizeText: { fontSize: 12, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 50,
  },
  box: {
    width: 35,
    height: 35,
    margin: 3,
    borderRadius: 10,
    backgroundColor: tinycolor("#DC143C").brighten(10).toString(),
    justifyContent: "center",
    alignItems: "center",
  },
  revealed: { backgroundColor: "#d9dbd9ff" },
  boxText: { fontSize: 16, fontWeight: "bold" },
});
