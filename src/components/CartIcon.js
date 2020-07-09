import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const icon = require("../assets/sacola.png");

function Cart({ cartSize }) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate("CartScreen");
  }

  return (
    <Container>
      {cartSize > 0 ? (
        <TouchableOpacity onPress={handleGoBack}>
          <Cover>
            <Sacola source={icon} />
            <CartItem>
              <Text>{cartSize}</Text>
            </CartItem>
          </Cover>
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </Container>
  );
}

export default connect((state) => ({
  cartSize: state.cart.length,
}))(Cart);

const Container = styled.View`
  position: absolute;
  right: 0;
  z-index: 10;
`;

const CartItem = styled.View`
  background-color: #e00024;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 20px;
  margin-right: 21px;
`;
const Text = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const Sacola = styled.Image`
  position: absolute;
  right: 0;
`;

const Cover = styled.View``;
