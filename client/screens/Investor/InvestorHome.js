import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import SafeArea from "../SafeArea";
import Input from "../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmsSuccess } from "../../store/actions/actionCreator";
import CardItem from "../../components/Card";
import axios from "axios";
import CategoryListItem from "../../components/CategoryListItem";

const InvestorHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const { farms, loading } = useSelector((state) => {
    return state.farms;
  });
  const { role } = useSelector((state) => {
    return state.user;
  });
  //   console.log(farms, "");
  const [search, setSearch] = useState("");
  const [err, setErr] = useState([]);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_500Medium,
  });
  const categoryOptions = [
    "Chicken",
    "Beef",
    "Dairy",
    "Open-Land",
    "Crops",
    "Pork",
  ];

  useEffect(() => {
    dispatch(fetchFarmsSuccess(role));
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleSearch = async () => {
    try {
      let valid = true;
      if (!search) {
        handleError("search", "Please input search");
        valid = false;
      }

      if (valid) {
        const { data } = await axios(
          "https://114f-180-241-183-225.ngrok-free.app/farms?city=" + search
        );
        navigation.push("filter", {
          filter: search,
          data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = (name, msg) => {
    setErr((prev) => ({
      ...prev,
      [name]: msg,
    }));
  };

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ marginTop: 20, marginBottom: 15 }}>
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
            Investor
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 0.77 }}>
            <Input
              label={"Search"}
              bg={"#296F63"}
              placeholder={"Search by city"}
              error={err.search}
              onChangeText={(e) => setSearch(e)}
              onFocus={() => {
                handleError("search", null);
              }}
            />
          </View>
          <View
            style={{
              marginTop: 7,
              flex: 0.2,
              alignItems: "center",
              backgroundColor: "#296F63",
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Pressable
              style={{
                paddingHorizontal: 10,
                paddingVertical: 14,
              }}
              onPress={() => handleSearch()}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 2,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Poppins_500Medium",
                color: "#767676",
              }}
            >
              Popular Farms
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("allFarm");
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#296F63",
                  fontFamily: "Poppins_300Light",
                }}
              >
                See all
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={farms}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    onPress={() =>
                      navigation.push("detailFarm", {
                        farmId: item.id,
                      })
                    }
                  >
                    <CardItem item={item} />
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Poppins_500Medium",
              color: "#767676",
            }}
          >
            Categories
          </Text>
          <View style={{ marginTop: 30 }}>
            <CategoryListItem navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default InvestorHome;
