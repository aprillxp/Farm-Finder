import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import RecentList from "./recentList";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBalanceSuccess,
  fetchUserSuccess,
} from "../../store/actions/actionCreator";

const Recent = () => {
  const dispatch = useDispatch();
  const { access_token, role, userId } = useSelector((state) => {
    return state.user;
  });
  const { recent } = useSelector((state) => {
    return state.balance;
  });
  //   const [recent, setRecent] = useState([]);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
    Roboto_700Bold,
  });
  useEffect(() => {
    dispatch(fetchBalanceSuccess(access_token));
    // if (role === "investor") dispatch(fetchUserSuccess(userId, role));
    // if (role === "farmer") dispatch(fetchUserSuccess(userId, role));
  }, []);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    // <View style={{ flex: 0.4 }}>
    <>
      {role === "investor" ? (
        <>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Poppins_600SemiBold",
              color: "#296F63",
              marginBottom: 40,
            }}
          >
            Recent Activities
          </Text>
          <ScrollView
            style={{ marginBottom: 180 }}
            showsVerticalScrollIndicator={false}
          >
            {recent.map((el) => {
              return <RecentList item={el} />;
            })}
          </ScrollView>
        </>
      ) : (
        <Text></Text>
      )}
    </>
    // </View>
  );
};

const styles = StyleSheet.create({});

export default Recent;
