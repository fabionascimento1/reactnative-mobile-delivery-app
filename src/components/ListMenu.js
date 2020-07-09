import React from "react";
import { Dimensions, Button } from "react-native";
import styled from "styled-components";
import * as Font from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default class ListMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      savoye: require("../assets/fonts/Savoye.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Container>
        <Cover>
          <Image source={this.props.image} />
          <Content>
            {this.state.fontLoaded ? (
              <Title style={{ fontFamily: "savoye" }}>{this.props.title}</Title>
            ) : (
              <Title> {this.props.title}</Title>
            )}
            <Value>{this.props.value}</Value>
            <TouchableOpacity onPress={this.props.link}>
              <Link>
                <TextLink>{this.props.button}</TextLink>
              </Link>
            </TouchableOpacity>
          </Content>
        </Cover>
      </Container>
    );
  }
}

const Container = styled.View`
  display: flex;
  align-items: center;
`;

const Cover = styled.View`
  margin-bottom: 50px;
  flex-direction: row;
  width: ${widthColumm}px;
`;

const Image = styled.Image`
  width: 110px;
  height: 110px;
  margin-right: 20px;
`;

const Content = styled.View``;

const Title = styled.Text`
  font-size: 32px;
`;
const Value = styled.Text`
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
`;

const Link = styled.View`
  background-color: #ffebee;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;
  width: 140px;
`;

const TextLink = styled.Text`
  color: #ff516d;
  text-align: center;
`;
