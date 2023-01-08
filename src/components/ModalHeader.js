import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, device, fonts, gStyle } from '../constants';

import PropTypes from 'prop-types';
// icons
import SvgClose from './icons/Svg.Close';
import { useNavigation } from '@react-navigation/native';

const ModalHeader = ({ style, text }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        onPress={() => navigation.goBack(null)}
        style={styles.containerIconRight}
      >
        <SvgClose />
      </TouchableOpacity>
      {text && <Text style={styles.header}>{text}</Text>}
    </View>
  );
};

ModalHeader.defaultProps = {
  style: {},
  text: null
};

ModalHeader.propTypes = {
  // optional
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingHorizontal: 24,
    paddingTop: device.iPhoneNotch ? 48 : 24
  },
  containerIconRight: {
    width: 20
  },
  header: {
    color: colors.white,
    fontFamily: fonts.uberMedium,
    fontSize: 28,
    paddingVertical: 16
  }
});

export default ModalHeader;
