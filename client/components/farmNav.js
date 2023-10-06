import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InvestorHome from "../screens/Investor/InvestorHome";
import invest from "../screens/Investor/invest";
import Balance from "../screens/Investor/balance";
import Profile from "../screens/profile";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import FarmerHome from "../screens/Farmer/FarmerHome";
import Investment from "../screens/Farmer/investment";

const Tab = createBottomTabNavigator();

const FarmNav = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="farmerHome"
          component={FarmerHome}
          options={{
            tabBarActiveTintColor: "#296F63",
            headerShown: false,

            title: "Home",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return <AntDesign name="home" size={24} color="#296F63" />;
              }
              return <AntDesign name="home" size={24} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="invest"
          component={Investment}
          options={{
            tabBarActiveTintColor: "#296F63",
            headerShown: false,
            title: "Investments",
            tabBarIcon: ({ focused }) => {
              if (focused)
                return (
                  <Ionicons
                    name="ios-analytics-outline"
                    size={24}
                    color="#296F63"
                  />
                );
              return (
                <Ionicons
                  name="ios-analytics-outline"
                  size={24}
                  color="black"
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarActiveTintColor: "#296F63",
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ focused }) => {
              if (focused)
                return (
                  <FontAwesome5 name="user-circle" size={24} color="#296F63" />
                );
              return (
                <FontAwesome5 name="user-circle" size={24} color="black" />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default FarmNav;
