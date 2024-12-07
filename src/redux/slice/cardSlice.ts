import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCard = createAsyncThunk<Card[], void>('cards/fetchCard', async () => {
  const { data } = await axios.get<Card[]>(`https://f773f3009303798d.mokky.dev/cards`);

  return data;
});

export type Card = {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface cardState {
  data: Card[];
  status: Status;
  imageUrl: string[];
  filter: string;
  favorites: Card[];
}

const initialState = {
  data: [],
  status: Status.LOADING,
  imageUrl: [],
  favorites: [],
  filter: 'all',
} as cardState;

const cardsSilce = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setItems(state, action) {
      state.data.push(action.payload);
      console.log(action.payload);
    },
    setFavorite(state, action) {
      const isAvailable = state.favorites.find((item) => item._id === action.payload._id);

      if (!isAvailable) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter((item) => item._id !== action.payload._id);
      }
    },
    deleteItems(state, action) {
      state.data = state.data.filter((item) => item._id !== action.payload);
      state.favorites = state.favorites.filter((item) => item._id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCard.pending, (state) => {
      state.data = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCard.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = [];
    });
  },
});

export const { setItems, setFavorite, deleteItems, setFilter } = cardsSilce.actions;

export default cardsSilce.reducer;
