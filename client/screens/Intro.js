import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import vector from "../assets/intro.png";
import Button from "../components/button";
import SafeArea from "./SafeArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { fetchInvestorSuccess } from "../store/actions/actionCreator";

const Intro = ({ navigation }) => {
  const dispatch = useDispatch();
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeArea>
      <View style={styles.image}>
        <Image source={vector} style={styles.vector} />
        <Text style={styles.title}>
          Start your{" "}
          <Text style={{ fontFamily: "Poppins_600SemiBold" }}>journey</Text>
          {"\n"} and become what you{" "}
          <Text style={{ fontFamily: "Poppins_600SemiBold" }}>want</Text> to be
        </Text>
      </View>
      <View style={{ flex: 0.1 }}>
        <Button
          text={"Be a Investor"}
          pres={() => navigation.navigate("loginInvest")}
          bg={"#296F63"}
        />
      </View>
      <View style={{ flex: 0.1, marginBottom: 30 }}>
        <Button
          text={"Be a Farmer"}
          pres={() => navigation.navigate("loginFarmer")}
          bg={"#A5D255"}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  vector: {
    justifyContent: "center",
    alignItems: "center",
    width: 390,
    height: 390,
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 300,
    textAlign: "center",
    fontFamily: "Poppins_300Light",
  },
});

export default Intro;
