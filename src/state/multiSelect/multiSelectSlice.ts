import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: {
  errorMessage: string;
  isLoading: boolean;
  searchResults: Character[];
  selected: Character[];
  searchInput: string;
} = {
  errorMessage: '',
  isLoading: true,
  searchResults: [],
  selected: [],
  searchInput: '',
};

const multiSelectSlice = createSlice({
  name: 'multiSelect',
  initialState,
  reducers: {
    addSelectedItem: (state, action: PayloadAction<Character>) => {
      state.selected.push(action.payload);
    },
    removeSelectedItem: (state, action: PayloadAction<Character>) => {
      const { id } = action.payload;
      const singleItemIndex = state.selected.findIndex(
        (item) => item.id === id
      );
      if (singleItemIndex === -1) return state;
      state.selected.splice(singleItemIndex, 1);
    },
    search: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.errorMessage = '';
        state.isLoading = true;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.isLoading = false;
          state.errorMessage = '';
          state.searchResults = action.payload;
        }
      )
      .addCase(fetchData.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errorMessage = action.payload || 'There was an error :(';
      });
  },
});

export const fetchData = createAsyncThunk(
  'multiSelect/fetchData',
  async (searchInput: string, thunkAPI) => {
    try {
      const { data } = await axios(
        `https://rickandmortyapi.com/api/character/?name=${searchInput}`
      );
      return data.results;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        return thunkAPI.rejectWithValue('Nothing found');
      }
    }
  }
);

export const { addSelectedItem, removeSelectedItem, search } =
  multiSelectSlice.actions;

export default multiSelectSlice.reducer;
