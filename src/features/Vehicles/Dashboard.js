import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { vehiclesSelector, fetchVehicles, clearState } from './VehiclesSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(vehiclesSelector);
  
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
          <div className="container mx-auto"><button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
            <h3>Active vehicles List</h3>
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

export default Dashboard;
