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
  VStack
} from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { BackgroundSecondary, Primary } from '../../components/Colors';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import { colors, device, fonts } from '../Home/components/consts';
import axios from 'axios';
export default function Profile({ navigation }) {
  const { showTab, id } = useContext(AuthContext);
  const isFocused = useIsFocused();
  const [brougth, setBrought] = useState(null);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    showTab('visible');

    // get user data from API
    const optionsuser = {
      method: 'GET',
      url: 'https://api.rutherles.com/api/usuario/' + id,
      headers: { 'Content-Type': 'application/json' }
    };

    axios
      .request(optionsuser)
      .then(function (response) {
        console.warn(response.data[0]);
        setUser(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });

    const options = {
      method: 'GET',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
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
      .catch((error) => {
        console.error(error);
      });
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
        <Box style={styles.card} backgroundColor={BackgroundSecondary}>
          <Avatar
            mt={2}
            alignSelf={'center'}
            borderWidth={3}
            borderColor={Primary}
            size="lg"
            source={{
              uri: 'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo'
            }}
          />
          <Box style={styles.avatar}>
            <Text style={styles.name}>&nbsp; {user.nome}&nbsp;</Text>
          </Box>

          <HStack style={styles.header}>
            <Text style={styles.subTitle}>{user.telefone}</Text>
            <Text style={styles.subTitle}>{user.email}</Text>
          </HStack>
          <Divider width={'90%'} alignSelf={'center'} />
        </Box>

        <Stack>
          <Text py={2} px={4} style={styles.title}>
            Meus serviços
          </Text>
          {order != [] ? (
            <FlatList
              data={order}
              renderItem={({ item }) => (
                <Box borderRadius={20} style={styles.container1}>
                  <View style={styles.containerBanner}>
                    <Text style={styles.bannerText}>Serviço finalizado</Text>
                    <Text style={styles.bannerMuted}>{item.data}</Text>
                  </View>

                  <VStack
                    bgColor={'#fff'}
                    space={4}
                    borderRadius={20}
                    justifyContent={'space-between'}
                    paddingY={4}
                    shadowColor={'#000'}
                    shadowOffset={{
                      width: 0,
                      height: 1
                    }}
                    shadowOpacity={0.2}
                    shadowRadius={1.41}
                    elevation={2}
                  >
                    <HStack justifyContent={'space-around'}>
                      <HStack space={2}>
                        <Image
                          alt=""
                          backgroundColor={'#fff'}
                          borderWidth={1}
                          borderRadius={20}
                          borderColor={colors.blue}
                          size="sm"
                          source={{
                            uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=696'
                          }}
                        />
                        <Box justifyContent={'center'}>
                          <Text style={styles.title}>{item.userName}</Text>
                          <Text color={Primary}>
                            {item.servico.split(' ')[0]}
                          </Text>
                        </Box>
                      </HStack>
                      <Box justifyContent={'center'}>
                        <Text style={styles.title}>R$ {item.frete_valor}</Text>
                        <Text textAlign={'center'} color={Primary}>
                          {item.servico.split(' ')[3]} KM
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              )}
            />
          ) : (
            <Center justifyContent={'center'} mt={'50%'}>
              <Text style={styles.title}>
                Você ainda não realizou nenhum serviço
              </Text>
            </Center>
          )}
        </Stack>
      </SafeAreaView>
    );
  }
}
