import React, { useRef, useState, useEffect } from "react";
import { ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateProfileRequest } from "../store/modules/user/actions";
import ButtonGoBack from "../components/ButtonGoBack";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  const id = profile._id;

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setOldPassword("");
    setPassword("");
    setConfirmPassword("");
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        id,
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <Cover>
            <ButtonGoBack />
            <Title>Meu Perfil</Title>

            <Form>
              <TextInput
                icon="person-outline"
                autoCorret={false}
                autoCapitalize="none"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                value={name}
                onChangeText={setName}
              />

              <TextInput
                icon="mail-outline"
                keyboard="email-adress"
                autoCorret={false}
                autoCapitalize="none"
                placeholder="Email"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordRef.current.focus()}
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Senha atual"
                ref={oldPasswordRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <TextInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Nova senha"
                ref={passwordRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                icon="lock-outline"
                secureTextEntry
                placeholder="Confirmação da nova senha"
                ref={confirmPasswordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity onPress={handleSubmit}>
                <SubmitButton>
                  <SubmitTxt>Atualizar</SubmitTxt>
                </SubmitButton>
              </TouchableOpacity>
            </Form>
          </Cover>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const Cover = styled.View`
  width: ${widthColumm}px;
  margin-left: 28px;
  margin-top: 18px;
`;

const Title = styled.Text`
  font-size: 19px;
  margin-bottom: 25px;
`;

const Form = styled.View``;
const TextInput = styled.TextInput`
  margin-bottom: 20px;
  border-bottom-color: #ddd9d9;
  border-bottom-width: 1px;
  padding-bottom: 15px;
`;

const SubmitButton = styled.View`
  margin-top: 15px;
  background-color: #e00024;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  height: 40px;
`;
const SubmitTxt = styled.Text`
  color: #ccc;
  font-size: 18px;
`;
