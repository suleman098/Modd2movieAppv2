import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Logo({ scale = 1 }) {
  // Add scale prop with default value
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 8,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(500),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnim, {
              toValue: 0.7,
              duration: 2000,
              useNativeDriver: false,
            }),
          ])
        ),
      ]),
    ]).start();
  }, []);

  const glowStyle = {
    shadowOpacity: glowAnim,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: Animated.multiply(scaleAnim, scale) }],
        },
      ]}
    >
      <LinearGradient
        colors={["#E50914", "#B20710"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.logoContainer, glowStyle]}>
          <Text style={styles.mood}>MOOD</Text>
          <Text style={styles.number}>2</Text>
          <Text style={styles.movie}>MOVIE</Text>
        </Animated.View>
      </LinearGradient>
      <Text style={styles.tagline}>Find your perfect movie match</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  gradient: {
    padding: 20,
    borderRadius: 15,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  mood: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(229, 9, 20, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  number: {
    fontSize: 52,
    fontWeight: "900",
    color: "#FFFFFF",
    marginHorizontal: 4,
    textShadowColor: "rgba(229, 9, 20, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 15,
  },
  movie: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -1,
    textShadowColor: "rgba(229, 9, 20, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#FFF",
    marginTop: 10,
    opacity: 0.8,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
