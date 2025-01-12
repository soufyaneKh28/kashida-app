import React, { useState, useEffect } from "react";
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
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { baseurl } from "../api/user";

export default function ForgotPassword2({ navigation, route }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { email } = route.params;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    setLoading(true);
    try {
      const response = await fetch(`${baseurl}/api/k1/users/resendCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeLeft(60);
        Alert.alert("Success", "New code has been sent to your email");
      } else {
        Alert.alert("Error", "Failed to resend code");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseurl}/api/k1/users/verifyCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        navigation.navigate("ForgotPassword3", { email, code });
      } else {
        Alert.alert("Error", "Invalid verification code");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon size={24} color="#0E1922" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to your email. Enter it below to verify
            your identity.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            maxLength={6}
            placeholderTextColor="#78746D"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleVerifyCode}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Verifying..." : "Verify Code"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendCode}
            disabled={timeLeft > 0}
            style={styles.resendContainer}
          >
            <Text
              style={[
                styles.resendText,
                timeLeft > 0 && styles.resendTextDisabled,
              ]}
            >
              {timeLeft > 0
                ? `Resend code in ${timeLeft}s`
                : "Didn't receive the code? Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    padding: 8,
    marginBottom: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0E1922",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#78746D",
    lineHeight: 24,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: "#EFF0F2",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: "#0E1922",
    textAlign: "center",
    letterSpacing: 2,
  },
  button: {
    backgroundColor: "#008087",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: "#b3bec3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  resendText: {
    color: "#008087",
    fontSize: 14,
  },
  resendTextDisabled: {
    color: "#78746D",
  },
});
