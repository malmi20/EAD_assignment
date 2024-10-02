import { post } from "../utils/apiHelper";

/**
 * login
 * @param {object} loginDetails
 * @returns  {Promise<object>} response
 */
export const login = async (loginDetails) => {
  try {
    if (!loginDetails) throw new Error("Invalid login details");
    const response = await post("/user/login", loginDetails, false);
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
  try {
    const response = await post("/user/register", registerDetails, false);
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
