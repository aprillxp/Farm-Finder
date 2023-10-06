import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import SafeArea from "../SafeArea";
import BackButton from "../../components/backButton";
import {
  useFonts,
  Poppins_300Light,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useSelector, useDispatch } from "react-redux";
import CardItem from "../../components/Card";
import { fetchFarmsSuccess } from "../../store/actions/actionCreator";

export default function allFarm({ navigation }) {
  const dispatch = useDispatch();
  const { farms } = useSelector((state) => {
    return state.farms;
  });
  const { role } = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    dispatch(fetchFarmsSuccess(role));
  }, []);
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
  return (
    <SafeArea>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 50,
        }}
      >
        <BackButton navigation={navigation} />
        <Text
          style={{
            fontSize: 24,
            color: "#296F63",
            fontFamily: "Roboto_700Bold",
            marginLeft: -20,
          }}
        >
          Farms
        </Text>
        <Text></Text>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <ScrollView stickyHeaderHiddenOnScroll={true}>
          {farms ? (
            farms.map((item) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.push("detailFarm", {
                      farmId: item.id,
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      // overflow: "hidden",
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "#296F63",
                      position: "relative",
                      marginBottom: 20,
                    }}
                  >
                    <View
                      style={{
                        overflow: "hidden",
                        borderRadius: 10,
                        width: 370,
                        height: 150,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: 450,
                          height: 300,
                          resizeMode: "contain",
                          borderRadius: 20,
                        }}
                        source={{
                          uri: `${item.mainImgUrl}`,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        right: 25,
                        top: 20,
                        borderRadius: 5,
                        overflow: "hidden",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          borderRadius: 10,
                          backgroundColor: "#296F63",
                          color: "white",
                          paddingHorizontal: 10,
                          paddingVertical: 10,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        {item.category.split("-").join(" ")}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 17,
                        paddingTop: 5,
                        paddingBottom: 15,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text>{item.city}</Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          Rp. {item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <Text>Farms is not found</Text>
          )}
        </ScrollView>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({});
