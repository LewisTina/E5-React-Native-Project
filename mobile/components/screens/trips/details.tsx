import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FavoriteToggle from "@/components/favoriteToggle";
import Trip from "@/types/trip";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

export default function TripDetails({ tripsDatas }: { tripsDatas?: Trip }) {
  const router = useRouter();

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const { from } = useLocalSearchParams<{ from?: string }>();
  const goBack = () => {
    if (from === "trips") {
      router.replace({ pathname: "/(tabs)/trips" });
    } else {
      router.replace({ pathname: "/" });
    }
  };

  return (
    <View style={{ paddingBottom: 128 }}>
      {/* Header + Cover */}
      <ImageBackground
        source={{ uri: tripsDatas?.image }}
        style={styles.coverWrapper}
      >
        <SafeAreaView style={styles.headerContainer} edges={["top"]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <FavoriteToggle trip={tripsDatas} />
          </View>
          <LinearGradient
            colors={["transparent", "#000000"]}
            style={styles.frame}
          >
            <View style={styles.details}>
              <View style={{ width: "80%" }}>
                <Text style={styles.title}>{tripsDatas?.title}</Text>
                <Text style={styles.subtitle}>{tripsDatas?.destination}</Text>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>
      </ImageBackground>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={18} color="#6b7280" />
          <Text style={styles.dateText}>
            {new Date(
              tripsDatas?.startDate ?? "01-01-1970",
            ).toLocaleDateString()}{" "}
            →{" "}
            {new Date(tripsDatas?.endDate ?? "01-01-1970").toLocaleDateString()}
          </Text>
        </View>

        {!!tripsDatas?.description && (
          <Text style={styles.description}>{tripsDatas?.description}</Text>
        )}

        {/* Photos header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity>
            <Text style={styles.addPhoto}>+ Add photo</Text>
          </TouchableOpacity>
        </View>

        {/* Photos grid */}
        <View style={styles.photosGrid}>
          {(tripsDatas?.photos ?? []).map((photo, idx) => (
            <TouchableOpacity
              key={`${photo}-${idx}`}
              onPress={() => {
                setInitialIndex(idx);
                setGalleryOpen(true);
              }}
            >
              <Image source={{ uri: photo }} style={styles.photo} />
            </TouchableOpacity>
          ))}

          {(tripsDatas?.photos?.length ?? 0) === 0 && (
            <Text style={styles.emptyText}>Aucune photo</Text>
          )}
        </View>
      </View>

      {/* Gallery Modal */}
      <Modal visible={galleryOpen} transparent animationType="fade">
        <View style={styles.galleryContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setGalleryOpen(false)}
          >
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>

          <FlatList
            data={tripsDatas?.photos ?? []}
            keyExtractor={(item, index) => `${item}-${index}`}
            horizontal
            pagingEnabled
            initialScrollIndex={initialIndex}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.galleryItem}>
                <Image source={{ uri: item }} style={styles.galleryImage} />
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  coverWrapper: {
    width: "100%",
    aspectRatio: 0.8,
  },

  headerContainer: {
    position: "relative",
    height: "100%",
  },

  frame: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "",
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },

  category: {
    fontSize: 18,
    color: "gray",
  },

  favoriteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },

  container: { flex: 1, backgroundColor: "#f9fafb" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },

  coverImage: { width: "100%", height: 220 },

  content: { padding: 20 },
  dateRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  dateText: { color: "#374151", fontSize: 14 },
  description: { fontSize: 14, color: "#111827", marginBottom: 16 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  addPhoto: { color: "#a855f7", fontWeight: "600" },

  photosGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  photo: { width: 100, height: 100, borderRadius: 12 },
  emptyText: { color: "#9ca3af", fontSize: 14 },

  errorText: { color: "#ef4444", fontSize: 16, marginBottom: 12 },
  backText: { color: "#6366f1", fontWeight: "600" },

  galleryContainer: { flex: 1, backgroundColor: "black" },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  galleryItem: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryImage: {
    width,
    height,
    resizeMode: "contain",
  },
});
