import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Box, Divider, HStack, Stack, Text } from 'native-base';
import { BackgroundSecondary, Error, Primary } from '../../components/Colors';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../context/auth';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

export default function Settings({ navigation }) {
const { showTab, logout, id, localUser, user } = useContext(AuthContext);


  useEffect(() => {
    if (isFocused) {
      showTab('visible');
    }
  });
  console.warn(localUser);

const name = user.nome;


  const isFocused = useIsFocused();
  return (
    <SafeAreaView style={styles.Container}>
      <Box style={styles.card} backgroundColor={BackgroundSecondary}>
        <Avatar
          mt={4}
          alignSelf={'center'}
          borderWidth={3}
          borderColor={Primary}
          size="lg"
          source={{
            uri: 'https://yt3.ggpht.com/eULZKQKOu5C6OTPyEdw_vTEsJ2zgnoZSMSwVRuDvk2Hm8qmsovMA7KLcHwwBDcDlME-UfyKb=s88-c-k-c0x00ffffff-no-rj-mo'
          }}
        />
        <Box style={styles.avatar}>
          <Text style={styles.name}>&nbsp; {name}&nbsp;</Text>
        </Box>

        <HStack style={styles.header}>
          <Text style={styles.subTitle}>{localUser.telefone}</Text>
          <Text style={styles.subTitle}>{localUser.email}</Text>
        </HStack>
        <Divider width={'90%'} alignSelf={'center'} />
        <Text style={styles.share}>
          Compartilhe com amigos e ganhe pontos &nbsp;
          <FontAwesome name="share" size={15} color={Primary} />
        </Text>
      </Box>

      <Stack mt={8}>
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          width={'50%'}
          height={41}
        >
          <Text style={styles.title}>Gerenciar perfil</Text>
        </Box>

        <TouchableOpacity
          style={styles.options}
          onPress={() => navigation.navigate('ProfileInfo')}
        >
          <Box flexDirection={'row'}>
            <AntDesign
              style={styles.content}
              name="user"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Informações pessoais</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => navigation.navigate('Wallet')}
          style={styles.options}
        >
          <Box flexDirection={'row'}>
            <AntDesign
              style={styles.content}
              name="wallet"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Carteira</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <Divider />
        <TouchableOpacity
          onPress={() => navigation.navigate('Vehicles')}
          style={styles.options}
        >
          <Box flexDirection={'row'}>
            <MaterialIcons
              style={styles.content}
              name="groups"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Veículos</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <Divider />
        <TouchableOpacity style={styles.options}>
          <Box flexDirection={'row'}>
            <MaterialIcons
              style={styles.content}
              name="help-outline"
              size={20}
              color="black"
            />
            <Text style={styles.text}>Ajuda</Text>
          </Box>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style={styles.options} onPress={() => logout()}>
          <Box flexDirection={'row'}>
            <MaterialIcons
              style={styles.content}
              name="logout"
              size={20}
              color={Error}
            />
            <Text style={styles.textLogout}>Sair</Text>
          </Box>
        </TouchableOpacity>
      </Stack>
    </SafeAreaView>
  );
}
