import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: { backgroundColor: "blue", padding: 20, borderRadius: 5 },
  buttonText: { fontSize: 20, color: "#fff" },
});

const Button = ({ onPress, textToShow }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{textToShow}</Text>
  </TouchableOpacity>
);

export default Button;
