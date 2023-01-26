import { StyleSheet } from 'react-native';
import {
  BackgroundPrimary,
  BackgroundSecondary,
  Border,
  Primary,
  Shaddow,
  TextTertiary,
  TextTitle
} from '../../components/Colors';
export default StyleSheet.create({
  mailButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: '77.77%',
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerMail: {
    backgroundColor: BackgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  containerInfo: {
    backgroundColor: BackgroundSecondary,
    alignItems: 'center',

    flex: 1,
    justifyContent: 'flex-start',
    marginTop: '10%'
  },
  container: {
    backgroundColor: BackgroundSecondary,
    justifyContent: 'flex-start',
    flex: 1
  },
  contentMidea: {
    width: '80%',
    height: '70%'
  },
  midea: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundSecondary
  },
  welcome: {
    width: '90%',
    margin: 20
  },
  welcomeTv: {
    height: 45,
    marginTop: 10
  },
  welcomeTitle: {
    fontSize: 22,
    marginVertical: 5,
    color: TextTitle
  },
  welcomeSubtitle: {
    fontSize: 14,
    marginVertical: 5,
    color: TextTitle
  },
  mailTitle: {
    fontSize: 22,
    color: TextTitle,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 60
  },
  mailSubTitle: {
    marginBottom: '7%',
    fontSize: 14,
    marginVertical: 5,
    color: TextTitle,
    alignSelf: 'center'
  },
  CodeTitle: {
    fontSize: 22,
    color: TextTitle,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 60
  },
  CodeSubTitle: {
    fontSize: 14,
    marginVertical: 5,
    color: TextTitle,
    alignSelf: 'center'
  },
  infoTitle: {
    fontSize: 22,
    color: TextTitle,
    alignSelf: 'center',

    marginBottom: 5,
    marginTop: -20
  },
  infoSubTitle: {
    fontSize: 14,
    marginBottom: '10%',

    color: TextTitle,
    alignSelf: 'center'
  },
  logoMail: { width: 200, height: 150, alignSelf: 'center' },
  social: {
    width: 30,
    height: 36
  },

  codeFieldRoot: { marginTop: 5 },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: Border,
    textAlign: 'center',
    marginHorizontal: '6%'
  },
  focusCell: {
    borderColor: Border
  },

  input: {
    width: '77,77%',
    height: 42,
    backgroundColor: BackgroundSecondary,
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Border,
    alignSelf: 'center'
  },
  registerButton: {
    marginTop: 15,
    backgroundColor: Primary,
    width: '49%',
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoLabel: {
    alignSelf: 'flex-start',
    marginTop: 2
  },
  textInfoView: {},
  userInfo: {
    width: 50,
    height: 50,

    alignSelf: 'center'
  },
  RegV: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: BackgroundSecondary,
    width: '90%',
    height: '90%',
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  infoV: {
    justifyContent: 'center',
    backgroundColor: BackgroundSecondary,
    width: '90%',
    height: '90%',
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  CodeV: {
    justifyContent: 'center',
    backgroundColor: BackgroundSecondary,
    width: '90%',
    height: '80%',
    borderRadius: 20,
    elevation: 3,
    shadowColor: Shaddow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  infoButton: {
    backgroundColor: Primary,
    width: '77.8%',
    height: 42,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '25%'
  },
  input: {
    width: '77.77%',
    height: 42,
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#404040'
  },
  selectv: {
    marginTop: 20,
    height: 42,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  loginText: {
    color: BackgroundSecondary,
    fontSize: 16
  },
  registerText: {
    color: BackgroundSecondary,
    fontSize: 16
  },
  mailText: {
    color: BackgroundSecondary,
    fontSize: 16
  },
  infoText: {
    color: BackgroundSecondary,
    fontSize: 16
  },
  divisor: {
    marginTop: '10%',
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divisorLine: {
    width: '42%',
    height: 2,
    backgroundColor: Border
  },

  forgotText: {
    fontSize: 12,
    color: Primary,
    fontWeight: '300'
  },
  helpContainer: {
    flexDirection: 'row',
    marginTop: '15%',
    justifyContent: 'center'
  },
  helpText: {
    color: TextTertiary,
    paddingRight: 5
  },
  helpButton: {
    color: Primary,
    fontWeight: 'bold'
  }
});
