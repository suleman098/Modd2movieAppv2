import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MoodButtons({ moods, selectedIndex, onSelect }) {
  return (
    <View style={styles.container}>
      {moods.map((mood, index) => (
        <TouchableOpacity
          key={mood.name}
          style={[
            styles.card,
            {
              backgroundColor: index === selectedIndex ? "#E50914" : "#FFF",
              borderColor: index === selectedIndex ? "#E50914" : "#E0E0E0",
              transform: [{ scale: index === selectedIndex ? 1 : 0.95 }],
            },
          ]}
          onPress={() => onSelect(index)}
        >
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text
            style={[
              styles.title,
              { color: index === selectedIndex ? "#FFF" : "#666" },
            ]}
          >
            {mood.name}
          </Text>
          {index === selectedIndex && (
            <Text style={styles.description}>
              {mood.description || "Selected"}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.45, // Half of previous 0.9
    height: height * 0.35, // Half of previous 0.7
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  emoji: {
    fontSize: 40, // Reduced from 80
    marginBottom: 10,
  },
  title: {
    fontSize: 20, // Reduced from 32
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFF",
    lineHeight: 18,
    opacity: 0.9,
    marginTop: 8,
  },
});
