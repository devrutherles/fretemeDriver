import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, device, fonts } from './Consts';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, HStack, Input, VStack, Image, Divider, Box } from 'native-base';
import { Feather } from '@expo/vector-icons';
import {
  BackgroundSecondary,
  Primary,
  TextTertiary,
  TextTitle,
  Shaddow
} from './Colors';
export function Acepted(props) {
  if (props.acept == true) {
    return (
      <Box borderRadius={20} style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.bannerText}>Pedido aceito</Text>
          <Text style={styles.bannerMuted}>Online</Text>
        </View>
        <Box
          mt={4}
          borderRadius={20}
          shadowColor={'#000'}
          shadowOffset={{
            width: 0,
            height: 1
          }}
          shadowOpacity={0.2}
          shadowRadius={1.41}
          elevation={2}
          bgColor={'#fff'}
        >
          <VStack justifyContent={'center'} space={4}>
            <HStack px={2} justifyContent={'space-around'}>
              <HStack space={2}>
                <Image
                  alt=""
                  backgroundColor={'#fff'}
                  borderWidth={1}
                  borderRadius={20}
                  borderColor={colors.blue}
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
              <Divider
                orientation="vertical"
                height={'50%'}
                alignSelf={'center'}
              />
              <Box alignItems={'flex-start'} justifyContent={'center'}>
                <Text style={styles.title}>{props.price}</Text>
                <Text textAlign={'center'} color={Primary}>
                  {props.distance}
                </Text>
              </Box>
            </HStack>
          </VStack>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Primary,
              backgroundColor: Primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%',
              height: 45,
              alignSelf: 'center',
              margin: 20
            }}
            onPress={props.onpress_start}
          >
            <Text style={styles.touchabletext}>Iniciar</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box borderRadius={20} style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.bannerText}>Serviço em andamento</Text>
          <Text style={styles.bannerMuted}>Online</Text>
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
                  uri: props.avatar
                }}
              />
              <Box justifyContent={'center'}>
                <Text style={styles.title}>{props.nome}</Text>
                <Text color={Primary}>{props.service}</Text>
              </Box>
            </HStack>
            <Divider
              orientation="vertical"
              height={'50%'}
              alignSelf={'center'}
            />
            <Box alignItems={'flex-start'} justifyContent={'center'}>
              <Text style={styles.title}>{props.price}</Text>
              <Text textAlign={'center'} color={Primary}>
                {props.distance}
              </Text>
            </Box>
          </HStack>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Primary,
              backgroundColor: Primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: '45%',
              height: 45,
              alignSelf: 'center'
            }}
            onPress={props.onpress_end}
          >
            <Text style={styles.touchabletext}>Finalizar</Text>
          </TouchableOpacity>
        </VStack>
      </Box>
    );
  }
}
const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Primary,
    backgroundColor: Primary,
    justifyContent: 'center',
    alignItems: 'center',

    height: 45
  },
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: Shaddow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    top: device.iPhoneNotch ? 144 : 120,
    width: '90%',
    borderRadius: 20,
    backgroundColor: BackgroundSecondary,
    justifyContent: 'center'
  },
  containerBanner: {
    backgroundColor: Primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  bannerMuted: {
    color: '#fff',
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  containerSquare: {
    alignItems: 'center',
    flex: 2
  },
  square: {
    backgroundColor: Primary,
    height: 8,
    width: 8,
    borderRadius: 10
  },
  text: {
    color: colors.greyAbbey,
    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 20
  },
  title: {
    color: TextTitle,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 2
  },
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
  containerPending: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'absolute',
    padding: 20,
    bottom: Platform.OS === 'ios' ? '10%' : '10%',
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

  bannerMuted: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 14,

    borderRadius: 10,
    backgroundColor: Primary,
    borderColor: Primary,
    borderWidth: 2
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
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
    fontSize: 19,
    paddingLeft: 10
  },
  detalhes: {
    color: TextTertiary,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15
  },
  detalhesB: {
    color: TextTertiary,
    fontFamily: fonts.uberMedium,
    fontSize: 16,

    paddingHorizontal: 15
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    borderRadius: 1,
    flex: 2,
    marginBottom: 1
  },
  touchabletext: {
    color: BackgroundSecondary,
    fontWeight: 'bold'
  },
  title: {
    color: TextTitle,
    fontFamily: fonts.uberMedium,
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 1
  }
});
export function Waiting(props) {
  return (
    <Box borderRadius={20} style={styles.container}>
      <View style={styles.containerBanner}>
        <Text style={styles.bannerText}>Novos serviços</Text>
        <Text style={styles.bannerMuted}>{props.work}</Text>
      </View>

      <View style={styles.containerInput}>
        <Text style={styles.text}>Buscando serviços</Text>
        <View style={styles.containerIcon}>
          <Image w={8} h={8} alt="" source={props.source} />
        </View>
      </View>
    </Box>
  );
}
export function Pending(props) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.containerPending,
        { opacity: props.opacity }
      ])}
    >
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
        <HStack space={2} justifyContent={'center'}>
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
          <Divider height={'75%'} alignSelf={'center'} orientation="vertical" />
          <Box justifyContent={'center'} alignItems={'flex-start'}>
            <Text style={styles.title}>{props.price}</Text>
            <Text textAlign={'center'} color={Primary}>
              {props.distance}
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
              multiline={true}
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
              multiline={true}
            />
          </Box>
        </HStack>

        <VStack display={props.detail} space={4}>
          <Text style={styles.detalhes}>Detalhes:</Text>
          <Text style={styles.detalhesB}>{props.detalhes}</Text>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Duração:</Text>
            <Text style={styles.detalhesB}>{props.hora} Horas</Text>
          </HStack>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Ajudantes:</Text>
            <Text style={styles.detalhesB}>{props.ajudante}</Text>
          </HStack>
          <Divider />
          <HStack>
            <Text style={styles.detalhes}>Extras:</Text>
            <Text style={styles.detalhesB}>
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
