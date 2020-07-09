import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default function AddressCart() {
  const navigation = useNavigation();

  function PaymentScreen() {
    navigation.navigate("PaymentScreen");
  }

  const payment = useSelector((state) => state.user.payment);

  return (
    <Container>
      <Cover>
        <Title>Pagamento</Title>
        <TouchableOpacity onPress={PaymentScreen}>
          <BoxButton>
            <Text>Formas de Pagamento</Text>
            <TextPay>{payment}</TextPay>
          </BoxButton>
        </TouchableOpacity>
      </Cover>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Cover = styled.View``;

const Title = styled.Text`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 14px;
`;
const Text = styled.Text`
  font-size: 16px;
`;
const TextPay = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #e00024;
`;
const BoxButton = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
  width: ${widthColumm}px;
  margin-bottom: 15px;
`;
