import axios from "axios";
import * as Urls from '../../constants/ConstantVariables/Urls';
import {AsyncStorage} from '@react-native-async-storage/async-storage';


// const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(Urls.login, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(Urls.login, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
    AsyncStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;