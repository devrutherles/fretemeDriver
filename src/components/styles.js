import { Platform, StyleSheet } from 'react-native';
import { BackgroundSecondary, Primary } from './Colors';

export default StyleSheet.create({
  all: {
    justifyContent: 'space-around',
    height: '7%',
    backgroundColor: Primary,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',

    position: 'relative',

    marginBottom: Platform.OS === 'ios' ? '7%' : '3%'
  },

  icon: { width: 32, height: 30 },
  iconTab: {
    width: 35,
    height: 35,
    borderBottomColor: BackgroundSecondary,
    borderBottomWidth: 2
  }
});
