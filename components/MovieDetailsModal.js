import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useMoods } from "../context/Appcontext";

export default function MovieDetailsModal({ movie, visible, onClose }) {
  const moods = useMoods();

  const getCategoryName = (id) => {
    const mood = moods.find((m) => m.category === id);
    return mood ? mood.categoryName : "Unknown";
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={24} color="#FFF" />
        </TouchableOpacity>

        <ScrollView style={styles.modalContent}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.modalImage}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{movie.title}</Text>

            <View style={styles.metadata}>
              <Text style={styles.year}>
                {movie.release_date?.split("-")[0]}
              </Text>
              <Text style={styles.runtime}>{movie.runtime} min</Text>
              <View style={styles.hdBadge}>
                <Text style={styles.hdText}>HD</Text>
              </View>
              <Text style={styles.rating}>
                <Text style={styles.infoLabel}>Rating: </Text>
                {movie.vote_average}
              </Text>
              <Text style={styles.language}>
                <Text style={styles.infoLabel}>Language: </Text>
                {movie.original_language.toUpperCase()}
              </Text>
            </View>
            <View style={styles.metadata}>
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Genre: </Text>
                {movie.genre_ids.map((id) => getCategoryName(id)).join(", ")}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoLabel}>Release Date: </Text>
                {movie.release_date}
              </Text>
            </View>

            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#141414",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  year: {
    color: "#FFF",
    marginRight: 10,
  },
  runtime: {
    color: "#FFF",
    marginRight: 10,
  },
  hdBadge: {
    borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    marginRight: 10,
  },
  hdText: {
    color: "#FFF",
    fontSize: 12,
  },
  rating: {
    color: "#FFF",
    marginRight: 10,
  },
  language: {
    color: "#FFF",
    marginRight: 10,
  },
  overview: {
    color: "#FFF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  playText: {
    color: "#000",
    fontWeight: "bold",
    marginLeft: 5,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  downloadText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  additionalInfo: {
    marginTop: 20,
  },
  infoText: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
  },
});
