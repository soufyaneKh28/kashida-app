import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import OutlineButton from "../components/OutlineButton";
import CustomButton from "../components/CustomButton";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../AuthContext";
import { API_URL } from "@env";
import { colors } from "../styles/colors";

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/k1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirm,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            responseBody.message || "Failed to sign up"
          }`
        );
      }

      const responseBody = await response.json();
      if (responseBody.token) {
        await SecureStore.setItemAsync("jwtToken", responseBody.token);
        alert("User successfully signed up!");
        setIsLoggedIn(true);
      } else {
        alert("Token not found in response.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Failed to sign up, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/images/kashidaMark.png")}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon color={colors.text} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Welcome Artist</Text>
            <Text style={styles.headerSubtitle}>
              Sign up and enjoy our community
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <UserIcon color={colors.text} style={styles.inputIcon} />
              <TextInput
                placeholder="Username"
                style={styles.input}
                value={username}
                autoCapitalize="none"
                placeholderTextColor={colors.textSecondary}
                onChangeText={(text) => setUsername(text)}
                keyboardType="default"
              />
            </View>
            <View style={styles.inputContainer}>
              <EnvelopeIcon color={colors.text} style={styles.inputIcon} />
              <TextInput
                placeholder="Your Email"
                style={styles.input}
                value={email}
                autoCapitalize="none"
                placeholderTextColor={colors.textSecondary}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <LockClosedIcon color={colors.text} style={styles.inputIcon} />
              <TextInput
                secureTextEntry={!isPasswordVisible}
                placeholder="Your Password"
                style={styles.input}
                value={password}
                autoCapitalize="none"
                placeholderTextColor={colors.textSecondary}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.passwordToggle}
              >
                {isPasswordVisible ? (
                  <EyeIcon size={24} color={colors.textSecondary} />
                ) : (
                  <EyeSlashIcon size={24} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <LockClosedIcon color={colors.text} style={styles.inputIcon} />
              <TextInput
                secureTextEntry={!isPasswordVisible}
                placeholder="Confirm Password"
                style={styles.input}
                value={passwordConfirm}
                autoCapitalize="none"
                placeholderTextColor={colors.textSecondary}
                onChangeText={(text) => setPasswordConfirm(text)}
                keyboardType="default"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.passwordToggle}
              >
                {isPasswordVisible ? (
                  <EyeIcon size={24} color={colors.textSecondary} />
                ) : (
                  <EyeSlashIcon size={24} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>
              By continuing you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and
              <Text style={styles.termsLink}> Privacy Policy</Text>
            </Text>
            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <CustomButton onPress={handleSignup}>
                  Create Account
                </CustomButton>
              )}
            </View>
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: -200,
    left: -100,
  },
  backButton: {
    backgroundColor: colors.background,
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 12,
  },
  headerContainer: {
    marginTop: 250,
  },
  headerTitle: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },
  headerSubtitle: {
    textAlign: "center",
    color: colors.textSecondary,
  },
  inputContainer: {
    marginTop: 12,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    zIndex: 3,
    top: 12,
    left: 12,
  },
  input: {
    backgroundColor: colors.inputBackground,
    width: "100%",
    borderRadius: 16,
    paddingLeft: 45,
    padding: 16,
    color: colors.text,
  },
  passwordToggle: {
    position: "absolute",
    zIndex: 3,
    top: 12,
    right: 12,
  },
  termsText: {
    textAlign: "center",
    color: colors.textSecondary,
    paddingHorizontal: 12,
    lineHeight: 24,
    marginTop: 12,
  },
  termsLink: {
    color: colors.linkText,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 12,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  signInText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  signInLink: {
    color: colors.linkText,
    fontWeight: "900",
    marginLeft: 4,
  },
});

export default SignUp;
