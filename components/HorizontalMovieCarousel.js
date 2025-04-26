import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";

export default function HorizontalMovieCarousel({ movies }) {
  return (
    <FlatList
      data={movies}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <MovieCard movie={item} />}
      contentContainerStyle={styles.carousel}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    paddingHorizontal: 10,
  },
});
