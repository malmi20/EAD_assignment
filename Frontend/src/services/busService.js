import { post, get , deleteReq } from "../utils/apiHelper";

/**
 * fetchBusDetails
 * @returns  {Promise<object>} response
 */
//return bus details
export const fetchBusDetails = async () => {
  try {
    const response = await get("/busDetails/busDetails");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * fetchBusRoutes
 * @returns  {Promise<object>} response
 */
//return bus route details
export const fetchBusRoutes = async () => {
  try {
    const response = await get("/busDetails/busRoutes");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * fetchAssignedBusRouteDetails
 * @returns  {Promise<object>} response
 */
//return bus routes with assigned busses
export const fetchAssignedBusRouteDetails = async () => {
  try {
    const response = await get("/busDetails/getAssignedBusRouteDetails");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * saveAssignedBusRouteDetails
 * @param {object} assignedBusRouteDetails
 * @returns  {Promise<object>} response
 */
//save bus routes with assigned busses
export const saveAssignedBusRouteDetails = async (assignedBusRouteDetails) => {
  try {
    const response = await post(
      "/busDetails/saveAssignedBusRouteDetails",
      assignedBusRouteDetails,
      true
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * updateBusRouteDetails
 * @param {object} updateBusRouteDetails
 * @returns  {Promise<object>} response
 */
//updated bus route details
export const updateBusRouteDetails = async (updatedBusRouteDetails) => {
  try {
    const response = await post(
      "/busDetails/updateBusRouteDetails",
      updatedBusRouteDetails,
      true
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * deleteBusRouteDetails
 * @param {string} id
 * @returns  {Promise<object>} response
 */
export const deleteBusRouteDetails = async (id) => {
  try {
    const response = await deleteReq("/busDetails/deleteBusRouteDetails", { id }, true);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
