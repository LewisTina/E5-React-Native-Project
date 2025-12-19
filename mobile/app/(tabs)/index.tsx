import React from "react";

import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useActivities, useTrips } from "@/hooks/use-api-fetch";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export const IMAGES_SOURCES = {
  paris: require("@/assets/images/paris.jpeg"),
  tokyo: require("@/assets/images/tokyo.jpeg"),
  bali: require("@/assets/images/bali.jpeg"),
};

export default function HomeScreen() {
  const router = useRouter();
  const { retrieveUpcomingTrips, retrieveStatistics } = useTrips();
  const { retrieveActivities } = useActivities();
  const { data: statisticsDatas, isLoading: statisticsLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: retrieveStatistics,
  });
  const { data: upcomingTripsDatas, isLoading: upcomingTripsLoading } =
    useQuery({
      queryKey: ["upcomingTrips"],
      queryFn: retrieveUpcomingTrips,
    });

  const { data: activitiesDatas, isLoading: activitiesLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: retrieveActivities,
  });

  const stats: {
    label: string;
    value: number;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    {
      label: "Trips",
      value: statisticsDatas?.data?.totalTrips || 0,
      icon: "airplane-outline",
    },
    {
      label: "Photos",
      value: statisticsDatas?.data?.totalPhotos || 0,
      icon: "camera-outline",
    },
    {
      label: "Countries",
      value: statisticsDatas?.data?.totalCountries || 0,
      icon: "globe-outline",
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        {/* Header */}
        <LinearGradient colors={["#a855f7", "#ec4899"]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greentingText}>Hello</Text>
              <Text style={styles.firstnameText}>Odilon!</Text>
            </View>
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => router.replace("/(tabs)/notification")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
            </TouchableOpacity>
          </View>

          {/* Stats */}

          {/* <View style={{ flexDirection : 'row', justifyContent : 'space-between' }}> */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Ionicons
                  name={stat.icon}
                  color="#fff"
                  style={styles.statIcon}
                />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.homeContent}>
          {/* Upcoming trips */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
              <TouchableOpacity onPress={() => router.replace("/(tabs)/trips")}>
                <Text style={styles.homeSeeAllBtn}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {upcomingTripsDatas?.data?.map((trip) => {
          const dayLeft = Math.ceil(
            (new Date(trip.startDate).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          );
          return (
            <TouchableOpacity key={trip.title} style={styles.tripCard}>
              <Image
                source={
                  IMAGES_SOURCES[trip.image as keyof typeof IMAGES_SOURCES] ||
                  trip.image
                }
                style={styles.tripImage}
              />
              <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>{trip.title}</Text>
                <View style={styles.tripDate}>
                  <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                  <Text style={styles.tripDateText}>
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.tripBadge}>
                  <Text style={styles.tripBadgeText}>
                    {dayLeft < 0
                      ? "Passé de " + Math.abs(dayLeft) + " jours"
                      : dayLeft === 0
                        ? "Aujourd'hui"
                        : dayLeft === 1
                          ? "Demain"
                          : `${dayLeft} jours`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, paddingHorizontal: 12 }}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity>
              <LinearGradient
                colors={["#a855f7", "#ec4899"]}
                style={styles.quickActionCard}
              >
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>New Trip</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <LinearGradient
                colors={["#3b82f6", "#06b6d4"]}
                style={styles.quickActionCard}
              >
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>Add Photo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <LinearGradient
                colors={["#10b981", "#059669"]}
                style={styles.quickActionCard}
              >
                <Ionicons name="map-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>Explore</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}

        <View style={styles.section}>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ ...styles.sectionTitle, paddingHorizontal: 12 }}>
              Recent Activity
            </Text>

            {activitiesDatas?.data?.map((activity, idx) => (
              <View style={styles.activityCard} key={idx}>
                <Text style={styles.activityIcon}>
                  <Ionicons
                    name={
                      `${activity.type}-outline` as keyof typeof Ionicons.glyphMap
                    }
                    size={24}
                    color="#6b7280"
                  />
                </Text>
                <View>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greentingText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 24,
  },
  firstnameText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },
  homeContent: {
    padding: 24,
    paddingBottom: 0,
    marginBottom: 0,
  },
  section: {
    marginBottom: 24,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  homeSeeAllBtn: {
    color: "#a855f7",
    fontSize: 14,
    fontWeight: "bold",
  },
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    marginBottom: 12,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  tripInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  tripDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  tripDateText: {
    color: "#6b7280",
    fontSize: 14,
  },
  tripBadge: {
    backgroundColor: "#ede9fe",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  tripBadgeText: {
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: "bold",
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 12,
  },
  quickActionCard: {
    width: 110,
    height: 110,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quickActionLabel: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 8,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
