import { useMutation, useQuery } from "@tanstack/react-query";
import request from "./fetchreq";

const getRequest = async (endpoint, params) => {
  try {
    const response = await request(endpoint);
    // const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

const postRequest = async (
  endpoint,
  body,
  isFormData = false,
  method = "post"
) => {
  let payload;
  payload = body;

  if (isFormData) {
    payload = new FormData();
    Object.keys(body).forEach((key) => {
      payload.append(key, body[key]);
    });
  }

  try {
    const response = await request(endpoint, {
      method,
      body: JSON.stringify(payload),
    });
    // const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const loginRequest = async ({ username, password }) => {
  try {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    return {
      token: data.access_token,
      payload: data.payload,
    };
  } catch (error) {
    throw error?.response?.data || {};
  }
  // try {
  //   const { data: response } = await request.post("/auth/login", {
  //     username,
  //     password,
  //   });
  //   return {
  //     token: response.access_token,
  //     payload: response.payload,
  //   };
  // } catch (error) {
  //   throw error?.response?.data || {};
  // }
};

export const getSent = () => getRequest("/sent");
export const useSentbyUsername = () => useQuery(["sent"], getSent);

export const postSent = (body) => postRequest(`/sent`, body, false, "post");
export const usePostSent = () =>
  useMutation({ mutationFn: postSent, mutationKey: ["sentpost"] });
