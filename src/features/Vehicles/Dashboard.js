import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Table, Button} from 'react-bootstrap';
import { vehiclesSelector, fetchVehicles, clearState } from './VehiclesSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(vehiclesSelector);
  
  const viewLogCount = (id) => {
    history.push('/vehicle-log/'+id);
  };

  const viewLastLog = (id) => {
    history.push('/vehicle-last-log/'+id);
  };


  useEffect(() => {
  
     dispatch(fetchVehicles({ token: localStorage.getItem('token') }));
  }, []);

  const {vehicles } = useSelector(vehiclesSelector);

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
          <div className="container mx-auto">
            <div class="row" >
            <div class="col">
            <h3>Active Vehicles List</h3>
            </div>
              <div class="col">
            <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
         </div>
        
          </div>
          <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>AgiDrive</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {vehicles.data && vehicles.data.map((row, i) => {
            
              return (
                <tr>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.is_agidrive}</td>
      {row.is_agidrive=='on' ? (  <td><>
  <Button onClick={() => viewLogCount(row.id)} variant="primary"  active>
    Log Count
  </Button>{' '}
  <Button onClick={() => viewLastLog(row.id)}  active>
    Last Info
  </Button>
</></td>):''}
    </tr>
              );
            })}
  
  </tbody>
</Table>
</div>    
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
