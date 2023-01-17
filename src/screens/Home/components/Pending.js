import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Text,
  Button,
  HStack,
  Input,
  VStack,
  Image,
  Divider
} from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { colors, device, fonts } from './consts';
import { useNavigation } from '@react-navigation/native';
import {
  BackgroundSecondary,
  Primary,
  TextTertiary,
  TextTitle
} from '../../../components/Colors';

export default function Pending(props, detail) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
              resizeMode={'contain'}
              size="sm"
              source={{
                uri: props.avatar
              }}
            />
            <Box justifyContent={'center'}>
              <Text style={styles.title}>{props.nome}</Text>
              <Text color={Primary}>{props.service}</Text>
            </Box>
          </HStack>
          <Box justifyContent={'center'}>
            <Text style={styles.title}>R${props.price}</Text>
            <Text textAlign={'center'} color={Primary}>
              {props.distance} KM
            </Text>
          </Box>
        </HStack>

        <HStack
          px={2}
          w={'100%'}
          alignSelf={'center'}
          alignItems={'flex-start'}
        >
          <MaterialIcons
            style={{ paddingTop: 15 }}
            name="location-on"
            size={24}
            color={colors.blue}
          />
          <Box w={'100%'}>
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 10,
                color: TextTertiary,
                fontSize: 12
              }}
            >
              Origem
            </Text>
            <Input
              isDisabled={true}
              fontSize={16}
              paddingLeft={'10px'}
              variant={'underlined'}
              w={'77.7%'}
              value={props.from}
            />
          </Box>
        </HStack>

        <HStack
          px={2}
          w={'100%'}
          alignSelf={'center'}
          alignItems={'flex-start'}
        >
          <Feather
            style={{ paddingTop: 15 }}
            name="arrow-down"
            size={24}
            color={colors.blue}
          />
          <Box w={'100%'}>
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 10,
                color: TextTertiary,
                fontSize: 12
              }}
            >
              Destino
            </Text>
            <Input
              isDisabled={true}
              fontSize={16}
              paddingLeft={'10px'}
              variant={'underlined'}
              w={'77.7%'}
              value={props.to}
            />
          </Box>
        </HStack>

        <VStack display={props.detail} space={4}>
          <Text style={styles.detalhes}>Detalhes:</Text>
          <Text style={styles.detalhes}>{props.detalhes}</Text>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Duração:</Text>
            <Text style={styles.detalhes}>{props.hora} Horas</Text>
          </HStack>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Ajudantes:</Text>
            <Text style={styles.detalhes}>{props.ajudante}</Text>
          </HStack>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Extras:</Text>
            <Text style={styles.detalhes}>
              {props.extra ? props.extra : 'Não solicitado'}
            </Text>
          </HStack>
        </VStack>

        <HStack py={2} justifyContent={'center'} alignItems="center" space={4}>
          <TouchableOpacity
            onPress={props.onpress_detail}
            style={styles.touchable}
          >
            <Text style={styles.touchabletext}>
              {props.detail == 'flex' ? 'Ocultar' : 'Detalhes'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onpress_accept}
            style={styles.touchable}
          >
            <Text style={styles.touchabletext}> Aceitar Serviço</Text>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </View>
  );
}
const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Primary,
    backgroundColor: Primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 45
  },
  touchabletext: {
    color: BackgroundSecondary,
    fontWeight: 'bold'
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'absolute',
    padding: 20,
    bottom: '10%',
    left: 0,
    right: 0,
    borderRadius: 10
  },
  containerCard: {
    backgroundColor: colors.green,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  bannerMuted: {
    color: colors.greyAbbey,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    width: '45%',
    borderRadius: 10,
    backgroundColor: Primary,
    borderColor: Primary,
    borderWidth: 2
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48
  },
  containerSquare: {
    alignItems: 'center',
    flex: 1
  },
  square: {
    backgroundColor: colors.black,
    height: 8,
    width: 8
  },
  text: {
    color: colors.greyAbbey,
    flex: 2,
    fontFamily: fonts.uberMedium,
    fontSize: 19
  },

  title: {
    color: TextTitle,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold'
  },
  detalhes: {
    color: TextTertiary,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    borderRadius: 1,
    flex: 2,
    marginBottom: 1
  }
});
