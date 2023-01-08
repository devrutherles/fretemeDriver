import * as React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Button, HStack, VStack } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts } from '../constants';

// icons
import SvgTruck from './icons/Svg.Truck';
import TouchIcon from './TouchIcon';
import { useNavigation } from '@react-navigation/native';

const WhereTo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <VStack bgColor={'#fff'} space={2} borderBottomRadius={7} justifyContent={'space-between'}>
        <HStack
          space={2}
          padding={2}
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <Avatar
            backgroundColor={'#fff'}
            borderWidth={3}
            padding={0.5}
            borderColor={colors.blue}
            size="lg"
            source={{
              uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=696'
            }}
          />

          <Text style={styles.title}>Brendo Rutherles</Text>
          <AntDesign name="star" size={19} color={colors.blue} />
          <Text style={styles.text}>4</Text>
        </HStack>

        <HStack space={2} alignItems="center">
          <MaterialIcons name="location-on" size={24} color={colors.blue} />
          <Text style={styles.text}>Rua 1, 123</Text>
        </HStack>
        <HStack space={2} alignItems="center">
          <Feather name="arrow-down" size={24} color={colors.blue} />
          <Text style={styles.text}>Rua 2, 456</Text>
        </HStack>

        <VStack padding={5} alignItems="center" space={2}>
          <Button bgColor={colors.blue} w={"100%"}>Vizualizar Serviço</Button>
          <Text style={styles.bannerMuted}>Recusar Serviço</Text>

        </VStack>
      </VStack>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'absolute',
    padding: 20,
    bottom: 1,
    left: 0,
    right: 0,
    borderRadius: 4,
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
    fontSize: 14
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
    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 19
  },

  title: {
    color: colors.greyAbbey,

    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 20,
    fontWeight: 'bold'
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

export default WhereTo;
