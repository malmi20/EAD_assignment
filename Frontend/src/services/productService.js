import apiClient from "../apiClient";

// fetch all producst
export const getProductsService = async () => {
    try {
        const response = await apiClient.get("/product");        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// fetch all producst by id
export const geProductsService = async (id) => {
    try {
        const response = await apiClient.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

//create an new order
export const createProductService = async (data) => {
    try {
        const response = await apiClient.post("/product", data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};


//delete an product
export const deleteProduct = async (id) => {
    try {
        const response = await apiClient.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};
