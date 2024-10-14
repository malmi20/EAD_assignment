import apiClient from "../apiClient";

// fetch all producst
export const getProductsService = async () => {
    try {
        const response = await apiClient.get("/Product");        
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// fetch all producst
export const getCategoryService = async () => {
    try {
        const response = await apiClient.get("/Category");        
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

//create an new product
export const createProductService = async (data) => {
    try {
        const response = await apiClient.post("/Product", data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

//update an new product
export const updateProductService = async (id,data) => {
    try {
        const response = await apiClient.put(`/Product/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};


//delete an product
export const deleteProduct = async (id) => {
    try {
        const response = await apiClient.delete(`/Product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

//active an new product
export const activeProductService = async (id) => {
    try {
        const response = await apiClient.put(`/Product/${id}/activate`);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

//active an new product
export const deactiveProductService = async (id) => {
    try {
        const response = await apiClient.put(`/Product/${id}/deactivate`);
        return response.data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};
