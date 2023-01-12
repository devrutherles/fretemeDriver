import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { colors, device, fonts } from './consts';

// icons
import SvgTruck from './icons/Svg.Truck';
import {
  BackgroundSecondary,
  Primary,
  Shaddow,
  TextTitle
} from '../../../components/Colors';
import { Box, Image, VStack, HStack, Text, Button } from 'native-base';

export default function Waiting(props) {
  if (props.start == false) {
    return (
      <Box borderRadius={20} style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.bannerText}>Novos serviços</Text>
          <Text style={styles.bannerMuted}>{props.work}</Text>
        </View>

        <View style={styles.containerInput}>
          <View style={styles.containerSquare}>
            <View style={styles.square} />
          </View>
          <Text style={styles.text}>{props.text}</Text>
          <View style={styles.containerIcon}>
            <Image w={8} h={8} alt="" source={props.source} />
          </View>
        </View>
      </Box>
    );
  } else {
    return (
      <Box borderRadius={20} style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.bannerText}>{props.title}</Text>
          <Text style={styles.bannerMuted}>{props.work}</Text>
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
            <Box justifyContent={'center'}>
              <Text style={styles.title}>R$ {props.price}</Text>
              <Text textAlign={'center'} color={Primary}>
                {props.distance}s KM
              </Text>
            </Box>
          </HStack>

          <Button
            alignSelf={'center'}
            onPress={props.onpress_end}
            w={'55%'}
            h={'33%'}
            borderRadius={10}
            alignItems={'center'}
            borderWidth={2}
            borderColor={Primary}
            backgroundColor={Primary}
            _text={{
              color: BackgroundSecondary,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 14
            }}
          >
            Encerrar Serviço
          </Button>
        </VStack>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: Shaddow,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    top: device.iPhoneNotch ? 144 : 120,
    width: '85%',
    borderRadius: 20,
    backgroundColor: BackgroundSecondary
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
    color: colors.mint,
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
  }
});
