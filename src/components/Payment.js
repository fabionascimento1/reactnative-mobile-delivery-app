import React from "react";
import styled from "styled-components";
import { Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MenuSigned from "../components/MenuSigned";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default function Singin() {
  const navigation = useNavigation();

  function SigninScreen() {
    navigation.navigate("SigninScreen");
  }

  const signed = useSelector((state) => state.auth.signed);
  return (
    <Container>
      {signed === false && (
        <Cover>
          <Title>Falta pouco para você saborear incríveis pratos! </Title>
          <TouchableOpacity onPress={SigninScreen}>
            <BoxButton>
              <Text>Entrar</Text>
            </BoxButton>
          </TouchableOpacity>
          <TouchableOpacity>
            <BoxButton>
              <Text>Cadastrar</Text>
            </BoxButton>
          </TouchableOpacity>
        </Cover>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;
const Cover = styled.View``;

const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 14px;
`;
const Text = styled.Text``;
const BoxButton = styled.View`
  border: #ccc 1px solid;
  border-radius: 8px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: ${widthColumm}px;
  margin-bottom: 15px;
  align-items: center;
`;
