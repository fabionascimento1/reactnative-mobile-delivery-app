import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesome } from "@expo/vector-icons";
import * as MenuActions from "../store/modules/cart/actions";
import * as AccActions from "../store/modules/accompaniment/actions";
import { formatPrice } from "../utils/format";

const width = Dimensions.get("screen").width;
const widthM = width - 50;

function CartItens({
  cart,
  removeFromCart,
  updateAmount,
  total,
  accompaniment,
}) {
  function increment(menu) {
    updateAmount(menu._id, menu.amount + 1);
  }

  function decrement(menu) {
    updateAmount(menu._id, menu.amount - 1);
  }

  const totalAcc1 = (menu) => {
    let updatePriceTotal = accompaniment
      .filter((filterAcc) => filterAcc.menu == menu._id)
      .reduce((totalAcc, accompaniment, index, array) => {
        return (totalAcc = 4 * (array.length - 3));
      }, 0);

    if (updatePriceTotal > 0) total += Number(updatePriceTotal);

    return accompaniment
      .filter((filterAcc) => filterAcc.menu == menu._id)
      .reduce((totalAcc, accompaniment, index, array) => {
        if (array.length > 3)
          return (
            <Text>
              + Acompanhamento:{" "}
              {formatPrice((totalAcc = 4 * (array.length - 3)))}
            </Text>
          );
      }, 0);
  };

  return (
    <Container>
      {cart.map((menu) => (
        <Key key={menu._id}>
          <Cover>
            <Title>{menu.name}</Title>
            <Amount>
              <TouchableOpacity onPress={() => decrement(menu)}>
                <FontAwesome name="minus" size={20} color="#999" />
              </TouchableOpacity>
              <AmountText>{menu.amount}</AmountText>
              <TouchableOpacity onPress={() => increment(menu)}>
                <FontAwesome name="plus-circle" size={20} color="#999" />
              </TouchableOpacity>
            </Amount>
            <Value>{menu.priceFormatted}</Value>
            <Remove>
              <TouchableOpacity onPress={() => removeFromCart(menu._id)}>
                <FontAwesome name="remove" size={20} color="#999" />
              </TouchableOpacity>
            </Remove>
          </Cover>
          <Accompaniment>
            {accompaniment
              .filter((filterAcc) => filterAcc.menu == menu._id)
              .map((acc, index) => (
                <Key key={index}>
                  <AccText>{acc.name}</AccText>
                </Key>
              ))}
          </Accompaniment>
          <Subtotal>
            <Text>
              Subtotal: {menu.subtotal} {totalAcc1(menu)}
            </Text>
          </Subtotal>
        </Key>
      ))}
      <Total>
        <TextTotal>Total: {formatPrice(total)}</TextTotal>
      </Total>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.map((menu) => ({
    ...menu,
    subtotal: formatPrice(menu.value * menu.amount),
  })),

  total: state.cart.reduce((total, menu) => {
    return total + menu.value * menu.amount;
  }, 0),
  accompaniment: state.accompaniment,

  // totalAcc: state.accompaniment
  //.filter((filterAcc, menu) => filterAcc.menu == menu._id)
  // .reduce((totalAcc, accompaniment) => {
  // return (totalAcc = 4 * (accompaniment.amount - 3));
  //}, 0),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(Object.assign({}, MenuActions, AccActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartItens);

const Container = styled.View`
  width: ${widthM}px;
  flex: 1;
`;
const Cover = styled.View`
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
`;
const Title = styled.Text`
  flex: 2 0 0;
  font-size: 18px;
  font-weight: bold;
`;
const Value = styled.Text`
  font-size: 16px;
`;
const Amount = styled.View`
  flex: 2 0 0;
  flex-direction: row;
  margin-left: 20px;
`;
const AmountText = styled.Text`
  margin-left: 12px;
  margin-right: 12px;
  font-size: 16px;
`;
const Remove = styled.View``;
const Accompaniment = styled.View`
  flex-direction: row;
`;
const AccText = styled.Text`
  margin-right: 10px;
  color: #555;
`;
const Key = styled.View`
  margin-bottom: 25px;
`;
const Subtotal = styled.View`
  align-items: flex-end;
`;
const Total = styled.View`
  align-items: flex-end;
`;
const Text = styled.Text``;

const TextTotal = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
