import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { vehiclesSelector, fetchVehicleLastLog, clearState } from './VehiclesSlice';
import Loader from 'react-loader-spinner';
import { useHistory,useParams  } from 'react-router-dom';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const VehicleLastLog = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError ,isSuccess} = useSelector(vehiclesSelector);
  const { vid } = useParams();
  const mapStyles = {
    width: '100%',
    height: '100%'
  };
  

  useEffect(() => {
   
     dispatch(fetchVehicleLastLog({  token:localStorage.getItem('token') ,vid}));
  }, []);

  const {vehicleLastLg } = useSelector(vehiclesSelector);
 
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');

    history.push('/login');
  };

  const back = () => {
    history.push('/');
  };

 

  return (
    <div className="container mx-auto px-6">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
            <div className="container mx-auto">
            <div class="row p-3" >
            <div class="col">
            <h3>Vehicle Last Location</h3>
            </div>
            <div class="col p-3">
            <Button  onClick={back}  variant="secondary">Back</Button>{' '}
            <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
         </div>
        
          </div>
       {isSuccess  &&  <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAP_KEY}` }}
          style={mapStyles}
          initialCenter={
            {
              lat:  parseFloat(vehicleLastLg.lat),
              lng:  parseFloat(vehicleLastLg.lng)
            }
          }
          defaultZoom='11'
        >
          <AnyReactComponent
            lat={vehicleLastLg.lat}
            lng={vehicleLastLg.lng}
            text={vehicleLastLg.location && vehicleLastLg.location.Name}
          />
        </GoogleMapReact>
      </div>}
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Local Time</th>
      <th>Latitude</th>
      <th>Logitude</th>
      <th>Location</th>
      <th>Duration</th>
      <th>Speed</th>
    </tr>
  </thead>
  <tbody>
 
            
              
           <tr>
      <td>{vehicleLastLg.vehicle_id}</td>
      <td>{vehicleLastLg.name}</td>
      <td>{vehicleLastLg.local_time}</td>
      <td>{vehicleLastLg.lat}</td>
      <td>{vehicleLastLg.lng}</td>
      <td>{vehicleLastLg.location && vehicleLastLg.location.Name}</td>
      <td>{vehicleLastLg.direction}</td>
      <td>{vehicleLastLg.speed}</td>
    </tr>
     
  
  </tbody>
</Table>
        </div>  
        </Fragment>
      )}
    </div>
  );
};

export default VehicleLastLog;
