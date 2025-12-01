import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tinycolor from "tinycolor2";
const windowHeight = Dimensions.get("window").height;

export default function TermsScreen({ onNext }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleNext = async () => {
        if (!isChecked) return; // safety check
        try {
            await AsyncStorage.setItem("termsAccepted", "true");
            onNext();
        } catch (e) {
            console.error("Error saving terms acceptance", e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={require('./../../assets/onboarding4.png')} // reuse your onboarding image
                    style={styles.image}
                />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Terms & Conditions</Text>

                <ScrollView style={styles.termsScroll}>
                    <Text style={styles.termsText}>
                        Welcome to M $ S Lottery!{"\n\n"}
                        1. You must be 18+ to play.{"\n"}
                        2. All purchases are final.{"\n"}
                        3. Prizes will be credited to your account.{"\n"}
                        4. The company reserves the right to change terms anytime.{"\n"}
                        5. This is a lottery game and involves financial transactions through various payment methods.{"\n"}
                        6. In case of any data loss, transaction failure, or payment issues, the company will not be responsible for any loss or damages incurred.{"\n\n"}
                        By continuing, you agree to follow all these rules.{"\n"}
                    </Text>

                </ScrollView>
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsChecked(!isChecked)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]} />
                    <Text style={styles.checkboxLabel}>I agree to the Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, !isChecked && styles.buttonDisabled]}
                    onPress={handleNext}
                    disabled={!isChecked}
                >
                    <Text style={styles.buttonText}>Lets Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },
    topContainer: {
        height: windowHeight * 0.70,
        width: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    contentContainer: {
        display: 'flex', flexDirection: 'column',
        gap: 5,
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: tinycolor('#DC143C').brighten(10).toString(),
        textAlign: "center",
        // marginBottom: 10,
    },
    termsScroll: {
        maxHeight: 100,
        marginBottom: 0,
        padding: 8,
        paddingBottom:15,
        backgroundColor: '#fff',  // shadows need background color to show well
        borderRadius: 8,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Android shadow
        elevation: 5,
    },
    termsText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#000",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop:5,
        marginBottom: 15,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: "#555",
        marginRight: 10,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: "#DC143C",
        borderColor: "black",
    },
    checkboxLabel: {
        fontSize: 16,
        color: "#000",
    },
    button: {
        backgroundColor: tinycolor('#DC143C').brighten(10).toString(),
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: "center",
        marginBottom: 40,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
