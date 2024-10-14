import apiClient from "../apiClient";

// fetch all producst in inventory
export const getInventoryService = async () => {
    try {
        const response = await apiClient.get("/inventory");        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// fetch all producst in inventory by id
export const geProductsService = async (id) => {
    try {
        const response = await apiClient.get(`/inventory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

//create an new product inside inventory
export const createProductService = async (data) => {
    try {
        const response = await apiClient.post("/inventory", data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};


//delete an inventory product
export const deleteProduct = async (id) => {
    try {
        const response = await apiClient.delete(`/inventory/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};
