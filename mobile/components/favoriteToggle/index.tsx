import { addToFavorite, removeFromFavorite } from "@/store/favorites";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import Trip from "@/types/trip";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function FavoriteToggle({ trip }: { trip?: Trip }) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.list);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    !!favorites.find((item) => item.id === trip?.id),
  );

  useEffect(() => {
    setIsFavorite(!!favorites.find((item) => item.id === trip?.id));
  }, [favorites, trip?.id]);

  const handleFavorite = useCallback(() => {
    if (!trip) return;
    dispatch(isFavorite ? removeFromFavorite(trip.id) : addToFavorite(trip));
  }, [dispatch, isFavorite, trip]);

  return (
    <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={26}
        color={isFavorite ? "#ef4444" : "#fff"}
      />
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  favoriteButton: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderRadius: 20,
    padding: 6,
  },
});
