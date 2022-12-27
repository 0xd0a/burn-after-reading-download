import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: ''
};

export const passSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.value = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPassword } = passSlice.actions;

export default passSlice.reducer;
