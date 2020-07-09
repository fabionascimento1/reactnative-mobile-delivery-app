import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { signOut } from "../store/modules/auth/actions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function MenuSigned({ props }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  function handleProfileScreen() {
    navigation.navigate("ProfileScreen");
  }
  function handlePayment() {
    navigation.navigate("AdressScreen");
  }

  return (
    <Container>
      <Cover>
        <Ul>
          <Li>
            <TouchableOpacity onPress={handleProfileScreen}>
              <Icon>
                <AntDesign name="right" size={20} color="#ccc" />
              </Icon>
              <MainTxt>{profile.name}</MainTxt>
            </TouchableOpacity>
            <SecondTxt>Editar Perfil</SecondTxt>
          </Li>
          <Li>
            <Icon>
              <AntDesign name="right" size={20} color="#ccc" />
            </Icon>
            <MainTxt>Endereços</MainTxt>
            <SecondTxt>Meus endereços de entrega</SecondTxt>
          </Li>
          <Li>
            <TouchableOpacity onPress={handleLogout}>
              <Icon>
                <AntDesign name="right" size={20} color="#ccc" />
              </Icon>
              <MainTxt>Sair</MainTxt>
            </TouchableOpacity>
          </Li>
        </Ul>
      </Cover>
    </Container>
  );
}

const Container = styled.View``;
const Cover = styled.View``;
const Ul = styled.View``;
const Li = styled.View`
  margin-bottom: 20px;
  border-bottom-color: #ddd9d9;
  border-bottom-width: 1px;
  padding-bottom: 15px;
`;
const MainTxt = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;
const SecondTxt = styled.Text`
  font-size: 13px;
  color: #999;
`;

const Icon = styled.View`
  position: absolute;
  right: 0;
  top: 5px;
`;
