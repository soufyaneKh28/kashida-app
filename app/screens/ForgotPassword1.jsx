import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import BackArrow from "../components/BackArrow";
import { API_URL } from "@env";
import { colors } from "../styles/colors";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPassword1({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/k1/users/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();
      if (response.ok) {
        navigation.navigate("ForgotPassword2", { email: email });
      } else {
        Alert.alert(
          "Error",
          data.message || "Failed to send verification code"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>You Forgot Your Password?</Text>
          <Text style={styles.subtitle}>
            We will send you a verification code to your email to be able to
            make a new password
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <EnvelopeIcon color={colors.text} style={styles.inputIcon} />
            <TextInput
              placeholder="Your Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity
            className="my-1"
            activeOpacity={0.8}
            disabled={loading}
            style={[loading && styles.buttonDisabled]}
            onPress={handleSendCode}
          >
            <LinearGradient
              colors={["#0E1B24", "#095E67"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Text
                className="text-white"
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Sending..." : "Send Code"}
                </Text>
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 16,
  },
  inputIcon: {
    position: "absolute",
    zIndex: 1,
    top: 16,
    left: 16,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: 16,
    paddingLeft: 48,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600",
  },
});

