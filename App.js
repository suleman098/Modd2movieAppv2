import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import InitialScreen from "./Screens/InitialScreen";
import SelectMoodScreen from "./Screens/SelectMoodScreen";
import RecommendationScreen from "./Screens/RecommendationScreen";
import { MoodProvider } from "./context/Appcontext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MoodProvider>
      <View style={styles.container}>
        <LinearGradient colors={["#141414", "#000000"]} style={styles.gradient}>
          <StatusBar
            style="light"
            translucent={true}
            backgroundColor="transparent"
          />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Initial"
              screenOptions={{
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "#ffffff",
                headerBackground: () => (
                  <LinearGradient
                    colors={["#141414", "#000000"]}
                    style={{ flex: 1 }}
                  />
                ),
              }}
            >
              <Stack.Screen
                name="Initial"
                component={InitialScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="SelectMood" component={SelectMoodScreen} />
              <Stack.Screen
                name="Recommendation"
                component={RecommendationScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LinearGradient>
      </View>
    </MoodProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});
