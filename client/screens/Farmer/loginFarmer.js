import { View, Text, Pressable } from "react-native";
import Input from "../../components/input";
import Button from "../../components/button";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useState } from "react";
import SafeArea from "../SafeArea";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import {
  fetchInvestorSuccess,
  fetchUserSuccess,
} from "../../store/actions/actionCreator";

export default function loginFarmer({ navigation }) {
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
          "https://114f-180-241-183-225.ngrok-free.app/users/farmers/login",
          data
        );
        const { access_token, id } = farmer;
        await SecureStore.setItemAsync("access_token", access_token);
        await SecureStore.setItemAsync("role", "farmer");
        await SecureStore.setItemAsync("user", `${id}`);
        dispatch(fetchUserSuccess(id, "farmer"));
        dispatch(fetchInvestorSuccess(id, access_token, "farmer"));
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
              fontSize: 24,
              fontFamily: "Poppins_700Bold",
              color: "#A5D255",
            }}
          >
            Welcome home chief!
          </Text>
          <Text style={{ fontSize: 26, fontFamily: "Poppins_300Light" }}>
            Help me to take care of {"\n"} your property.
          </Text>
        </View>
        <View style={{ marginBottom: 30 }}>
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
        <Button text={"Login"} bg={"#A5D255"} pres={() => handleSubmit()} />
        <Text style={{ marginTop: 15, fontSize: 14, alignItems: "center" }}>
          Dont Have a account?
          <Pressable
            style={{ marginBottom: -3 }}
            onPress={() => navigation.navigate("registerFarmer")}
          >
            <Text
              style={{ fontFamily: "Poppins_600SemiBold", color: "#A5D255" }}
            >
              {" "}
              Sign up{" "}
            </Text>
          </Pressable>
        </Text>
      </View>
    </SafeArea>
  );
}
