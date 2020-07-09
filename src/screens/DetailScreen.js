import React, { Component } from "react";
import styled from "styled-components";
import { ScrollView, Dimensions } from "react-native";
import ButtonGoBack from "../components/ButtonGoBack";
import * as Font from "expo-font";
import { CheckBox } from "react-native-elements";
import api from "../services/api";
import OrderItem from "../components/OrderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccActions from "../store/modules/accompaniment/actions";
import CartIcon from "../components/CartIcon";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

class DetailScreen extends Component {
  state = {
    fontLoaded: false,
    checkedItems: new Map(),
    menu: "",
    accompaniments: [],
    teste: "",
  };
  async handleAcc(item, accomp, idMenu) {
    const { addAccompaniment, removeAccompaniment } = this.props;

    if (this.state.checkedItems.get(item) !== true) {
      await this.setState((prevState) => ({
        checkedItems: prevState.checkedItems.set(item, true),
      }));

      await addAccompaniment(accomp, idMenu);
    } else {
      await this.setState((prevState) => ({
        checkedItems: prevState.checkedItems.set(item, false),
      }));

      this.state.checkedItems.delete(item);
      await removeAccompaniment(accomp._id, idMenu);
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      savoye: require("../assets/fonts/Savoye.ttf"),
    });
    this.setState({ fontLoaded: true });

    this.setState({ menu: this.props.route.params.menu._id });
    this.getAccompanimentByMenu();
    this._checkedItems();
  }

  _checkedItems = () => {
    const { accompaniment } = this.props;
    {
      accompaniment
        .filter((acc) => acc.menu == this.state.menu)
        .map((filterAcc, index) => {
          if (this.state.checkedItems.get(filterAcc.name) !== true) {
            this.setState((prevState) => ({
              checkedItems: prevState.checkedItems.set(filterAcc.name, true),
            }));
          }
        });
    }
  };

  getAccompanimentByMenu = () => {
    api
      .get(`/api/accompaniment/${this.state.menu}`)
      .then((response) => {
        this.setState({ accompaniments: response.data });
        //console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  render() {
    const menu = this.props.route.params.menu;
    return (
      <Container>
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <Cover>
              <Header>
                <ButtonGoBack />
                <CartIcon />
              </Header>
              <Image />
              {this.state.fontLoaded ? (
                <Title style={{ fontFamily: "savoye" }}>{menu.name}</Title>
              ) : (
                <Title>{menu.name}</Title>
              )}
              <Description>{menu.description}</Description>
              <Accompaniment>
                Escolha até 3 acompanhamento. Cada acompanhamento extra será
                cobrado R$ 4,00.
              </Accompaniment>
              {this.state.accompaniments.map((item, index) => (
                <CheckBox
                  key={index}
                  title={item.name}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  name={item.name}
                  checked={this.state.checkedItems.get(item.name)}
                  onPress={() => this.handleAcc(item.name, item, menu._id)}
                />
              ))}
            </Cover>
          </ScrollView>
        </SafeAreaView>
        <OrderItem
          link={() => this.props.navigation.push("CartScreen")}
          menu={menu}
          value={menu.priceFormatted}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AccActions, dispatch);

const mapStateToProps = (state) => ({
  accompaniment: state.accompaniment,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const Cover = styled.View`
  width: ${widthColumm}px;
  margin-left: 28px;
  margin-top: 18px;
`;

const Image = styled.Image`
  margin-bottom: 12px;
`;
const Title = styled.Text`
  font-size: 35px;
  margin-bottom: 12px;
`;
const Description = styled.Text`
  margin-bottom: 12px;
  font-size: 15px;
`;
const Accompaniment = styled.Text`
  margin-bottom: 12px;
  font-size: 17px;
  font-weight: bold;
`;

const Header = styled.View`
  flex-direction: row;
`;
