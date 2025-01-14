import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../AuthContext";
import { API_URL } from "@env";
import {
  LockClosedIcon,
  EnvelopeIcon,
  EyeSlashIcon,
  EyeIcon,
} from "react-native-heroicons/outline";
import CustomButton from "../components/CustomButton";
import { colors } from "../styles/colors";

const Login = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (email === "" || password === "" || !email.includes("@")) {
      return alert("Please add valid email and password");
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/k1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          `Error: ${response.status} - ${
            responseBody.message || "Failed to log in"
          }`
        );
      }

      const responseBody = await response.json();

      if (responseBody.token) {
        await SecureStore.setItemAsync("jwtToken", responseBody.token);
        alert("Login successful!");
        setIsLoggedIn(true);
        const token = await SecureStore.getItemAsync("jwtToken");
        console.log("token from secure Store", token);
      } else {
        alert("Token not found in response.");
      }
    } catch (error) {
      alert(`Failed to log in, please try again. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} />
      <ScrollView style={styles.scrollView}>
        <SafeAreaView style={styles.container}>
          <Image
            source={require("../../assets/images/kashidaMark.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Welcome Artist</Text>
            <Text style={styles.headerSubtitle}>
              Enter your Email & Password to Sign in
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <EnvelopeIcon color="#0E1922" style={styles.inputIcon} />
              <TextInput
                placeholder="Your Email"
                style={styles.input}
                value={email}
                placeholderTextColor="gray"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <LockClosedIcon color="#0E1922" style={styles.inputIcon} />
              <TextInput
                secureTextEntry={!isPasswordVisible}
                placeholder="Your Password"
                placeholderTextColor="gray"
                autoCapitalize="none"
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                keyboardType="default"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.passwordToggle}
              >
                {isPasswordVisible ? (
                  <EyeIcon size={24} color="#888" />
                ) : (
                  <EyeSlashIcon size={24} color="#888" />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={() => navigation.push("ForgotPassword1")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginButtonContainer}>
              <CustomButton onPress={handleLogin}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Sign in"
                )}
              </CustomButton>
            </View>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignUp")}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },
  backgroundImage: {
    position: "absolute",
    top: -200,
    left: -100,
  },
  headerContainer: {
    marginTop: 250,
  },
  headerTitle: {
    color: "#3C3A36",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },
  headerSubtitle: {
    textAlign: "center",
    color: "#78746D",
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
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 16,
    paddingLeft: 45,
    padding: 16,
  },
  passwordToggle: {
    position: "absolute",
    zIndex: 3,
    top: 12,
    right: 12,
  },
  forgotPasswordContainer: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontWeight: "bold",
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  signUpText: {
    color: "#565656",
    fontSize: 14,
    fontWeight: "500",
  },
  signUpButtonText: {
    color: "#0E1922",
    fontWeight: "900",
    marginLeft: 4,
  },
});

export default Login;
