import React, { createContext, useState } from 'react';
import firebase from 'firebase/app'
import axios from 'axios';
import { colors } from 'react-native-elements';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          // try {
          //   await firebase.auth().signInWithEmailAndPassword(email, password).then(
          //     (res) => {
          //       if (res.user) {
          //         setUser(user)
          //       }
          //     }
          //   );
          // } catch (e) {
          //   console.log(e);
          // }

          try {
            fetch('http://192.168.1.217:3000/auth/sign-in',
              {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify({
                  phone: "0945802626",
                  passcode: "123123"
                })

              })
          }
          catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((res) => {
                console.log(res);
                if (res.user) {
                  setUser(user)
                }
                // firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                //   .set({
                //     fname: '',
                //     lname: '',
                //     email: email,
                //     createdAt: firestore.Timestamp.fromDate(new Date()),
                //     userImg: null,
                //   })

                //   .catch(error => {
                //     console.log('Something went wrong with added user to firestore: ', error);
                //   })
              })
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      { children}
    </AuthContext.Provider >
  )
}