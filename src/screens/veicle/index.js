import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Primary, TextTertiary } from '../../components/Colors';
import React, { useContext, useEffect } from 'react';
import { useRef, useState } from 'react';

import { AuthContext } from '../../context/auth';
import { BackgroundSecondary } from '../../components/Colors';

import axios from 'axios';
import styles from './styles';

import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';

export default function Vehicles({ navigation }) {
  const { id, showTab, putVeicle } = useContext(AuthContext);
  const [erro, setErro] = React.useState();
  const [load, setLoad] = useState(false);
const isFocused = useIsFocused();

  const [edit, setEdit] = useState(true);
  const [categoria, setCategoria] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [cor, setCor] = useState('');
const { user } = AuthContext();

  const Services = [
    {
      id: 1,
      name: 'Frete',
      source: 'https://i.ibb.co/VDT4HN1/car1.jpg',
      description: 'Adicional de ajudantes e horas',
      objective: 'Feito para encomendas já embaladas'
    },
    {
      id: 2,
      name: 'Mudança',
      source: 'https://i.ibb.co/r3x5PzH/car1.jpg',
      description: 'Adicional de ajudantes e horas',
      objective: 'Para serviços com maior tempo '
    },
    {
      id: 3,
      name: 'Moto Frete',
      source: 'https://i.ibb.co/fFHwtcQ/moto.jpg',
      description: 'Rápido e prático',
      objective: 'Feito para encomendas pequenas'
    }
  ];
  const veiculo = {
    categoria: categoria,
    marca: marca,
    modelo: modelo,
    ano: ano,
    placa: placa,
    cor: cor
  };
  JSON.stringify(veiculo);
  function Register() {
setLoad(true);


    const options = {
      method: 'PUT',
      url: 'https://api.freteme.com/api/usuario',
      headers: { 'Content-Type': 'application/json' },
      data: { cliente_id: id, veiculo: JSON.stringify(veiculo) }
    };

    axios
      .request(options)
      .then(function (response) {
console.error(response.data);

        putVeicle(true);
        alert('Veículo cadastrado com sucesso!');
        setLoad(false);
        setEdit(true);

      })
      .catch(function (error) {
        setLoad(false);
        console.error(error);
      });
  }
  useEffect(() => {
    showTab('none');
  }, [isFocused]);

  if (user === 9) {
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
              <HStack
                px={2}
                w={'100%'}
                alignSelf={'center'}
                alignItems={'flex-start'}
              >
                <Box w={'100%'}>
                  <Text
                    pb={2}
                    style={{
                      textAlign: 'left',
                      paddingHorizontal: '10%',
                      color: TextTertiary,
                      fontSize: 12
                    }}
                  >
                    Categoria
                  </Text>
                  <FlatList
                    data={Services}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            item.name != categoria ? '#fff' : Primary,
                          marginBottom: 10,

                          borderRadius: 10,
                          padding: 5,
                          width: '90%',
                          alignSelf: 'center',
                          shadowColor: '#c9c9c9',
                          shadowOffset: {
                            width: 0,
                            height: 2
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                          height: 70
                        }}
                        onPress={() => {
                          setCategoria(item.name);
                        }}
                      >
                        <HStack>
                          <Box
                            backgroundColor={'#fff'}
                            borderWidth={1}
                            borderRadius={6}
                            borderColor={
                              item.name != categoria ? '#c9c9c9' : '#FFF'
                            }
                            width={'45px'}
                            height={'60px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Image
                              alt=""
                              backgroundColor={'#fff'}
                              w={'40px'}
                              h={'40px'}
                              resizeMode="contain"
                              source={{
                                uri: item.source
                              }}
                            />
                          </Box>

                          <VStack px={2}>
                            <HStack>
                              <Box w={'65%'}>
                                <Text
                                  color={
                                    item.name != categoria ? '#404040' : '#FFF'
                                  }
                                  fontWeight={'medium'}
                                >
                                  {item.name}
                                </Text>
                              </Box>
                            </HStack>
                            <VStack>
                              <Text
                                color={
                                  item.name != categoria ? '#404040' : '#FFF'
                                }
                              >
                                {item.description}
                              </Text>
                              <Text
                                color={
                                  item.name != categoria ? '#C9C9C9' : '#FFF'
                                }
                              >
                                {item.objective}
                              </Text>
                            </VStack>
                          </VStack>
                        </HStack>
                      </TouchableOpacity>
                    )}
                  />
                </Box>
              </HStack>
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
                  isDisabled={edit}
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

              {load == 9  ? (
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
