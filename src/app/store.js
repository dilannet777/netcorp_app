import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/UserSlice';
import { vehiclesSlice } from '../features/Vehicles/VehiclesSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    vehicles:vehiclesSlice.reducer
  },
});
