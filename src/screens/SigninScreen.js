import React, { useRef, useState } from "react";
import { TouchableOpacity, Animated, Dimensions } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "../store/modules/auth/actions";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;
const widthRowWithMargin = width - 50;
const widthRowDivid2 = widthRowWithMargin / 2;

export default function SigninScreen({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.auth.signed);

  //const currentUser = useSelector((state) => state.auth);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
    if (loading === true) {
      navigation.goBack();
    }
  }

  return (
    <AnimatedContainer>
      <Modal>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 10,
            top: -10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Close>
            <AntDesign name="closecircle" size={40} color="#000" />
          </Close>
        </TouchableOpacity>
        <TextInput
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity loading={loading} onPress={handleSubmit}>
          <ButtonView>
            <ButtonText>Entrar</ButtonText>
          </ButtonView>
        </TouchableOpacity>
      </Modal>
    </AnimatedContainer>
  );
}

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 30px;
`;

const Modal = styled.View`
  width: ${widthRowWithMargin}px;
  height: 310px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
  padding-top: 20px;
`;

const ButtonView = styled.View`
  background: #e00024;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
const Close = styled.View``;
