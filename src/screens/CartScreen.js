import React, { Component } from "react";
import styled from "styled-components";
import { ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItens from "../components/CartItens";
import ButtonGoBack from "../components/ButtonGoBack";

import SinginCart from "../components/SinginCart";
import AddressCart from "../components/AddressCart";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const widthColumm = width - 30;

function Cart() {
  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <Cover>
            <ButtonGoBack />
            <CardItens />

            <DivSingin>
              <SinginCart />
              <AddressCart />
            </DivSingin>
          </Cover>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

export default Cart;

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const Cover = styled.View`
  width: ${widthColumm}px;
  margin-left: 28px;
  margin-top: 18px;
`;

const DivSingin = styled.View`
  margin-top: 150px;
`;
