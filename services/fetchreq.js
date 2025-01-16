export const API_BASE_URL = process.env.NEXT_PUBLIC_URL;

const createClientAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: "include", // Include cookies in cross-origin requests
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Merge default options with user-provided options
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // Assumes the response is JSON
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default createClientAPI;
