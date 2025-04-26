import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useFetchMovies from "../Hooks/useFetchMovies";
import HorizontalMovieCarousel from "../components/HorizontalMovieCarousel";
import { useMoods } from "../context/Appcontext";

export default function RecommendationScreen({ route }) {
  const { mood } = route.params;
  const { movies, loading, error } = useFetchMovies(mood);
  const moods = useMoods();

  const selectedMood = moods.find((m) => m.category === mood);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Movies for {selectedMood?.emoji} {selectedMood?.name}
      </Text>
      {loading && <ActivityIndicator size="large" color="#E50914" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && <HorizontalMovieCarousel movies={movies} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10, // Adjusted since we removed the logo
    paddingBottom: 10,
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },
  errorText: {
    color: "#E50914",
    textAlign: "center",
    marginBottom: 20,
  },
});
