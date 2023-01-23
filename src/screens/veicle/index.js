import React, { useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { Text, Box, Button, ScrollView, Input, Image } from 'native-base';
import styles from './styles';
import { useState, useRef } from 'react';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { BackgroundSecondary } from '../../components/Colors';

export default function Vehicles({ navigation }) {
  const { id, showTab, putVeicle } = useContext(AuthContext);
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
  const isFocused = useIsFocused();
  const [user, setUser] = useState('');
  const [edit, setEdit] = useState(true);
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');

  function Register() {
    setLoad(true);
    putVeicle(true);
    alert('Veículo cadastrado com sucesso!');
    setLoad(false);
  }
  useEffect(() => {
    showTab('visible');
  }, [isFocused]);

  if (user === null) {
    return (
      <Box
        flex={1}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={BackgroundSecondary}
      >
        <Image alt="" source={require('../../../assets/img/load.gif')} />
      </Box>
    );
  } else {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({
          ios: 'padding',
          android: null
        })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false} width="100%">
            <View style={styles.containerInfo}>
              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Categoria do veículo </Text>

                <Input
                  variant="underlined"
                  isDisabled={true}
                  value={categoria}
                  onChangeText={setCategoria}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Escolha a categoria do seu veículo"
                  keyboardType="email-address"
                />
              </Box>
              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Marca</Text>

                <Input
                  isDisabled={edit}
                  value={marca}
                  onChangeText={setMarca}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="Marca do seu veículo"
                  keyboardType="text"
                  variant="underlined"
                />
              </Box>
              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Modelo</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={modelo}
                  onChangeText={setModelo}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="O modelo do seu veículo"
                />
              </Box>
              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Ano</Text>

                <Input
                  isDisabled={true}
                  variant="underlined"
                  value={ano}
                  onChangeText={setAno}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="O ano do seu veículo (Igual ao do documento)"
                  keyboardType="numeric"
                />
              </Box>

              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Placa</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={placa}
                  onChangeText={setPlaca}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="A placa do seu veículo"
                  keyboardType="numeric"
                />
              </Box>
              <Box py={2} alignSelf={'center'}>
                <Text style={styles.infoLabel}>Cor</Text>

                <Input
                  isDisabled={edit}
                  variant="underlined"
                  value={cor}
                  onChangeText={setCor}
                  width="77.7%"
                  autoCapitalize="nome"
                  autoComplete="off"
                  placeholder="A cor do seu veículo (Igual ao do documento)"
                />
              </Box>

              {load ? (
                <Button
                  style={styles.infoButton}
                  isLoading
                  isLoadingText="Salvando..."
                ></Button>
              ) : (
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => {
                    edit ? setEdit(false) : Register();
                  }}
                >
                  <Text style={styles.infoText}>
                    {edit ? 'Editar' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
