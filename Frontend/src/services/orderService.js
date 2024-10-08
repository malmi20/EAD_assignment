import apiClient from "../apiClient";

// fetch all orders
export const getOrdersService = async () => {
    try {
        const response = await apiClient.get("/order");        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// fetch all orders by user id
export const getOrdersByIdService = async (id) => {
    try {
        const response = await apiClient.get(`/order/${id}`);        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// create an order
export const createOrderService = async (body) => {
    try {
        const response = await apiClient.post("/order", body);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

//create an new order
export const updateOrderService = async (data, id) => {
    try {
        const response = await apiClient.put(`/order/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

//delete an order
export const deleteOrderService = async (id) => {
    try {
        const response = await apiClient.delete(`/data/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

