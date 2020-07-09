import React, { Component } from "react";
import { ScrollView, Dimensions } from "react-native";
import styled from "styled-components";
import api from "../services/api";
import ListMenu from "../components/ListMenu";
import { formatPrice } from "../utils/format";
import { SafeAreaView } from "react-native-safe-area-context";
import CartIcon from "../components/CartIcon";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default class delivery extends Component {
  state = {
    menu_type: [],
    menu: [],
  };

  async componentDidMount() {
    this.getTypeMenu();

    this.getlistOfDay();
  }

  getTypeMenu = () => {
    api
      .get("/api/menutype-active")
      .then((response) => {
        this.setState({ menu_type: response.data });
      })
      .catch((error) => {
        console.log("error");
      });
  };

  getlistOfDay = () => {
    api
      .get("/api/menu/listOfDay")
      .then((response) => {
        const data = response.data.map((menu) => ({
          ...menu,
          priceFormatted: formatPrice(menu.value),
        }));
        this.setState({ menu: data });
      })
      .catch((error) => {
        console.log("error");
      });
  };

  render() {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <Cover>
              <CartIcon />
              {this.state.menu.map((menu) => (
                <ListMenu
                  key={menu._id}
                  image={{ uri: menu.image }}
                  title={menu.name}
                  value={menu.priceFormatted}
                  button="Mais Detalhes"
                  link={() =>
                    this.props.navigation.push("DetailScreen", {
                      menu: menu,
                    })
                  }
                />
              ))}
            </Cover>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Cover = styled.View`
  width: ${widthColumm}px;
  margin-left: 28px;
  margin-top: 18px;
`;
