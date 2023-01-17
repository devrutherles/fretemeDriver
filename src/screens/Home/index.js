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
import Acepted from './components/Acepted';
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
  const {
    showTab,
    id,
    user,
    order,
    status,
    start,
    work,
    putWork,
    acept,
    putAcept,
    putStart,
    putEnd,
    news
  } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const on = require('../../../assets/images/search.gif');

  const [init, setInit] = useState([]);
  const [end, setEnd] = useState([]);

  const [route, setRoute] = useState([]);

  const [service, setService] = useState(null);
  const [distance, setDistance] = useState(null);
  const { PROVIDER_GOOGLE } = MapView;
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });
  const [detail, setDetail] = useState(false);

  const coordenadas = [init, end];
  useEffect(() => {
    if (isFocused) {
      showTab('visible');
    }
  }, [user]);
  console.warn(user);
  const display = detail ? 'flex' : 'none';

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
  console.error(acept);

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
            <Switch value={work} onValueChange={() => putWork()} />
          </HStack>

          <View style={styles.placeholder} />

          <TouchText
            onPress={() => navigation.navigate('ModalHelp')}
            style={styles.help}
            text="Help"
          />
        </View>
        {work ? (
          <>
            {news == true && (
              <Pending
                avatar={order.foto_user}
                nome={order.userName}
                service={service}
                price={order.frete_valor}
                distance={distance}
                from={order.endereco_origem}
                to={order.endereco_destino}
                onpress_detail={() => setDetail(detail ? false : true)}
                onpress_accept={() => putAcept()}
                detalhes={order.detalhes_servico}
                hora={order.hora}
                ajudante={order.ajudante}
                extra={order.extra}
                detail={display ? true : false}
              />
            )}
            {news == false && (
              <Waiting
                text={work ? 'Buscando serviços' : 'Você está offline'}
                work={work ? 'Online' : 'Offline'}
              />
            )}

            {news == null && (
              <Acepted
                acept={acept}
                onpress_start={() => putStart()}
                onpress_end={() => putEnd()}
              />
            )}
          </>
        ) : null}
      </View>
    );
  }
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};
