import React, { Component } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { connect } from "react-redux";
import * as CartActions from "../store/modules/cart/actions";
import { bindActionCreators } from "redux";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;

class OrderItem extends Component {
  state = {
    menu: this.props.menu,
  };
  handlerAddCart = (menu) => {
    const { addToCart } = this.props;

    addToCart(menu);
  };

  render() {
    const { amount, updateAmount } = this.props;
    const { menu } = this.state;

    return (
      <Container>
        <BoxQuantity>
          <Decrease>
            {amount[menu._id] > 0 ? (
              <TouchableOpacity onPress={this.props.link}>
                <MaterialCommunityIcons name="cart" size={28} color="#000" />
              </TouchableOpacity>
            ) : (
              <MaterialCommunityIcons
                name="cart-outline"
                size={28}
                color="#000"
              />
            )}
          </Decrease>
          <Quantity>
            <Text>{amount[menu._id] || 0}</Text>
          </Quantity>
          {amount[menu._id] > 0 ? (
            <TouchableOpacity
              onPress={() => updateAmount(menu._id, amount[menu._id] - 1)}
            >
              <Increment>
                <FontAwesome name="minus" size={20} color="#000" />
              </Increment>
            </TouchableOpacity>
          ) : (
            <Increment>
              <FontAwesome name="minus" size={20} color="#ccc" />
            </Increment>
          )}
        </BoxQuantity>
        <BoxAdd>
          <TouchableOpacity
            onPress={() => this.handlerAddCart(menu)}
            style={{ height: "100%", width: "100%" }}
          >
            <Btn>
              <TextAdd>Adicionar</TextAdd>
              <Textvalue>{this.props.value}</Textvalue>
            </Btn>
          </TouchableOpacity>
        </BoxAdd>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, menu) => {
    amount[menu._id] = menu.amount;
    return amount;
  }, []),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);

const Container = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 12px;
  margin-left: 10px;
  margin-right: 10px;
`;
const BoxQuantity = styled.View`
  flex-direction: row;
  background-color: #ccc;
  flex: 1 0 0;
  height: 46px;
  align-items: center;
  padding-left: 10px;
  margin-right: 15px;
  border-radius: 4px;
`;
const Decrease = styled.View`
  width: 40px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const Quantity = styled.View``;
const Increment = styled.View`
  width: 40px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const BoxAdd = styled.View`
  background-color: #e00024;
  flex: 2 0 0;
  padding-left: 15px;
  border-radius: 4px;
`;
const Btn = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const TextAdd = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-right: 40px;
`;
const Textvalue = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  position: absolute;
  right: 12px;
`;
