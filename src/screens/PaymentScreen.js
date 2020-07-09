import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import ButtonGoBack from "../components/ButtonGoBack";
import { useNavigation } from "@react-navigation/native";

import { updatePayment } from "../store/modules/user/actions";

const width = Dimensions.get("screen").width;
const widthColumm = width - 56;

export default function PaymentScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  function handleDinner(payment) {
    dispatch(updatePayment(payment));
    if (payment === "Dinheiro") {
      Alert.alert(
        "Dinheiro",
        "Você precisa de troco?",
        [
          {
            text: "Não",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          { text: "Sim", onPress: () => setModalVisible(!modalVisible) },
        ],
        { cancelable: false }
      );
    }
  }
  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <Cover>
            <ButtonGoBack />
            <TouchableOpacity onPress={() => handleDinner("Dinheiro")}>
              <Text>No Dinheiro</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <ModalView>
                <Text>Troco pra quanto?</Text>
                <Text>
                  Seu pedido deu xxx. Digite quanto vai pagar em dinheiro para
                  que entregador leve o seu troco
                </Text>
              </ModalView>
            </Modal>
            <TouchableOpacity onPress={() => handleDinner("Máquininha")}>
              <Text>Cartão Crédito</Text>
            </TouchableOpacity>
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

const Text = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom-color: #ddd9d9;
  border-bottom-width: 1px;
  padding-bottom: 15px;
`;

const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
