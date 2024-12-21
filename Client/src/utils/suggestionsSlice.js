import { createSlice } from '@reduxjs/toolkit';

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: {
    cache: { 
      pickup: {}, 
      destination: {} 
    },
  },
  reducers: {
    updateCache: (state, action) => {
      const { field, input, suggestions } = action.payload;
      state.cache[field][input] = suggestions;
    },
  },
});

export const { updateCache } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;