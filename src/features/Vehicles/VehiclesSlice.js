import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchVehicles= createAsyncThunk(
  'vehicles/list',
  async ({ token }, thunkAPI) => {
   
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}vehicles`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
  
        }
      );
      let data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles:[],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
       [fetchVehicles.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchVehicles.fulfilled]: (state, { payload }) => {
  
      state.isFetching = false;
      state.isSuccess = true;

      state.vehicles = payload;
      console.log( state.vehicles);
     
    },
    [fetchVehicles.rejected]: (state) => {
 
      console.log('fetchVehicles');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = vehiclesSlice.actions;

export const vehiclesSelector = (state) => state.vehicles;
