import {
  Box,
  Text,
  Avatar,
  HStack,
  Stack,
  Divider,
  FlatList,
  Image,
  Center,
  VStack,
  Modal
} from 'native-base';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Primary,
  TextTertiary
} from '../../components/Colors';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import { colors, device, fonts } from '../../components/Consts';
import axios from 'axios';
import moment from 'moment/min/moment-with-locales';
import { Platform } from 'react-native';
moment.locale('pt-br');
export default function Profile({ navigation }) {
  const { showTab, id } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState(null);
  const [dateservice, setDateservice] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState([]);
  const [value, setValue] = useState(0);
  const [service, setService] = useState([]);
  const [userName, setUserName] = useState([]);
  const [distance, setDistance] = useState([]);

  function Show(item) {
    setModalVisible(true);
    console.error(item);
    setUserName(item.userName);
    setDate(moment(item.data).format('LLL'));
    setValue(item.frete_valor);
    setService(item.servico);
    setDateservice(item.data_servico);
    setOrigin(item.endereco_origem);
    setDestination(item.endereco_destino);
    setDistance(item.distancia);
  }

  useEffect(() => {
    showTab('visible');

    // get user data from API

    const options = {
      method: 'GET',
      url: 'https://api.freteme.com/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      params: { status: 'finalizado' }
    };
    axios
      .request(options)
      .then((response) => {
        //  console.error(response.data);
        let data = response.data.reverse();
        setOrder(data);
      })
      .catch((error) => {});
  }, []);

  if (order === null) {
    return (
      <Center flex={1} backgroundColor={BackgroundSecondary}>
        <Image alt="" source={require('../../../assets/img/load.gif')} />
      </Center>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          pt={Platform.OS === 'ios' ? 0 : 5}
          fontSize={25}
          alignSelf={'center'}
          fontWeight={'bold'}
          fontFamily={'heading'}
        >
          Histórico de serviços
        </Text>
        <FlatList
          backgroundColor={BackgroundSecondary}
          opacity={modalVisible ? 0.1 : 1}
          pt={2}
          style={styles.filter}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={order}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Show(item)}>
              <Box
                marginY={3}
                padding={2}
                borderRadius={10}
                alignSelf={'center'}
                width={'95%'}
                shadowColor={'#121212'}
                shadowOffset={{
                  width: 0,
                  height: 1
                }}
                shadowOpacity={0.11}
                shadowRadius={1.41}
                elevation={2}
                backgroundColor={BackgroundSecondary}
              >
                <Box
                  alignSelf={'flex-end'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  backgroundColor={'#121212'}
                  borderRadius={10}
                  paddingX={2}
                  height={'35px'}
                >
                  <Text color={'#fff'}>
                    {moment(item.data).format('LLL')} h
                  </Text>
                </Box>
                <VStack space={6}>
                  <Box>
                    <HStack
                      width={'27.7%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <MaterialIcons
                        name="location-on"
                        size={24}
                        color={colors.blue}
                      />
                      <Text fontWeight={'medium'} color={Primary} fontSize={18}>
                        Origem
                      </Text>
                    </HStack>
                    <Box paddingX={10}>
                      <Text color={'#c9c9c9'}>{item.endereco_origem} </Text>
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
                      <Text
                        fontWeight={'medium'}
                        color={'green.700'}
                        fontSize={18}
                      >
                        Destino
                      </Text>
                    </HStack>
                    <Box paddingX={10}>
                      <Text color={'#c9c9c9'}> {item.endereco_destino}</Text>
                    </Box>
                  </Box>
                </VStack>
              </Box>
            </TouchableOpacity>
          )}
        />
        {modalVisible && (
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
              <Text color={'#fff'}>Relatório do serviço de {userName}</Text>
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
                  <MaterialIcons
                    name="location-on"
                    size={24}
                    color={colors.blue}
                  />
                  <Text fontWeight={'medium'} color={Primary} fontSize={18}>
                    Origem
                  </Text>
                </HStack>
                <Box paddingX={5}>
                  <Text color={'#c9c9c9'}>{origin} </Text>
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
                  <Text color={'#c9c9c9'}> {destination}</Text>
                </Box>
              </Box>
            </VStack>
            <VStack paddingX={4} space={1}>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Valor: R$ {value}
              </Text>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Serviço: {service}
              </Text>
              <Text color={'#fff'} fontSize={16} fontWeight={'medium'}>
                Distância: {distance} Km
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
      </SafeAreaView>
    );
  }
}
