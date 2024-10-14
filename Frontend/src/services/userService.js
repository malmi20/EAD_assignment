import { post } from "../utils/apiHelper";
import apiClient from "../apiClient";


/**
 * login
 * @param {object} loginDetails
 * @returns  {Promise<object>} response
 */

export const login = async (loginDetails) => {
  console.log("login details +++++++++++++");
  console.log(loginDetails);
  
  try {
    if (!loginDetails) throw new Error("Invalid login details");
    // const response = await post("/user/login", loginDetails, false);
    const response = await apiClient.post("/auth/login", {Email: loginDetails.email, Password: loginDetails.password});
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * register
 * @param {object} registerDetails
 * @returns  {Promise<object>} response
 */
export const register = async (registerDetails) => {  
  const reg = {
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: registerDetails.email,
    Password: registerDetails.password,
    ConfirmPassword: registerDetails.password,
    Address: "",
    ContactNo: "",
  }
  try {
    const response = await apiClient.post("/auth/register", reg, false);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * updateUserPassword
 * @param {object} passwordDetails
 * @returns  {Promise<object>} response
 */
export const updateUserPassword = async (passwordDetails) => {
  try {
    const response = await post(
      `/user/updateUserPassword`,
      passwordDetails,
      true
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * verifyUser
 * @returns {Promise<object>} response
 */
export const verifyUser = async () => {
  try {
    const response = await post("/user/verify", null, true);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
