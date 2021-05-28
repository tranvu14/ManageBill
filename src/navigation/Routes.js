
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { firebaseApp } from '../constants/ApiKeys';
import { AuthContext } from './AuthProvider';
import * as url from '../constants/url'
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import axios from 'axios';
import { cleanSingle } from 'react-native-image-crop-picker';

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [initializing, setInitializing] = useState(true);
  console.log(user);


  useEffect(() => {
    console.log(firebaseApp);
    const subscriber = firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      if (initializing)
        setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [user]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {profile ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;