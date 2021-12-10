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

export const fetchVehicleLog= createAsyncThunk(
  'vehicle/log',
  async ({ token,vid }, thunkAPI) => {
 
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}vehicle/logcount/`+vid,
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

export const fetchVehicleLastLog= createAsyncThunk(
  'vehicle/lastlog',
  async ({ token,vid }, thunkAPI) => {
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}vehicle/lastlog/`+vid,
        {
          method: 'GET',
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
    vehicleLg:[],
    vehicleLastLg:[],
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

    [fetchVehicleLog.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchVehicleLog.fulfilled]: (state, { payload }) => {
  
      state.isFetching = false;
      state.isSuccess = true;

      state.vehicleLg = payload;
      console.log( state. vehicleLog);
     
    },
    [fetchVehicleLog.rejected]: (state) => {
 
      console.log('fetchVehicleLog');
      state.isFetching = false;
      state.isError = true;
    },
    [fetchVehicleLastLog.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchVehicleLastLog.fulfilled]: (state, { payload }) => {
  
      state.isFetching = false;
      state.isSuccess = true;

      state. vehicleLastLg = payload;
      console.log( state. vehicleLog);
     
    },
    [fetchVehicleLastLog.rejected]: (state) => {
 
      console.log('fetchVehicleLastLog');
      state.isFetching = false;
      state.isError = true;
    },

  },
  
});

export const { clearState } = vehiclesSlice.actions;

export const vehiclesSelector = (state) => state.vehicles;
