import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import { vehiclesSelector, fetchVehicleLog, clearState } from './VehiclesSlice';
import Loader from 'react-loader-spinner';
import { useHistory,useParams  } from 'react-router-dom';

const VehicleLog = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError,isSuccess } = useSelector(vehiclesSelector);
  const { vid } = useParams();
  


  useEffect(() => {
   
     dispatch(fetchVehicleLog({  token:localStorage.getItem('token') ,vid}));
  }, []);

  const {vehicleLg} = useSelector(vehiclesSelector);
  
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

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div className="container mx-auto"><button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
            <h3>Vehicle Log Count</h3>
          </div>
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Year-Mon</th>
      <th>Count</th>
    </tr>
  </thead>
  <tbody>
  {vehicleLg.data && vehicleLg.data.map((row, i) => {
            
              return (
                <tr>
      <td>{row.vehicle_id}</td>
      <td>{row.name}</td>
      <td>{row.year_month}</td>
      <td>{row.count}</td>
    </tr>
              );
            })}
  
  </tbody>
</Table>
          
        </Fragment>
      )}
    </div>
  );
};

export default VehicleLog;
