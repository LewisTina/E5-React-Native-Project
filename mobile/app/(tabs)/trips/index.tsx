import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTrips } from "@/hooks/use-api-fetch";
import { useAppSelector } from "@/store/hook";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const { retrieveTrips } = useTrips();
  const { data: tripsDatas } = useQuery({
    queryKey: ["trips"],
    queryFn: retrieveTrips,
  });

  const favorites = useAppSelector((state) => state.favorites.list);
  const [search, setSearch] = useState("");

  const tabs = ["All", "Upcoming", "Past", "Favorites"];

  const filteredTrips = useMemo(() => {
    const now = Date.now();

    if (selectedTab === "Favorites") {
      return favorites.filter((trip) =>
        `${trip.title} ${trip.destination}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    return tripsDatas?.data
      ?.filter((trip) => {
        if (selectedTab === "Upcoming") {
          return new Date(trip.startDate).getTime() > now;
        }
        if (selectedTab === "Past") {
          return new Date(trip.endDate).getTime() < now;
        }
        return true;
      })
      .filter((trip) =>
        `${trip.title} ${trip.destination}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
  }, [tripsDatas, favorites, selectedTab, search]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.HeaderTitle}>My Trips</Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search trips"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabAcitve]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trips List */}
        <View style={styles.tripsList}>
          {filteredTrips?.map((trip) => {
            console.log(trip.image);
            return (
              <TouchableOpacity
                key={trip.title}
                style={styles.tripCard}
                onPress={() =>
                  router.push({
                    pathname: "/trips/[id]",
                    params: { id: trip.id, from: "trips" },
                  })
                }
              >
                {/* Image */}
                <View style={styles.tripImageContainer}>
                  <Image
                    source={trip.image ?? trip.photos?.[0] ?? undefined}
                    style={styles.tripImage}
                    resizeMode="cover"
                  />

                  <View style={styles.tripImageOverlay} />
                  <View style={styles.tripImageContent}>
                    <Text style={styles.tripCardTitle}>{trip.title}</Text>
                    <View style={styles.tripLocation}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="white"
                      />
                      <Text style={styles.tripLocationText}>
                        {trip.destination}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Trip info */}

                <View style={styles.tripCardInfo}>
                  <View style={styles.tripDate}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#6b7280"
                    />
                    <Text style={styles.tripDateText}>
                      {new Date(trip.startDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      -
                      {new Date(trip.endDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Text>
                  </View>
                  <View style={styles.tripPhotos}>
                    <View style={styles.photoCircle} />
                    <View style={[styles.photoCircle, styles.photoCircle2]} />
                    <View style={[styles.photoCircle, styles.photoCircle3]}>
                      <Text style={styles.tripPhotoCount}>
                        {trip.photos?.length || 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => router.push("/modal/add-trip")}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  HeaderTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: "#a855f7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  tabsContent: {
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "white",
  },
  tabAcitve: {
    backgroundColor: "#a855f7",
  },
  tabText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "white",
  },
  tripsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  tripImageContainer: {
    position: "relative",
    height: 192,
  },
  tripImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FF0",
  },
  tripImageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  tripImageContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  tripCardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  tripLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tripLocationText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
  },
  tripCardInfo: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tripDateText: {
    color: "#6b7280",
    fontSize: 14,
  },
  tripPhotos: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#d1d5db",
    borderWidth: 2,
    borderColor: "white",
    marginLeft: -8,
  },
  photoCircle2: {
    backgroundColor: "#d1d5db",
  },
  photoCircle3: {
    backgroundColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
  },
  tripPhotoCount: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  fabButton: {
    position: "absolute",
    bottom: 80,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#a855f7",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
