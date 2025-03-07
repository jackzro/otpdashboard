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
        Authorization: `Bearer ${nookies.get("nextauth.token")["nextauth.token"]}`, // Include the Bearer token
      },
      credentials: "include",
    });
    // const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const sendVoiceOtp = async ({ otp, phoneNumber, id }) => {
  const API_VO = process.env.NEXT_PUBLIC_VOICEOTP;
  try {
    const response = await fetch(API_VO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        phoneNumber,
        id,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const sendMarketingOtp = async ({ message, phone, id }) => {
  const API_VO = process.env.NEXT_PUBLIC_MRKTOTP;
  try {
    const response = await fetch(API_VO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        phone,
        id,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const sendMarketingOtp2 = async ({ message, phone, id }) => {
  const API_VO = process.env.NEXT_PUBLIC_MRKTOTP;

  try {
    console.log(API_VO);
    const response = await fetch(API_VO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5YzQ0MjE3MTVlNTAwMTJkMzNjZjciLCJpYXQiOjE3NDEyNzYzNDB9.iDCOZLYjEi6zW-rSVG3evlIrCSdZcSeR0lqMIIEayTA",
      },
      body: JSON.stringify({
        message,
        phone,
        type: "marketing",
        id,
      }),
    });
    const data = await response.json();

    console.log("wkkwkw", data);
    return data;
  } catch (error) {
    console.log("eorr", error);
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
