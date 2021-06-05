
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebaseApp } from '../constants/ApiKeys';
import { AuthContext } from './AuthProvider';
import * as url from '../constants/url'
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import axios from 'axios';


const Routes = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  console.log(user);
  useEffect(() => {
    console.log(user);
  }, [user])
  return (
    <NavigationContainer    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;