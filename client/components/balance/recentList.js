import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Divider } from "react-native-paper";
import vector from "../../assets/balance.png";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";

const RecentList = ({ item }) => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  //   console.log(item);
  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
            paddingHorizontal: 15,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Image
              source={vector}
              style={{ width: 55, height: 55, marginRight: 10 }}
            /> */}
            <View>
              {item.status === "success" || item.status === "minus" ? (
                <>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Roboto_700Bold",
                      color: "#2D6A4F",
                    }}
                  >
                    {item.status === "minus"
                      ? "Successful Investment"
                      : "Top up Successfully"}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 19,
                      fontFamily: "Roboto_700Bold",
                      color: "#7A0021",
                    }}
                  >
                    Failed Investment
                  </Text>
                </>
              )}
              <Text style={{ fontFamily: "Poppins_300Light" }}>
                {item?.ownership}
              </Text>
            </View>
          </View>
          {item.status === "success" || item.status === "minus" ? (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto_700Bold",
                color: "#2D6A4F",
              }}
            >
              {item.status === "minus"
                ? `- Rp. ${item.balance},00`
                : `
              Rp. ${item.balance},00`}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto_700Bold",
                color: "#7A0021",
              }}
            >
              - Rp. {item.balance},00
            </Text>
          )}
        </View>
        <Divider bold={true} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default RecentList;
