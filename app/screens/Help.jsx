import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import Collapse from "../components/Collapse"; // Make sure this path is correct
import BackArrow from "../components/BackArrow";

const Help = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (name && email && message) {
      Alert.alert(
        "Message Sent",
        "Thank you for your message. We'll get back to you soon.",
        [{ text: "OK", onPress: () => resetForm() }]
      );
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <BackArrow navigation={navigation} />
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      <View style={styles.content}>
        {/* <Text style={styles.title}>Help & Support</Text> */}

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <Collapse title="How do I reset my password?">
          You can reset your password by going to the login screen and tapping
          on "Forgot Password". Follow the instructions sent to your email to
          create a new password.
        </Collapse>
        <Collapse title="How can I update my profile?">
          Go to the Profile tab and tap on the "Edit Profile" button. You can
          update your information there, including your name, profile picture,
          and bio.
        </Collapse>
        <Collapse title="Is my personal information secure?">
          We take your privacy seriously. All personal information is encrypted
          and stored securely. We never share your data with third parties
          without your explicit consent.
        </Collapse>
        <Collapse title="How do I delete my account?">
          To delete your account, go to Settings - Account - Delete Account.
          Please note that this action is irreversible and all your data will be
          permanently deleted.
        </Collapse>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you couldn't find the answer to your question, please fill out the
          form below and we'll get back to you as soon as possible.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Enter your message"
              placeholderTextColor="#999999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0e1922",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0e1922",
    marginTop: 24,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    lineHeight: 24,
  },
  form: {
    marginTop: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0e1922",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f3faff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#0e1922",
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: "#00868c",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  submitButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Help;
