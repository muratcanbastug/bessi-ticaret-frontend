import axios from "axios";

const CONTEXT_PATH = "http://localhost:8080/bessisebzemeyve";

export const saveOrder = async (order, setErrorMessage, setError) => {
  try {
    let response = await axios.post(CONTEXT_PATH + "/order", order, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {
    setErrorMessage(
      "Siparişleri kaydederken bir hata oluştu. Tekrar deneyiniz."
    );
    setError(true);
  }
};

export const getAllOrders = async () => {
  try {
    let response = await axios.get(CONTEXT_PATH + `/order`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const confirmAllOrders = async () => {
  try {
    let response = await axios.delete(CONTEXT_PATH + `/order`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};

export const removeOrder = async (id) => {
  try {
    let response = await axios.delete(CONTEXT_PATH + `/order/${id}`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};
