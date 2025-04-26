import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import useFetchTrailers from "../Hooks/useFetchTrailers";
import { useYouTubeAPIKey } from "../context/Appcontext";
import Icon from "react-native-vector-icons/MaterialIcons";

const { height } = Dimensions.get("window");
const MODAL_HEIGHT = height * 0.9;

export default function MovieTrailerModal({ movieTitle, visible, onClose }) {
  const { trailers, loading, error, fetchTrailers } =
    useFetchTrailers(movieTitle);
  const YOUTUBE_API_KEY = useYouTubeAPIKey();
  const firstTrailer = trailers.length > 0 ? trailers[0] : null;

  useEffect(() => {
    if (visible) {
      fetchTrailers();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>{movieTitle}</Text>
            {loading && <ActivityIndicator size="large" color="#E50914" />}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {!loading && !error && firstTrailer && (
              <View style={styles.trailerContainer}>
                <Text style={styles.trailerTitle}>
                  {firstTrailer.snippet.title}
                </Text>
                <YoutubePlayer
                  height={200}
                  videoId={firstTrailer.id.videoId}
                  play={false}
                  webViewProps={{
                    injectedJavaScript: `
                      document.querySelector('iframe').style.borderRadius = 10px;
                    `,
                  }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#FFF" />
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: MODAL_HEIGHT,
    backgroundColor: "#141414",
    borderRadius: 20,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
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
  trailerContainer: {
    marginBottom: 20,
  },
  trailerTitle: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 8,
  },
});
