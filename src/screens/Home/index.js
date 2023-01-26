import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import { Acepted, Pending, Waiting } from '../../components/Modal';
import {
  BackgroundSecondary,
  Primary,
  TextTertiary
} from '../../components/Colors';
import { Box, Center, HStack, Image, Text, VStack } from 'native-base';
import {
  Linking,
  Platform,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';

import { AuthContext } from '../../context/auth';
import PropTypes from 'prop-types';
import TouchText from '../../components/TouchText';
import axios from 'axios';
import { gStyle } from '../../components/Consts';
import polyline from 'polyline';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function Home({ navigation }) {
  const {
    showTab,
    user,
    order,
    work,
    putWork,
    acept,
    putAcept,
    putStart,
    putEnd,
    news,
    poly,

    localUser
  } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const { PROVIDER_GOOGLE } = MapView;
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoords] = useState({ lat: null, lon: null });
  const [detail, setDetail] = useState('none');
  const [modalVisible, setModalVisible] = useState(false);
  const origin = encodeURIComponent(order.endereco_origem);
  const destination = encodeURIComponent(order.endereco_destino);
  const [coordenadas, setCoordenadas] = useState([]);
  const route = polyline.decode(coordenadas);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(coordinates.lat);
  const [end, setEnd] = useState(coordinates.lon);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState('');
  const newCoordinates = route.map((coordinate) => ({
    latitude: coordinate[0],
    longitude: coordinate[1]
  }));

  useEffect(() => {
    setStart(newCoordinates[0]?.latitude);
    setEnd(newCoordinates[1]?.longitude);
  }, [newCoordinates]);

  useEffect(() => {
    if (isFocused) {
      showTab('visible');
    }
  }, [user]);

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
  }, [isFocused]);

  useEffect(() => {
    let interval = null;

    if (acept == null) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (acept === false) {
      setTime(
        `${hours.toString().padStart(1, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(1, '0')}` + ' '
      );
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [acept]);

  const seconds = timer % 60;
  const minutes = Math.floor(timer / 60) % 60;
  const hours = Math.floor(timer / 3600) % 24;
  //send notification to the driver

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
//console.log(response);

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
  }
  useEffect(() => {
    if (news == true) {
      sendPushNotification(expoPushToken);
    }
  }, [news]);

  useEffect(() => {
    const getRoute = async () => {
      const apiKey = 'AIzaSyDWSnciSBk2pJJ0oHy7JF-PgmRPENmxWQQ';
      const options = {
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
      };

      try {
        const response = await axios.request(options);

        setDistance(response.data.routes[0].legs[0].distance.text);
        const route = response.data.routes[0].overview_polyline.points;
        const polyline = route;
        setCoordenadas(polyline);
      } catch (error) {
        console.error(error);
      }
    };
    getRoute();
  }, [origin, destination]);

  if (!order.servico && !showMap) {
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
            followsUserLocation={news != null ? false : true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={styles.map}
            region={
              news != false
                ? {
                    latitude: start,
                    longitude: end,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                  }
                : {
                    latitude: coordinates.lat,
                    longitude: coordinates.lon,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                  }
            }
            showsUserLocation={true}
            style={StyleSheet.flatten([
              styles.map,
              { opacity: modalVisible ? 0.1 : 1 }
            ])}
          >
            {poly && (
              <Polyline
                coordinates={newCoordinates}
                strokeColor={Primary}
                strokeWidth={5}
                lineCap="round"
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

        <View style={styles.header}>
          <HStack
            paddingX={2}
            paddingY={Platform.OS === 'ios' ? 2 : 0}
            backgroundColor={BackgroundSecondary}
            alignItems="center"
            justifyContent="space-between"
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
            {acept == null ? (
              <Text paddingX={2} fontWeight={'bold'} color={TextTertiary}>
                {`${hours.toString().padStart(1, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(1, '0')}` +
                  ' '}
                h
              </Text>
            ) : (
              <Text paddingX={2} fontWeight={'bold'} color={TextTertiary}>
                {work == false ? 'Offline' : 'Online'}
              </Text>
            )}
            <Switch
              disabled={news == null ? true : false}
              value={work}
              onValueChange={() => putWork()}
            />
          </HStack>

          <View style={styles.placeholder} />
        </View>

        {work == true || work == null ? (
          <>
            {news == true && (
              <Pending
                opacity={modalVisible ? 0.1 : 1}
                modalVisible={modalVisible}
                avatar={order.foto_user}
                nome={order.userName}
                service={order.servico}
                price={order.frete_valor}
                distance={distance}
                from={order.endereco_origem}
                to={order.endereco_destino}
                onpress_detail={() =>
                  setDetail(detail == 'flex' ? 'none' : 'flex')
                }
                onpress_accept={() => putAcept()}
                detalhes={order.detalhes_servico}
                hora={order.hora}
                ajudante={order.ajudante}
                extra={order.extra}
                detail={detail}
              />
            )}
            {news == false && (
              <Waiting
                text={work ? 'Buscando serviços' : 'Você está offline'}
                work={work ? 'Online' : 'Offline'}
                source={work ? require('../../../assets/img/load.gif') : null}
              />
            )}

            {news == null && (
              <Acepted
                acept={acept}
                onpress_start={() => putStart()}
                onpress_end={() => putEnd(setModalVisible(true))}
                avatar={order.foto_user}
                nome={order.userName}
                service={order.servico}
                price={order.frete_valor}
                distance={distance}
              />
            )}
          </>
        ) : null}

        {modalVisible == true && (
          <VStack
            borderRadius={10}
            top={Platform.OS === 'ios' ? '25%' : '15%'}
            alignSelf={'center'}
            width={'90%'}
            position={'absolute'}
            backgroundColor={'#121212'}
            space={6}
            paddingY={'2.5%'}
            borderBottomWidth={0}
          >
            <Box pb={4} px={4}>
              <Text
                fontSize={25}
                fontWeight={'bold'}
                fontFamily={'heading'}
                color={'#fff'}
              >
                Obrigado pelo serviço!
              </Text>
              <Text color={'#fff'}>
                Relatório do serviço de {order.userName}
              </Text>
            </Box>

            <VStack
              padding={2}
              borderRadius={10}
              alignSelf={'center'}
              width={'90%'}
              backgroundColor={'#fff'}
              space={6}
            >
              <Box>
                <HStack
                  width={'27.7%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <MaterialIcons name="location-on" size={24} color={Primary} />
                  <Text fontWeight={'medium'} color={Primary} fontSize={18}>
                    Origem
                  </Text>
                </HStack>
                <Box paddingX={5}>
                  <Text color={'#c9c9c9'}>{order.endereco_origem} </Text>
                </Box>
              </Box>
              <Box>
                <HStack
                  width={'27.7%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <MaterialCommunityIcons
                    name="map-marker-check-outline"
                    size={24}
                    color="green"
                  />
                  <Text fontWeight={'medium'} color={'green.700'} fontSize={18}>
                    Destino
                  </Text>
                </HStack>
                <Box paddingX={5}>
                  <Text color={'#c9c9c9'}> {order.endereco_destino}</Text>
                </Box>
              </Box>
            </VStack>
            <VStack paddingX={4} space={1}>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Valor: R$ {order.frete_valor}
              </Text>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Serviço: {order.servico}
              </Text>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Distância:
                {distance} KM
              </Text>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Tempo de serviço:
                {' ' + time}h
              </Text>
            </VStack>
            <HStack pb={1} justifyContent={'center'} space={'5%'}>
              <TouchableOpacity
                style={{
                  backgroundColor: Primary,
                  width: '42.5%',
                  height: 35,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                  Fechar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Primary,
                  width: '42.5%',
                  height: 35,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                  Compartilhar
                </Text>
              </TouchableOpacity>
            </HStack>

            <HStack ml={'-1%'} position={'absolute'} bottom={0} space={'4.5%'}>
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#FFF',
                  border: 'none'
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',

                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  borderBottomColor: '#fff',
                  borderBottomWidth: 0
                }}
              />
              <Box
                style={{
                  width: 25,
                  height: 12.5,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: '#fff'
                }}
              />
            </HStack>
          </VStack>
        )}

        {localUser == null && (
          <HStack
            position={'absolute'}
            top={'50%'}
            borderRadius={5}
            paddingX={2}
            alignSelf={'center'}
            backgroundColor={Primary}
            height={'5%'}
          >
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center' }}
              onPress={() => navigation.navigate('Vehicles')}
            >
              <Text fontSize={16} color={'#fff'}>
                Toque aqui para cadastrar um veículo
              </Text>
            </TouchableOpacity>
          </HStack>
        )}
      </View>
    );
  }
}

Home.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};
