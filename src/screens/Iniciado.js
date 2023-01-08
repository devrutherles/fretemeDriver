import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  View
} from 'native-base';
import { device, fonts, gStyle } from '../../constants';

import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import SvgMenu from '../components/icons/Svg.Menu';
import TouchIcon from '../components/TouchIcon';
import { colors } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Detalhes = () => {
  const navigation = useNavigation();
  return (


<View>

<View style={styles.header}>
        <TouchIcon
          icon={<SvgMenu />}
          iconSize={32}
          onPress={() => navigation.toggleDrawer()}
        />
        

      </View>






    
    <Box mt={75} alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700'
        }}
        _web={{
          shadow: 2,
          borderWidth: 0
        }}
        _light={{
          backgroundColor: 'gray.50'
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <MapView
              region={{
                latitude: -9.395776,

                longitude: -40.5467178,

                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            />
          </AspectRatio>
          <Center
            bg="#4978A7"
            _dark={{
              bg: 'violet.400'
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs'
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            Mudança
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <HStack justifyContent="space-evenly" alignItems="center">
              <Avatar
                source={{
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }}
                size="sm"
              />

              <Heading size="md" ml="-1">
                Brendo Rutherles
              </Heading>
            </HStack>
          </Stack>
          <Text bold fontWeight="400">
            Origem
          </Text>

          <Text fontWeight="300">Bengaluru (also called Bangalore) is the</Text>

          <Text bold fontWeight="400">
            Destino
          </Text>

          <Text fontWeight="300">
            Bengaluru (also called Bangalore) is the center
          </Text>

          <Text bold fontWeight="400">
            Detalhes
          </Text>

          <Text fontWeight="300">
            Bengaluru (also called Bangalore) is the center of India'
          </Text>

          <Text bold fontWeight="400">
            Valor
          </Text>

          <Text fontWeight="300">Bengaluru</Text>

          <HStack justifyContent="space-around" alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200'
              }}
              fontWeight="400"
            >
              6 minutos
            </Text>
            <Button
              onPress={() => navigation.navigate('Iniciados')}
              backgroundColor={colors.green}
            >
              Aceitar
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Box>
    </View>
  );
};

export default Detalhes;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: device.height,
    position: 'absolute',
    width: device.width
  },
  containerNoLocation: {
    alignItems: 'center',
    height: device.height,
    justifyContent: 'center',
    position: 'absolute',
    width: device.width
  },
  textLocationNeeded: {
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    marginBottom: 16
  },
  btnGoTo: {
    backgroundColor: colors.black,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnGoToText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 16
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: device.iPhoneNotch ? 58 : 34
  },
  help: {
    textAlign: 'center',
    width: 32
  },
  placeholder: {
    height: 32,
    width: 32
  },
  rightContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 40
  },
  icon: {
    borderRadius: 18,
    height: 36,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 36
  },
  iconQRCode: {
    backgroundColor: colors.blue,
    marginBottom: 16
  },
  iconShield: {
    backgroundColor: colors.white
  }
});