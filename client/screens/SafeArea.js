import { StyleSheet, Text, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import React from "react";

export default function SafeArea({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          //   paddingBottom: insets.bottom,
          paddingHorizontal: 15,
        }}
      >
        {children}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
