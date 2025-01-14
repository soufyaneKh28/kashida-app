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
import { ArrowLeftIcon, EnvelopeIcon } from "react-native-heroicons/outline";
import { baseurl } from "../api/user";
import BackArrow from "../components/BackArrow";
import { API_URL } from "@env";
export default function ForgotPassword1({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log('====================================');
  console.log(email);
  // console.log('====================================');
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
      console.log("====================================");
      console.log(data);
      console.log("====================================");
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
        {/* Header */}

        <View style={styles.headerContainer}>
          <Text style={styles.title}>You Forgot Your Password?</Text>
          <Text style={styles.subtitle}>
            We will send you a verification code to your email to be able to
            make a new password
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <EnvelopeIcon color="#0E1922" style={styles.inputIcon} />
            <TextInput
              placeholder="Your Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#78746D"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSendCode}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send Code"}
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
    paddingTop: 80,
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
    backgroundColor: "#EFF0F2",
    borderRadius: 16,
    padding: 16,
    paddingLeft: 48,
    fontSize: 16,
    color: "#0E1922",
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
});
