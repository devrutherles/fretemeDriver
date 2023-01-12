import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {
  Switch,
  Linking,
  View,
  Platform,
  ActivityIndicator
} from 'react-native';
import { gStyle } from './components/consts';
import { Center, HStack, Text, Image } from 'native-base';
import MapView, { Polyline } from 'react-native-maps';
import PropTypes from 'prop-types';
import SvgCheckShield from './components/icons/Svg.CheckShield';
import SvgQRCode from './components/icons/Svg.QRCode';
import TouchIcon from './components/TouchIcon';
import TouchText from './components/TouchText';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BackgroundSecondary,
  TextTertiary,
  Primary
} from '../../components/Colors';
import Waiting from './components/Waiting';
import styles from './styles';
import axios from 'axios';
import Pending from './components/Pending';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function Home(navigation) {
  const [user, setUser] = useState([]);
  const { showTab, id } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const on = require('../../../assets/images/search.gif');
  const [order, setOrder] = useState([]);
  const [init, setInit] = useState([]);
  const [end, setEnd] = useState([]);

  const [route, setRoute] = useState([]);
  const [status, setStatus] = useState(null);
  const [work, setWork] = useState(true);
  const [service, setService] = useState(null);
  const [distance, setDistance] = useState(null);
  const { PROVIDER_GOOGLE } = MapView;
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });
  const [detail, setDetail] = useState(false);
  const [start, setStart] = useState(false);
  const coordenadas = [init, end];
  useEffect(() => {
    if (isFocused) {
      showTab('visible');
    }
  }, [user]);
  console.warn(user);
  const display = detail ? 'flex' : 'none';

  function putDriver() {
    const options = {
      method: 'PUT',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        status: 'iniciado',
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
        //  console.warn(response.data);
        setStart(true);
        setStatus(false);
        setInit(route.start.lat + ',' + ' ' + route.start.lng);
        setEnd(route.end.lat + ',' + ' ' + route.end.lng);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
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
        //  console.warn(response.data);
        setStart(false);
        setStatus(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const [currentTime, setCurrentTime] = useState(Date.now());

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
    if (
      (work == true && status == false && start == false) ||
      (work == true && status == null && start == false)
    ) {
      const options = {
        method: 'GET',
        url: 'https://fretemeapi2.vercel.app/api/servicos/',
        headers: { 'Content-Type': 'application/json' },
        params: { status: 'iniciado' }
      };
      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          let data = response.data.reverse();
          if (data.length > 0) {
            setStatus(true);
            setOrder(data[0]);
            setDistance(data[0].servico.split(' ')[2]);
            setService(data[0].servico.split(' ')[0]);
            setRoute(JSON.parse(data[0].rota));
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
  console.error(coordenadas);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  function Disponibility() {
    setWork((prevState) => !prevState);
  }
  useEffect(() => {
    const getLocation = async () => {
      // get exisiting locaton permissions first
      const { status: existingStatus } =
        await Location.requestForegroundPermissionsAsync();
      let finalStatus = existingStatus;
      // ask again to grant locaton permissions (if not already allowed)
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }
      // still not allowed to use location?
      if (finalStatus !== 'granted') {
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync();
      setCoords({ lat: coords.latitude, lon: coords.longitude });
      setShowMap(true);
    };
    getLocation().catch(console.error);
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,

      sound: 'default',
      title: 'Novo serviço',
      body: 'Um novo serviço está disponível, clique e confira!',
      data: {
        someData: 'goes here'
      }
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }

    return token;
  }

  if (status == null && !showMap) {
    return (
      <Center flex={1} backgroundColor={BackgroundSecondary}>
        <Image alt="" source={require('../../../assets/img/load.gif')} />
      </Center>
    );
  } else {
    return (
      <View style={gStyle.container}>
        {showMap && (
          <MapView
            followsUserLocation={false}
            provider={PROVIDER_GOOGLE}
            customMapStyle={styles.map}
            region={{
              latitude: coordinates.lat,
              longitude: coordinates.lon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            showsUserLocation
            style={styles.map}
          >
            {start && (
              <Polyline
                coordinates={coordenadas}
                strokeWidth={5}
                strokeColor="#000"
              />
            )}
          </MapView>
        )}
        {!showMap && (
          <View style={styles.containerNoLocation}>
            <Text style={styles.textLocationNeeded}>
              Precisamos dos dados de sua localização...
            </Text>
            <TouchText
              onPress={() => Linking.openURL('app-settings:')}
              style={styles.btnGoTo}
              styleText={styles.btnGoToText}
              text="Vá até as configurações"
            />
          </View>
        )}

        <View style={styles.rightContainer}>
          <View style={styles.icons}>
            <TouchIcon
              icon={<SvgQRCode />}
              iconSize={20}
              onPress={() => navigation.navigate('Basic')}
              style={[styles.icon, styles.iconQRCode]}
            />
            <TouchIcon
              icon={<SvgCheckShield />}
              iconSize={20}
              onPress={() => navigation.navigate('ModalTutorialBike')}
              style={[styles.icon, styles.iconShield]}
            />
          </View>
        </View>

        <View style={styles.header}>
          <HStack
            paddingX={2}
            paddingY={Platform.OS === 'ios' ? 2 : 0}
            backgroundColor={BackgroundSecondary}
            alignItems="center"
            justifyContent="space-between"
            width={'35%'}
            borderRadius={15}
            shadowColor={'#000'}
            shadowOffset={{
              width: 0,
              height: 1
            }}
            shadowOpacity={0.2}
            shadowRadius={1.41}
            elevation={2}
          >
            <Text fontWeight={'bold'} color={TextTertiary}>
              Online
            </Text>
            <Switch value={work} onValueChange={Disponibility} />
          </HStack>

          <View style={styles.placeholder} />

          <TouchText
            onPress={() => navigation.navigate('ModalHelp')}
            style={styles.help}
            text="Help"
          />
        </View>

        {status === true ? (
          <Pending
            avatar={order.foto_user}
            nome={order.userName}
            service={service}
            price={order.frete_valor}
            distance={distance}
            from={order.endereco_origem}
            to={order.endereco_destino}
            onpress_detail={() => setDetail(detail ? false : true)}
            onpress_accept={putDriver}
            detalhes={order.detalhes_servico}
            hora={order.hora}
            ajudante={order.ajudante}
            extra={order.extra}
            detail={display ? true : false}
          />
        ) : (
          <Waiting
            avatar={order.foto_user}
            title="Serviço em andamento"
            text={work ? 'Buscando serviços' : 'Você está offline'}
            work={work ? 'Online' : 'Offline'}
            source={on}
            start={start}
            nome={order.userName}
            service={service}
            price={order.frete_valor}
            distance={distance}
            onpress_end={putEnd}
          />
        )}
      </View>
    );
  }
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};
