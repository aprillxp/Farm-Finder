import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default function InvestList({ item }) {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          padding: 15,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {item.Farm.name}
          </Text>
          {item.status === "success" ? (
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
                backgroundColor: "#2D6A4F26",
                color: "#296F63",
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderWidth: 1,
                borderColor: "#296F63",
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              {item.status}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
                backgroundColor: "#AF3A3A21",
                color: "#7A0021",
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderWidth: 1,
                borderColor: "#7A0021",
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              {item.status}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 35 }}>
            <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
              Ownership:
            </Text>
            <Text>{item.ownership}%</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
              Total Price:
            </Text>
            <Text>Rp. {item.totalPrice}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
