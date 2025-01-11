import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import BackArrow from "../components/BackArrow";

const Policy = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackArrow navigation={navigation} />
        <Text style={styles.headerTitle}>Terms of Use</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: June 1, 2023</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information you provide directly to us, such as when you
          create or modify your account, request customer support, or otherwise
          communicate with us.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to provide, maintain, and improve
          our services, to develop new ones, and to protect our company and our
          users.
        </Text>

        <Text style={styles.sectionTitle}>3. Sharing of Information</Text>
        <Text style={styles.paragraph}>
          We do not share personal information with companies, organizations, or
          individuals outside of our company except in the following cases:
        </Text>
        <Text style={styles.listItem}>• With your consent</Text>
        <Text style={styles.listItem}>• For legal reasons</Text>
        <Text style={styles.listItem}>• To protect rights and property</Text>

        <Text style={styles.sectionTitle}>4. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your information for as long as your account is active or as
          needed to provide you services, comply with our legal obligations,
          resolve disputes, and enforce our agreements.
        </Text>

        <Text style={styles.sectionTitle}>5. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this privacy policy, please contact us
          at: privacy@example.com
        </Text>
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
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0e1922",
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
    marginBottom: 8,
  },
});

export default Policy;
