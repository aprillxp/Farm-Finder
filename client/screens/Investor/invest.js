import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SafeArea from "../SafeArea";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import InvestList from "../../components/investList";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestSuccess } from "../../store/actions/actionCreator";

export default function invest() {
  const dispatch = useDispatch();
  const { invest: data, loading } = useSelector((state) => {
    return state.invest;
  });
  const { access_token } = useSelector((state) => {
    return state.user;
  });
  //   let [fontsLoaded, fontError] = useFonts({
  //     Poppins_300Light,
  //     Poppins_600SemiBold,
  //     Poppins_700Bold,
  //     Poppins_500Medium,
  //   });
  useEffect(() => {
    dispatch(fetchInvestSuccess(access_token));
  }, []);

  //   if (!fontsLoaded && !fontError) {
  //     return null;
  //   }

  //   if (loading) {
  //     return <Text>Loadin</Text>;
  //   }

  console.log(data, loading);
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 2 }}>
          <View style={{ marginTop: 20, marginBottom: 25 }}>
            <Text
              style={{
                fontFamily: "Poppins_600SemiBold",
                fontSize: 26,
                color: "#296F63",
              }}
            >
              My Invest
            </Text>
          </View>
          {data.length ? (
            data.map((el, id) => {
              return <InvestList item={el} />;
            })
          ) : (
            <Text>Yout dont have a investment</Text>
          )}
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({});
