import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import api from "../../../services/api";

import { updateProfileSuccess, updateProfileFailure } from "./actions";
import { signInSuccess } from "./actions";

export function* updateProfile({ payload }) {
  try {
    const { id, name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `/api/user/${id}`, profile);

    Alert.alert("Successo", "Seu perfil foi atualizado");

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert("Error", "Verifie your data");
    yield put(updateProfileFailure());
  }
}
export default all([takeLatest("@user/UPDATE_PROFILE_REQUEST", updateProfile)]);
