import React from "react";
import styled from "styled-components";
import { ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Signin from "../components/Singin";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default function PerfilScreen({ navigation }) {
  return (
    <RootView>
      <Container>
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <Signin />
          </ScrollView>
        </SafeAreaView>
      </Container>
    </RootView>
  );
}

const RootView = styled.View`
  background-color: #fff;
  flex: 1;
`;

const Container = styled.View`
  width: ${widthColumm}px;
  margin-left: 28px;
  margin-top: 18px;
`;
