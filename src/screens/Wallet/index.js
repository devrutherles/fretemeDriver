import {
  Action,
  ActionLabel,
  Actions,
  AddButton,
  AddLabel,
  BalanceContainer,
  Bold,
  Card,
  CardBody,
  CardDetails,
  CardInfo,
  CardTitle,
  EyeButton,
  Header,
  HeaderContainer,
  Img,
  Info,
  PaymentMethods,
  PaymentMethodsTitle,
  Title,
  UseBalance,
  UseBalanceTitle,
  UseTicketButton,
  UseTicketContainer,
  UseTicketLabel,
  Value,
  Wrapper,
} from "./styles";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BackgroundSecondary, Primary } from "../../components/Colors";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth";
import { Switch } from "react-native";
import creditCard from "../../assets/img/credit-card.png"
import { useIsFocused } from "@react-navigation/native";

export default function Wallet() {
  const { ShowTab, informacoes } = useContext(true);




  

  return (
    <Wrapper>
      <Header
        colors={ 1==1 ? ["#6699eb", Primary] : ["#D3D3D3", "#868686"]}
      >
        <HeaderContainer>
          <Title>Saldo Grupou</Title>

          <BalanceContainer>
            <Value>
              R$ <Bold>{1==1 ? "150,00" : "----"}</Bold>
            </Value>

            <EyeButton onPress={handleToggleVisibility}>
              <Feather
                name={1==1 ? "eye" : "eye-off"}
                size={28}
                color={BackgroundSecondary}
              />
            </EyeButton>
          </BalanceContainer>

          <Info>Seu saldo pode ser retirado a qualquer momento!</Info>

          <Actions>
            <Action>
              <MaterialCommunityIcons
                name="cash"
                size={28}
                color={BackgroundSecondary}
              />
              <ActionLabel>Adicionar</ActionLabel>
            </Action>

            <Action>
              <FontAwesome name="bank" size={20} color={BackgroundSecondary} />
              <ActionLabel>Retirar</ActionLabel>
            </Action>
          </Actions>
        </HeaderContainer>
      </Header>

      <UseBalance>
        <UseBalanceTitle>Usar saldo ao pagar</UseBalanceTitle>

        <Switch value={useBalance} onValueChange={handleToggleUseBalance} />
      </UseBalance>

      <PaymentMethods>
        <PaymentMethodsTitle>Forma de Pagamento</PaymentMethodsTitle>

        <Card>
          <CardBody>
            <CardDetails>
              <CardTitle>Cadastre seu cartão de crédito</CardTitle>
              <CardInfo>
                Cadastre um cartão de crédito para poder comprar grupos quando
                não tiver saldo.
              </CardInfo>
            </CardDetails>

            <Img source={creditCard} resizeMode="contain" />
          </CardBody>

          <AddButton>
            <AntDesign name="pluscircleo" size={30} color={Primary} />
            <AddLabel>Adicionar cartão de crédito</AddLabel>
          </AddButton>
        </Card>

        <UseTicketContainer>
          <UseTicketButton>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={20}
              color={Primary}
            />
            <UseTicketLabel>Usar código promocional</UseTicketLabel>
          </UseTicketButton>
        </UseTicketContainer>
      </PaymentMethods>
    </Wrapper>
  );
}
