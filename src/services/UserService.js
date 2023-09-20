import axios from "axios";

const CONTEXT_PATH = "http://localhost:8080/bessisebzemeyve";

export const getUserRole = async (setError, setErrorMessage) => {
  try {
    let response = await axios.get(CONTEXT_PATH + "/users", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    setErrorMessage(
      "Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz."
    );
    setError(true);
  }
};

export const getAllUsers = async (name) => {
  try {
    let response = await axios.get(CONTEXT_PATH + `/users/all?name=${name}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const getUser = async (id) => {
  try {
    let response = await axios.get(CONTEXT_PATH + `/users/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const saveUser = async (newUserInfo, setErrorMessage, setError) => {
  try {
    let response = await axios.post(
      CONTEXT_PATH + `/users`,
      {
        userName: newUserInfo.userName,
        name: newUserInfo.name,
        phoneNumber: newUserInfo.phoneNumber,
        address: newUserInfo.address,
        password: newUserInfo.password,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Kullanıcı bilgileri güncellenirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
    );
    setError(true);
  }
};

export const removeUser = async (id) => {
  try {
    let response = await axios.delete(CONTEXT_PATH + `/users/${id}`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};

export const updateUser = async (
  newUserInfo,
  id,
  setErrorMessage,
  setError
) => {
  try {
    let response = await axios.put(
      CONTEXT_PATH + `/users/${id}`,
      {
        userName: newUserInfo.userName,
        name: newUserInfo.name,
        phoneNumber: newUserInfo.phoneNumber,
        address: newUserInfo.address,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Kullanıcı bilgileri güncellenirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
    );
    setError(true);
  }
};

export const updateUserPassword = async (
  password,
  id,
  setErrorMessage,
  setError
) => {
  try {
    let response = await axios.put(
      CONTEXT_PATH + `/users/password-update/${id}`,
      {
        newPassword: password,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Kullanıcı şifresini güncellenirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
    );
    setError(true);
  }
};
