import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Logo from "../components/Logo";

export default function InitialScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("SelectMood");
    }, 2500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
