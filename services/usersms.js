import { useMutation, useQuery } from "@tanstack/react-query";
import request from "./fetchreq";
import Cookies from "js-cookie";
const token = Cookies.get("nextauth.token");

const getRequest = async (endpoint, params) => {
  try {
    const response = await request(endpoint, {
      headers: {
        "Content-Type": "application/json", // Adjust if your API expects a different content type
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });
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
      headers: {
        "Content-Type": "application/json", // Adjust if your API expects a different content type
        Authorization: `Bearer ${token}`, // Include the Bearer token
      },
    });
    // const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const loginRequest = async ({ username, password }) => {
  try {
    const { data: response } = await request.post("/auth/login", {
      username,
      password,
    });
    return {
      token: response.access_token,
      payload: response.payload,
    };
  } catch (error) {
    throw error?.response?.data || {};
  }
};

export const getUserBalance = () => getRequest("/usersms/balance");
export const useUserBalance = () => useQuery(["balance"], getUserBalance);
