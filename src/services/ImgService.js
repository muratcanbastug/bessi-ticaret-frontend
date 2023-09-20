import axios from "axios";

const CONTEXT_PATH = "http://localhost:8080/bessisebzemeyve";

export const postImage = async (selectedFile, filename) => {
  try {
    const responseUrl = await axios.post(
      CONTEXT_PATH + `/files`,
      {
        file: selectedFile,
        filename: "stat-" + filename + ".png",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return responseUrl.status;
  } catch (error) {}
};
