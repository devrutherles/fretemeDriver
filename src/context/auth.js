import React, { createContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// create the auth context to provide auth-related values and functions to its children components
export const AuthContext = createContext({});
function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [currentScreen, setCurrentScreen] = useState('');
  const [isSignedIn, setIsSignedIn] = useState([]);
  const [id, setId] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [work, setWork] = useState(true);
  const [start, setStart] = useState(false);
  const [acept, setAcept] = useState(false);
  const [news, setNews] = useState(false);
  // check if the user is logged in by checking the value of the '@isLoggedIn' key in AsyncStorage
  const checkIfLoggedIn = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
      const user = await AsyncStorage.getItem('@user');

      if (isLoggedIn == 'true') {
        setIsSignedIn(true);
      }
      setId(JSON.parse(user).id);
    } catch (error) {
      setIsSignedIn(false);
    }
  };
  checkIfLoggedIn();
  // remove the '@isLoggedIn' key from AsyncStorage and set isSignedIn to false
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@isLoggedIn');
      setIsSignedIn(false);
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  // update the currentScreen state variable
  const showTab = (data) => {
    setCurrentScreen(data);
  };

  // update the email state variable and navigate to the 'Code' screen
  const setEmailAndNavigate = (email) => {
    setEmail(email);

    navigation.navigate('Code');
  };

  // update the code state variable
  const SetCode = (code) => {
    setCode(code);
  };

  // update the isSignedIn state variable
  const setSignInStatus = (data) => {
    setIsSignedIn(data);
  };

  //  get the service
  useEffect(() => {
    const getUserData = async () => {
      const localuser = await AsyncStorage.getItem('@user');
      const id = JSON.parse(localuser);
      try {
        const options = {
          method: 'GET',
          url: 'https://api.rutherles.com/api/usuario/' + id.id,
          headers: { 'Content-Type': 'application/json' }
        };

        const response = await axios.request(options);

        setUser(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
    if (news == false) {
      const options = {
        method: 'GET',
        url: 'https://fretemeapi2.vercel.app/api/servicos/',
        headers: { 'Content-Type': 'application/json' },
        params: { status: 'pendente' }
      };
      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          let data = response.data.reverse();
          if (data.length > 0) {
            setNews(true);
            setOrder(data[0]);
          } else {
            setStatus(false);
          }

          if (status == true) {
            sendPushNotification(expoPushToken);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // turn on the service
  function putWork() {
    setWork((prevState) => !prevState);
  }
  // acept the service
  function putAcept() {
    const options = {
      method: 'PUT',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        status: 'aceito',
        motorista_id: id,
        servico_id: order.id,
        perfil_motorista:
          'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo',
        motorista_nome: user.nome,
        motorista_veiculo: user.veiculo,
        motorista_id: id,
        status_pagamento: order.status_pagamento,
        fatura_id: order.fatura_id
      }
    };
    axios
      .request(options)
      .then(function (response) {
        setAcept(true);
        setNews(null);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // start the service
  function putStart() {
    const options = {
      method: 'PUT',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        status: 'pendente',
        motorista_id: id,
        servico_id: order.id,
        perfil_motorista:
          'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo',
        motorista_nome: user.nome,
        motorista_veiculo: user.veiculo,
        motorista_id: id,
        status_pagamento: order.status_pagamento,
        fatura_id: order.fatura_id
      }
    };
    axios
      .request(options)
      .then(function (response) {
        setAcept(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // end the service
  function putEnd() {
    const options = {
      method: 'PUT',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        status: 'finalizado',

        servico_id: order.servico_id
      }
    };
    axios
      .request(options)
      .then(function (response) {
        setStart(false);
        setNews(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <AuthContext.Provider
      value={{
        email,
        code,
        putWork,
        currentScreen,
        id,
        setEmailAndNavigate,
        SetCode,
        setSignInStatus,
        showTab,
        logout,
        SetCode,
        user,
        order,
        status,
        isSignedIn,
        work,
        start,
        acept,
        putAcept,
        putStart,
        putEnd,
        news
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
