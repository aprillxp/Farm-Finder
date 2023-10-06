import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";

const Input = ({ error, bg, ...props }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TextInput
        mode="outlined"
        placeholder=""
        outlineColor={bg}
        activeOutlineColor={bg}
        style={{ marginBottom: 10 }}
        error={error}
        {...props}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : ""}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
