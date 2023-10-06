import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import Pig from "../assets/category/pig.png";
import Beef from "../assets/category/beef.png";
import Chicken from "../assets/category/chicken.png";
import Bean from "../assets/category/bean.png";
import Crop from "../assets/category/land.png";
import Land from "../assets/category/open.png";

export default function CategoryListItem({ navigation }) {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
  });
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Chicken",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Chicken}
            style={{
              position: "absolute",
              left: 15,
              width: 70,
              height: 100,
              top: -20,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Chicken
          </Text>
        </Pressable>
        {/* </Pressable> */}
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Beef",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Beef}
            style={{
              position: "absolute",
              left: 10,
              width: 120,
              height: 83,
              top: -14,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Beef
          </Text>
        </Pressable>
        {/* </Pressable> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Pork",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Pig}
            style={{
              position: "absolute",
              left: 15,
              width: 90,
              height: 90,
              top: -10,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Pork
          </Text>
        </Pressable>
        {/* </Pressable> */}
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Dairy",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Bean}
            style={{
              position: "absolute",
              left: 10,
              width: 70,
              height: 100,
              top: -14,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Dairy
          </Text>
        </Pressable>
        {/* // </Pressable> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Crops",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Crop}
            style={{
              position: "absolute",
              left: 25,
              width: 45,
              height: 100,
              top: -20,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Crops
          </Text>
        </Pressable>
        {/* </Pressable> */}
        {/* <Pressable
        > */}
        <Pressable
          onPress={() =>
            navigation.push("categories", {
              category: "Open-Land",
            })
          }
          style={{
            flex: 0.48,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#296F63",
            marginBottom: 10,
            alignItems: "flex-end",
            paddingRight: 20,
            paddingVertical: 35,
            position: "relative",
            borderRadius: 5,
          }}
        >
          <Image
            source={Land}
            style={{
              position: "absolute",
              left: -20,
              width: 120,
              height: 100,
              top: -20,
            }}
          />
          <Text style={{ fontSize: 16, fontFamily: "Poppins_500Medium" }}>
            Open Land
          </Text>
        </Pressable>
        {/* // </Pressable> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
