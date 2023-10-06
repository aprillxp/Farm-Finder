import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function Button({ pres, text, bg }) {
  return (
    <View style={styles.containerButton}>
      <Pressable style={styles.button} onPress={pres}>
        <Text
          style={{
            backgroundColor: bg,
            textAlign: "center",
            paddingVertical: 13,
            fontSize: 20,
            fontFamily: "Poppins_600SemiBold",
            color: "white",
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    // flex: 0.1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
});
