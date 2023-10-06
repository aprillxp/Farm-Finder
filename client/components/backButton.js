import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = ({ navigation }) => {
  return (
    <Pressable style={{ flex: 0 }} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-outline" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default BackButton;
