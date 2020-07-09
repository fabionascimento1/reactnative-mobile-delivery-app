import React from "react";
import styled from "styled-components";
import { TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function ButtonGoBack(props) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleGoBack}>
        <AntDesign name="leftcircle" size={28} color="#e0e0e0" />
      </TouchableOpacity>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 15px;
`;
