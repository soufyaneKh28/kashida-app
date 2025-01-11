import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Mashq({ number, title, onPress }) {
  return (
    <View style={styles.container}>
      {/* Number Circle */}
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      {/* Connecting Line */}
      <View style={styles.line} />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  numberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#00868C",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  numberText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  line: {
    height: 2,
    backgroundColor: "#00868C",
    flex: 1,
    marginHorizontal: -1,
  },
  button: {
    backgroundColor: "#00868C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 280,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
