import { StyleSheet } from 'react-native';
import { colors, device, gStyle } from './components/consts';
export default StyleSheet.create({
  map: {
    flex: 1,
    height: device.height,
    position: 'absolute',
    width: device.width,

    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#d6e2e6'
      }
    ],

    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#cfd4d5'
      }
    ],

    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7492a8'
      }
    ],

    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: 25
      }
    ],

    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3'
      }
    ],

    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#cfd4d5'
      }
    ],

    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3'
      }
    ],

    featureType: 'landscape.natural',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7492a8'
      }
    ],

    featureType: 'landscape.natural.terrain',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ],

    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dde2e3'
      }
    ],

    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#588ca4'
      }
    ],

    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -100
      }
    ],

    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a9de83'
      }
    ],

    featureType: 'poi.park',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#bae6a1'
      }
    ],

    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c6e8b3'
      }
    ],

    featureType: 'poi.sports_complex',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#bae6a1'
      }
    ],

    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#41626b'
      }
    ],

    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -45
      },
      {
        lightness: 10
      },
      {
        visibility: 'on'
      }
    ],

    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c1d1d6'
      }
    ],

    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#a6b5bb'
      }
    ],

    featureType: 'road.highway',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on'
      }
    ],

    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#9fb6bd'
      }
    ],

    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff'
      }
    ],

    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff'
      }
    ],

    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [
      {
        saturation: -70
      }
    ],

    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b4cbd4'
      }
    ],

    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#588ca4'
      }
    ],

    featureType: 'transit.station',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ],

    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#008cb5'
      },
      {
        visibility: 'on'
      }
    ],

    featureType: 'transit.station.airport',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: -5
      }
    ],

    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a6cbe3'
      }
    ]
  },
  containerNoLocation: {
    alignItems: 'center',
    height: device.height,
    justifyContent: 'center',
    position: 'absolute',
    width: device.width
  },
  textLocationNeeded: {
    fontFamily: 'roboto',
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
    fontFamily: 'roboto',
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
