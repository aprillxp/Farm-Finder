import { StyleSheet, Text, View, Pressable } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Input from "../../components/input";
import React, { useState } from "react";
import SafeArea from "../SafeArea";
import Button from "../../components/button";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchInvestorSuccess,
  fetchUserSuccess,
} from "../../store/actions/actionCreator";

export default function registerFarmer({ navigation }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [errors, setErr] = useState({});
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleError = (msg, name) => {
    setErr((prev) => ({
      ...prev,
      [name]: msg,
    }));
  };

  const handleSubmit = async () => {
    try {
      let valid = true;

      if (!data.username) {
        handleError("Please input username", "username");
        valid = false;
      }
      if (!data.phoneNumber) {
        handleError("Please input phone number", "phoneNumber");
        valid = false;
      }

      if (!data.email) {
        handleError("Please input email", "email");
        valid = false;
      } else if (!data.email.match(/\S+@\S+\.\S+/)) {
        handleError("Please input valid email", "email");
        valid = false;
      }

      if (!data.password) {
        handleError("Please input password", "password");
        valid = false;
      }

      if (valid) {
        const { data: farmer } = await axios.post(
          "https://114f-180-241-183-225.ngrok-free.app/users/farmers/register",
          data
        );
        const token = farmer.access_token;
        await SecureStore.setItemAsync("access_token", token);
        await SecureStore.setItemAsync("role", "farmer");
        await SecureStore.setItemAsync("user", `${farmer.id}`);
        dispatch(fetchUserSuccess(farmer.id, "farmer"));
        dispatch(fetchInvestorSuccess(farmer.id, token, "farmer"));
        navigation.navigate("RootFarmer");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeArea>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}
      >
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "Poppins_700Bold",
              color: "#A5D255",
            }}
          >
            Hi there!
          </Text>
          <Text style={{ fontSize: 20, fontFamily: "Poppins_300Light" }}>
            Register yourself to become {"\n"} a lord of your own property.
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Input
            bg={"#A5D255"}
            label="Username"
            onChangeText={(e) => {
              onChange("username", e);
            }}
            error={errors.username}
            onFocus={() => {
              handleError(null, "username");
            }}
          />
          <Input
            bg={"#A5D255"}
            label="Phone number"
            onChangeText={(e) => {
              onChange("phoneNumber", e);
            }}
            error={errors.phoneNumber}
            onFocus={() => {
              handleError(null, "phoneNumber");
            }}
            keyboardType="numeric"
          />
          <Input
            bg={"#A5D255"}
            label="Email"
            onChangeText={(e) => {
              onChange("email", e);
            }}
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            keyboardType="email-address"
          />
          <Input
            bg={"#A5D255"}
            label="Password"
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(e) => {
              onChange("password", e);
            }}
            secureTextEntry={true}
          />
        </View>
        <Button text={"Register"} bg={"#A5D255"} pres={() => handleSubmit()} />
        <Text style={{ marginTop: 15, fontSize: 14, alignItems: "center" }}>
          Already have an account?
          <Pressable
            style={{ marginBottom: -3 }}
            onPress={() => navigation.navigate("loginFarmer")}
          >
            <Text
              style={{ fontFamily: "Poppins_600SemiBold", color: "#A5D255" }}
            >
              {" "}
              Sign in{" "}
            </Text>
          </Pressable>
        </Text>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({});
