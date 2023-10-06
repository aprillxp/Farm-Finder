import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import SafeArea from "../SafeArea";
import axios from "axios";
import FarmCard from "../../components/farmCard";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import CardItem from "../../components/Card";
import { fetchFarmsSuccess } from "../../store/actions/actionCreator";

const FarmerHome = ({ navigation }) => {
  //   const [farmData, setFarmData] = useState([]);
  const dispatch = useDispatch();
  const { access_token, role } = useSelector((state) => {
    return state.user;
  });
  const { farms: farmData } = useSelector((state) => {
    return state.farms;
  });

  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    dispatch(fetchFarmsSuccess(role, access_token));
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  console.log(farmData);
  return (
    <SafeArea>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 35,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins_700Bold",
                color: "#767676",
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 38,
                fontFamily: "Poppins_700Bold",
                marginTop: -15,
                color: "#296F63",
              }}
            >
              Farmer
            </Text>
          </View>
          <Pressable
            style={{ marginTop: -15 }}
            onPress={() => navigation.navigate("addFarm")}
          >
            <Text
              style={{
                marginTop: -15,
                fontSize: 20,
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: "#296F63",
                color: "white",
                borderRadius: 5,
                overflow: "hidden",
                fontFamily: "Poppins_500Medium",
              }}
            >
              Add Farm
            </Text>
          </Pressable>
        </View>
        {farmData.length ? (
          farmData.map((farm, index) => (
            <FarmCard key={index} item={farm} navigation={navigation} />
          ))
        ) : (
          <Text>You dont have a property</Text>
        )}
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  homeText: {
    // fontWeight: "bold",
    fontSize: 25,
  },
  farmListText: {
    fontWeight: "300",
    fontSize: 25,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 15,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
    padding: 2,
  },
});

export default FarmerHome;
