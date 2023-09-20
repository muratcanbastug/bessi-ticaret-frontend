import axios from "axios";

const CONTEXT_PATH = "http://localhost:8080/bessisebzemeyve";

export const getAllProducts = async (name, type) => {
  try {
    let response = await axios.get(
      CONTEXT_PATH + `/products?name=${name}&type=${type}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};

export const removeProduct = async (id) => {
  try {
    let response = await axios.delete(CONTEXT_PATH + `/products/${id}`, {
      withCredentials: true,
    });
    return response.status;
  } catch (error) {}
};

export const getProduct = async (id) => {
  try {
    let response = await axios.get(CONTEXT_PATH + `/products/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const updateProduct = async (
  newProductInfo,
  setErrorMessage,
  setError
) => {
  try {
    let response = await axios.put(
      CONTEXT_PATH + `/products/${newProductInfo.id}`,
      newProductInfo,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    setErrorMessage("Girilen ürün ismiyle bir ürün zaten mevcut.");
    setError(true);
  }
};

export const saveProduct = async (product, setErrorMessage, setError) => {
  try {
    let response = await axios.post(CONTEXT_PATH + "/products", product, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    setErrorMessage("Girilen ürün ismiyle bir ürün zaten mevcut.");
    setError(true);
  }
};
