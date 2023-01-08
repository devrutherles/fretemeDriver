import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts } from '../constants';

import Constants from 'expo-constants';

const CustomDrawerContent = () => (
  <View style={styles.container}>
    <View style={styles.containerVersion}>
      <Text style={styles.versionText}>teste</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerVersion: {
    bottom: device.iPhoneNotch ? 40 : 16,
    paddingHorizontal: 38,
    position: 'absolute',
    width: '100%'
  },
  versionText: {
    color: colors.grey,
    fontFamily: fonts.uberRegular,
    fontSize: 20,
    textAlign: 'right'
  }
});

export default CustomDrawerContent;
