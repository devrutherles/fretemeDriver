import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BackgroundSecondary,
  Primary,
  Shaddow,
  TextTitle
} from '../../components/Colors';
import {
  Box,
  Image,
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Center
} from 'native-base';
import axios from 'axios';

export default function Waiting(props) {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://fretemeapi2.vercel.app/api/servicos/',
      headers: { 'Content-Type': 'application/json' },
      params: { status: 'finalizado' }
    };
    axios
      .request(options)
      .then((response) => {
        console.error(response.data);
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
      <Box>
        <Text
          fontWeight={'bold'}
          font
          fontSize={20}
          alignSelf={'center'}
          mt={10}
        >
          Meus serviços
        </Text>
      </Box>
    );
  }
}

const styles = StyleSheet.create({});
