import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView } from "react-native";

import TripDetails from "@/components/screens/trips/details";
import { useTrips } from "@/hooks/use-api-fetch";
import { useQuery } from "@tanstack/react-query";

export default function TripDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { retrieveTripById } = useTrips();
  const { data: tripsDatas, isLoading } = useQuery({
    queryKey: ["trips", id],
    queryFn: () => retrieveTripById(id),
  });

  return (
    <ScrollView
      alwaysBounceVertical={true}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="grey"
          style={{ margin: "auto" }}
        />
      ) : (
        <TripDetails tripsDatas={tripsDatas?.data} />
      )}
    </ScrollView>
  );
}
