import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../components/BackArrow";

export default function Security({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    // Add your password validation and update logic here
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle password update
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackArrow navigation={navigation} />
        <Text style={styles.headerTitle}>Security</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create new password</Text>
        <Text style={styles.subtitle}>
          Your new passwords must be different from pervious last password
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor="#999999"
          />
          <Text style={styles.helperText}>
            Password must be at least 8 characters.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor="#999999"
          />
          <Text style={styles.helperText}>Both passwords must match.</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // justifyContent: "center",
    // paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#f3faff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#0e1922",
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 28,
    fontWeight: "bold",
    color: "#0e1922",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#999999",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0e1922",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f3faff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#0e1922",
  },
  helperText: {
    fontSize: 14,
    color: "#999999",
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: "#00868c",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 32,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
