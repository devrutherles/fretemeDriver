//imports

import React, { createContext, useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// create the auth context to provide auth-related values and functions to its children components
export const AuthContext = createContext({});
function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [currentScreen, setCurrentScreen] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [id, setId] = useState([]);
  const [user, setUser] = useState([]);
  const [localUser, setLocalUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [distance, setDistance] = useState([]);
  const [service, setService] = useState([]);
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [work, setWork] = useState(true);
  const [start, setStart] = useState(false);
  const [acept, setAcept] = useState(false);
  const [news, setNews] = useState(false);
  const [veicle, setVeicle] = useState(null);
  const [coordenadas, setCoordenadas] = useState([]);
  const [initialPosition, setInitialPosition] = useState([]);
  const [finalPosition, setFinalPosition] = useState([]);
  const [poly, setPoly] = useState(false);

  // check if the user has a veicle
  function putVeicle(data) {
    setVeicle(data);
  }
  // check if the user is logged in by checking the value of the '@isLoggedIn' key in AsyncStorage

  const checkIfLoggedIn = async () => {
    if (isSignedIn) {
      return;
    }
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
      const user = await AsyncStorage.getItem('@user');

      if (isLoggedIn == 'true') {
        setIsSignedIn(true);
      }

      setLocalUser(JSON.parse(user));
      setId(JSON.parse(user).cliente_id);
    } catch (error) {
      setIsSignedIn(false);
    }
  };
  checkIfLoggedIn();
  // remove the '@isLoggedIn' key from AsyncStorage and set isSignedIn to false

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@isLoggedIn');
      await AsyncStorage.removeItem('@user');
      setIsSignedIn(false);
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
      try {
        const options = {
          method: 'GET',
          url: 'https://api.freteme.com/api/login',
          params: { email: localUser.email },
          headers: { 'Content-Type': 'application/json' }
        };

        const response = await axios.request(options);

        setUser(response.data[0]);
        setVeicle(response.data[0].veiculo);
      } catch (error) {
        console.error('error');
      }
    };

    getUserData();

    if (news == false) {
      const options = {
        method: 'GET',
        url: 'https://api.freteme.com/api/servicos/',
        headers: { 'Content-Type': 'application/json' },
        params: { status: 'pendente' }
      };
      axios
        .request(options)
        .then((response) => {
          let data = response.data.reverse();

          if (data.length > 0) {
            setOrder(data[0]);
            setNews(true);

            {
              work && setPoly(true);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (localUser?.veiculo != null) {
      setWork(true);
    } else {
//setWork(false);

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


  function putAcept() {
    const options = {
      method: 'PUT',
      url: 'https://api.freteme.com/api/servicos/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ''
      },
      data: {
        veiculo: veicle,
        motorista_nome: user.nome,
        status: 'aceito',
        motorista_id: id,
        status_pagamento: order.status_pagamento,
        fatura_id: order.fatura_id,
        perfil_motorista:
          'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo',
        servico_id: order.id
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setAcept(true);
        setNews(null);
        setPoly(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // start the service

  function putStart() {
    const options = {
      method: 'PUT',
      url: 'https://api.freteme.com/api/servicos/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ''
      },
      data: {
        veiculo: veicle,
        motorista_nome: user.nome,
        status: 'iniciado',
        motorista_id: id,
        status_pagamento: order.status_pagamento,
        fatura_id: order.fatura_id,
        perfil_motorista:
          'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo',
        servico_id: order.id
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setAcept(null);
        setNews(null);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // end the service

  function putEnd() {
    const options = {
      method: 'PUT',
      url: 'https://api.freteme.com/api/servicos/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ''
      },
      data: {
        veiculo: veicle,
        motorista_nome: user.nome,
        status: 'finalizado',
        motorista_id: id,
        status_pagamento: order.status_pagamento,
        fatura_id: order.fatura_id,
        perfil_motorista:
          'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo',
        servico_id: order.id
      }
    };
    axios
      .request(options)
      .then(function (response) {
        setStart(false);
        setNews(false);
        setAcept(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  // set coordinates of th service

  // get user data
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
        news,
        putVeicle,
        veicle,
        distance,
        service,
        coordenadas,
        initialPosition,
        finalPosition,
        coordenadas,
        localUser,
        poly,
        localUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
