import React from 'react';
import {RootState} from '../store/Store';
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {loginActionCreator} from '../store/slices/UserSlice';


export const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((state : RootState) => state.user.user);
  const dispatch = useDispatch();

  //This code will be added to the login page when it will be created.
  const desiredPath = location.search ? "/" + location.search.substring(10) : "/dashboard"; 

  //TODO To add this function when the login page is implemented 
  const login = () => {
    dispatch(loginActionCreator({id: '123', name: 'John Doe'}));
    history.replace(desiredPath);
  }

    return(
        <div>
          <h1>Login</h1>
          <button onClick={login}>Login</button>
        </div>
    );
}
