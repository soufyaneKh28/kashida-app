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
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import { baseurl } from "../api/user";

export default function ForgotPassword3({ navigation, route }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { email, code } = route.params;

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseurl}/api/k1/users/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Password has been reset successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to reset password");
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
          <Text style={styles.title}>Create a New Password</Text>
          <Text style={styles.subtitle}>
            Your new password should be unique and memorable, allowing you to
            reconnect effortlessly with our community.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <LockClosedIcon color="#0E1922" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#78746D"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon size={24} color="#78746D" />
              ) : (
                <EyeSlashIcon size={24} color="#78746D" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <LockClosedIcon color="#0E1922" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter new password"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#78746D"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeIcon size={24} color="#78746D" />
              ) : (
                <EyeSlashIcon size={24} color="#78746D" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Note: Your password must be at least 8 characters long and include a
            mix of letters and numbers for better security.
          </Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Saving..." : "Save New Password"}
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
    paddingRight: 48,
    fontSize: 16,
    color: "#0E1922",
  },
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    top: 16,
    right: 16,
  },
  hint: {
    fontSize: 14,
    color: "#78746D",
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#008087",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
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
