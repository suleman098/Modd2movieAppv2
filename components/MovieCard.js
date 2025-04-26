import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MovieDetailsModal from "./MovieDetailsModal";
import MovieTrailerModal from "./MovieTrailerModal";
import { useMoods } from "../context/Appcontext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9; // Wider cards like Netflix
const POSTER_ASPECT_RATIO = 1.5; // More vertical aspect ratio like Netflix posters

export default function MovieCard({ movie }) {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [trailerModalVisible, setTrailerModalVisible] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(null);
  const moods = useMoods();

  const handlePlayPress = (title) => {
    setSelectedMovieTitle(title);
    setTrailerModalVisible(true);
  };

  const handleInfoPress = () => {
    setDetailsModalVisible(true);
  };

  const getCategoryName = (id) => {
    const mood = moods.find((m) => m.category === id);
    return mood ? mood.categoryName : "Unknown";
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Genre Tags */}
        <View style={styles.genreContainer}>
          {movie.genre_ids.slice(0, 3).map((genre, index) => (
            <Text key={index} style={styles.genreTag}>
              {getCategoryName(genre)}{" "}
              {index < Math.min(2, movie.genre_ids.length - 1) && "•"}
            </Text>
          ))}
        </View>

        {/* Centered Action Buttons */}
        <View style={styles.centeredActions}>
          <TouchableOpacity
            style={styles.trailerButton}
            onPress={() => handlePlayPress(movie.title)}
          >
            <Icon name="play-arrow" size={24} color="#000" />
            <Text style={styles.trailerButtonText}>Trailer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoButton} onPress={handleInfoPress}>
            <Icon name="info-outline" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MovieDetailsModal
        visible={detailsModalVisible}
        movie={movie}
        onClose={() => setDetailsModalVisible(false)}
      />

      <MovieTrailerModal
        movieTitle={selectedMovieTitle}
        visible={trailerModalVisible}
        onClose={() => setTrailerModalVisible(false)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * POSTER_ASPECT_RATIO,
    marginHorizontal: 8,
    marginBottom: 20,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#141414",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingBottom: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  genreTag: {
    color: "#FFF",
    fontSize: 12,
    marginRight: 6,
  },
  centeredActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  trailerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  trailerButtonText: {
    color: "#000",
    fontWeight: "600",
    marginLeft: 4,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(109, 109, 109, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 4,
  },
});
