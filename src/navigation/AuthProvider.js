import React, { createContext, useState } from 'react';
import firebase from 'firebase/app'
import axios from 'axios';
import { colors } from 'react-native-elements';
import * as url from '../constants/url'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isSuccess,
        error,
        setUser,
        login: async (username, password) => {
          try {
            axios.post(url.API_URL + "user/login", {
              username: username,
              password: password
            }).then(res => {
              console.log(res);
              if (res.status === 200) {
                setUser(res.data.user);
                setToken(res.data.token);
                setIsSuccess(false);
              } else {
                console.log(res);
                setIsSuccess(true);
                setError(false)
                alert("Đăng nhập không thành công")
              }
            })
          }
          catch (e) {
            console.log(e);
          }
        },
        register: async (name, username, password) => {
          try {
            axios.post(url.API_URL + "user/register", {
              name: name,
              username: username,
              password: password
            }).then(res => {
              console.log(res);
            })
          }
          catch (e) {
            console.log(e);
          }
        },
        logout: () => {

          setToken(null);
          setUser(null)

        },
      }}
    >
      { children}
    </AuthContext.Provider >
  )
}