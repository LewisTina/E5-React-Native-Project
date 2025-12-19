import Trip from "@/types/trip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  list: Trip[];
}

const initialState: FavoritesState = {
  list: [],
};

export const manageUserFavorite = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addToFavorite: (state, action: PayloadAction<Trip>) => {
      if (!state.list.some((favorite) => favorite.id === action.payload.id)) {
        state.list.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = manageUserFavorite.actions;

const favoriteReducer = manageUserFavorite.reducer;
export default favoriteReducer;
