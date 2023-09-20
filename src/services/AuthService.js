import axios from "axios";

const CONTEXT_PATH = "http://localhost:8080/bessisebzemeyve";

export const loginCheck = async () => {
  try {
    let response = await axios.get(CONTEXT_PATH + "/auth-check/login", {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};

export const adminCheck = async () => {
  try {
    let response = await axios.get(CONTEXT_PATH + "/auth-check/admin", {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};

export const loginService = async (formData, setError, setErrorMessage) => {
  try {
    let response = await axios.post(CONTEXT_PATH + "/login", formData, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz."
    );
    setError(true);
  }
};

export const logoutService = async () => {
  const response = await axios.post(CONTEXT_PATH + "/logout", {
    withCredentials: true,
  });
  return response.status;
};
