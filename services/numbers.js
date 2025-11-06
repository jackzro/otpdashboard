import { useMutation, useQuery } from "@tanstack/react-query";
import request from "./fetchreq";
import nookies from "nookies";

const getRequest = async (endpoint, params) => {
  try {
    const response = await request(endpoint, {
      headers: {
        "Content-Type": "application/json", // Adjust if your API expects a different content type
        Authorization: `Bearer ${nookies.get("nextauth.token")["nextauth.token"]}`, // Include the Bearer token
        credentials: "include",
      },
    });
    // const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error;
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
        Authorization: `Bearer ${nookies.get("nextauth.token")["nextauth.token"]}`, // Include the Bearer token
      },
      credentials: "include",
    });
    // const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error;
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

export const getNumbers = () => getRequest("/numbers");
export const useGetNumber = () => useQuery(["numbers"], getNumbers);

export const getNumbersByid = (params) => getRequest(`/numbers/${params}`, {});
export const useGetNumberByid = (params) =>
  useQuery({
    queryFn: () => getNumbersByid(params),
    queryKey: ["numbers-params", params],
  });

export const postNumbers = (body) =>
  postRequest(`/numbers`, body, false, "post");
export const usePostNumbers = () =>
  useMutation({ mutationFn: postNumbers, mutationKey: ["numbers"] });

export const postUpdateStatus = (body) =>
  postRequest(`/numbers/status`, body, false, "post");
export const usePostUpdateStatus = () =>
  useMutation({ mutationFn: postUpdateStatus, mutationKey: ["status"] });

export const postUpdateSenderOtp = (body) =>
  postRequest(`/numbers/sendotp`, body, false, "post");
export const usePostUpdateSenderOtp = () =>
  useMutation({ mutationFn: postUpdateSenderOtp, mutationKey: ["sendotp"] });
